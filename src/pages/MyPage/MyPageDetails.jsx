import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import {instance} from '../../api/config/instanse';
import { useQueryClient } from 'react-query';
import { ref, getDownloadURL, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../api/firebase/firebase';
import { useRecoilStateLoadable } from 'recoil';

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const imgBox = css`
    width: 50px;
    height: 50px;
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
        <div css={layout}>
            <div>
                <div css={imgBox} onClick={handleProfileUploadClick}>
                    <img src={profileImgSrc} alt="" />
                </div>
                <input css={file} type="file" onChange={handleProfileChange} ref={profileFileRef}/>
                
                <div>
                    <input type="text" name='name' value={principal.name} disabled={true} onChange={handleInputChange} placeholder='이름' />
                </div>
                <div>
                    <input type="text" name='nickname' defaultValue={principal.nickname} onChange={handleInputChange} placeholder='닉네임' />
                </div>
                <div>
                    <input type="text" name='email' value={principal.email} disabled={true} onChange={handleInputChange} placeholder='이메일' />
                </div>
                <div>
                    <input type="text" name='phone' value={principal.phone} disabled={true} onChange={handleInputChange} placeholder='전화번호' />
                </div>
                <button onClick={handleModifyMypageDetailSubmit}>정보변경</button>
                <button onClick={handleCancelClick}>취소</button>
                <button onClick={handleIsWithdrawn}>회원탈퇴</button>
            </div>
        </div>
    );
}

export default MyPageDetails;