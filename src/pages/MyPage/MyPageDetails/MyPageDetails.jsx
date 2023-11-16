import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import {instance} from '../../../api/config/instance';
import { useQueryClient } from 'react-query';
import { ref, getDownloadURL, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../../api/firebase/firebase';
import * as S from "./Style";
import BaseLayout from '../../../components/BaseLayout/BaseLayout';
import { FaRegUser } from "react-icons/fa";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const layout = css`
    display: flex;
    justify-content: center;
    align-items: stretch;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
`;

const sideBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 350px;
    background-color: #fff;
    box-shadow: 5px 1px 8px 0 rgba(0,0,0,.06);
    border-left: 1px solid rgba(0,0,0,.08);
    vertical-align: top;
    z-index: 1;
`;

const imgContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const imgBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #dbdbdb;
    overflow: hidden;
    cursor: pointer;

    & > img {
        width: 100%;
    }
`;

const file = css`
    display: none;
`;

const profile = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > b {
        margin-top: 20px;
        font-size: 18px;
        font-weight: 900;
    }

    & > p {
        font-size: 12px;
        color: #777
    }
`;

const line = css`
    margin-top: 40px;
    border-top: 1px solid rgba(146,146,148,.3);
`;

const leftHeader = css`
    display: flex;
    
`;

const leftMenu = css`
    margin-top: 50px;
    list-style: none;
    padding: 0 39px;
    font-size: 16px;
    cursor: pointer;

    & > li {
        margin-bottom: 20px;
    }
`;

const userBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 50px;
    max-width: 400px;

    & button {
        margin-top: 25px;
        width: 200px;
    }
`;

const userInfoHeader = css`
    position: relative;
    display: block;
    width: 100%;
    padding: 15px 38px 13px 18px;
    border-radius: 12px 12px 0 0;
    background-image: linear-gradient(98deg,#03c75a,#49c6dd);
    color: #FFFFFF;
`;

const inputBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #dbdbdb;
    padding: 0 17px;
    height: 50px;

    & > input {
        border: none;
        margin-left: 10px;
        
        &:focus {
            outline: none;
        }
    }
`;

function MyPageDetails(props) {
    
    const navegate = useNavigate();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;   
    const profileFileRef = useRef();
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const [ profileImgSrc, setProfileImgSrc ] = useState("");
    const [ modifyMypageDetail, setModifyMypageDetail ] = useState(principal);

    useEffect(() => {
        setProfileImgSrc(principal.profileUrl);
    }, [])

    const handleProfileUploadClick = () => {
        if(window.confirm("프로필 사진을 변경하시겠습니까?")) {
            profileFileRef.current.click();
        }
    }

    const handleProfileChange = (e) => {
        setUploadFiles(e.target.files);
        const files = e.target.files;

        if(!files.length) {
            setUploadFiles([]);
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setProfileImgSrc(e.target.result);
        }

        reader.readAsDataURL(files[0])
    }

    const handleUploadCancel = () => {
        setUploadFiles([]);
        profileFileRef.current.value = "";
    }

    const handleInputChange = (e) => {
        console.log(modifyMypageDetail)
        setModifyMypageDetail({
            ...modifyMypageDetail,
            [e.target.name]: e.target.value
        });
    }

    const handleModifyMypageDetailSubmit = async () => {
        let promise = null;

        if(uploadFiles.length > 0) {
            promise = new Promise((resolve, reject) => {
                const storageRef = ref(storage, `files/profile/${uploadFiles[0].name}`);
                const uploadTask = uploadBytesResumable(storageRef, uploadFiles[0]);
    
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        
                    },
                    (error) => {
                        console.error(error);
                    },
                    () => {
                        getDownloadURL(storageRef).then(downloadUrl => {
                            modifyMypageDetail.profileUrl = downloadUrl;   
                            resolve(downloadUrl)
                        })
                    }
                )
                
            });
        }else {
            promise = new Promise((resolve, reject) => {
                resolve(true);
            })
        }

        promise.then((result) => {
            try{
                const option = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    }
                }
                instance.put(`/api/account/mypage/${principal.userId}`, modifyMypageDetail, option);
                alert("프로필 정보가 변경되었습니다.");
                window.location.reload();
            }catch(error) {
                console.error(error);
            }
        })
        

        
    }

    const handleCancelClick = () => {
        navegate("/account/mypage");
    }

    const handleIsWithdrawn = async () => {
        if(window.confirm("정말 탈퇴하시겠습니까?")) {
            if(window.confirm("진짜로 떠나시겠습니까?")) {
                try{
                    const option = {
                        headers: {
                            Authorization: localStorage.removeItem("accessToken")
                        }
                    }
                    await instance.delete(`/api/account/${1}`, option);
                }catch(error) {
                    console.error(error);
                }
            }
        }
    }

    return (
        <BaseLayout>
            <div css={layout}>
                <div css={sideBox}>
                    <div css={imgContainer}>
                        <div css={imgBox} onClick={handleProfileUploadClick}>
                            <img src={profileImgSrc} alt="" />
                            <input css={file} type="file" onChange={handleProfileChange} ref={profileFileRef}/>
                        </div>
                    </div>
                    <div css={profile}>
                        <b>{principal.nickname}</b>
                        <p>{principal.email}</p>
                    </div>
                    <div css={line}></div>
                    <div css={leftHeader}>
                        <ul css={leftMenu}>
                            <li>내 정보수정</li>
                            <li>참여 현황</li>
                        </ul>
                    </div>
                </div>
                <div css={userBox}>
                    <div css={userInfoHeader}>내 정보수정</div>
                    <div css={inputBox}>
                        <div><FaRegUser /></div>
                        <input type="text" name='name' value={principal.name} disabled={true} onChange={handleInputChange} placeholder='이름' />
                    </div>
                    <div css={inputBox}>
                        <div><MdOutlineDriveFileRenameOutline /></div>
                        <input type="text" name='nickname' defaultValue={principal.nickname} onChange={handleInputChange} placeholder='닉네임' />
                    </div>
                    <div css={inputBox}>
                        <div><HiOutlineMail /></div>
                        <input type="text" name='email' value={principal.email} disabled={true} onChange={handleInputChange} placeholder='이메일' />
                    </div>
                    <div css={inputBox}>
                        <div><HiOutlineDevicePhoneMobile /></div>
                        <input type="text" name='phone' value={principal.phone} disabled={true} onChange={handleInputChange} placeholder='전화번호' />
                    </div>
                    <button css={S.SModify} onClick={handleModifyMypageDetailSubmit}>정보변경</button>
                    <button css={S.SCancel} onClick={handleCancelClick}>취소</button>
                    <button css={S.SWithdrawn} onClick={handleIsWithdrawn}>회원탈퇴</button>
                </div>
            </div>
        </BaseLayout>
    );
}

export default MyPageDetails;