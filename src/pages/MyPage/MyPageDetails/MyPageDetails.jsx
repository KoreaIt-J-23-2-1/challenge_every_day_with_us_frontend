import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import {instance} from '../../../api/config/instance';
import { useQueryClient } from 'react-query';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../../api/firebase/firebase';
import * as S from "./Style";
import BaseLayout from '../../../components/BaseLayout/BaseLayout';
import { FaRegUser } from "react-icons/fa";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import MypageDetailSideBar from '../../../components/MypageDetailSideBar/MypageDetailSideBar';


function MyPageDetails(props) {
    
    const navegate = useNavigate();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;   
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const [ modifyMypageDetail, setModifyMypageDetail ] = useState(principal);

    

    const handleInputChange = (e) => {
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
        const userId = principal?.userId;
        if(window.confirm("정말 탈퇴하시겠습니까?")) {
            if(window.confirm("진짜로 떠나시겠습니까?")) {
                try{
                    const option = {
                        headers: {
                            Authorization: localStorage.removeItem("accessToken")
                        }
                    }
<<<<<<< HEAD
                    await instance.delete(`/api/account/${userId}`, option);
=======
                    const response = await instance.delete(`/api/account/${principal.userId}`, option);
                    if(response){
                        navegate("/main");
                    }
>>>>>>> 35e477e724ddb3fe73f2596759e6b5181538dbfc
                }catch(error) {
                    console.error(error);
                }
            }
        }
    }

    return (
        <BaseLayout>
            <MypageDetailSideBar>
                <div css={S.userBox}>
                    <div css={S.userInfoHeader}>내 정보수정</div>
                    <div css={S.inputBox}>
                        <div><FaRegUser /></div>
                        <input type="text" name='name' value={principal.name} disabled={true} onChange={handleInputChange} placeholder='이름' />
                    </div>
                    <div css={S.inputBox}>
                        <div><MdOutlineDriveFileRenameOutline /></div>
                        <input type="text" name='nickname' defaultValue={principal.nickname} onChange={handleInputChange} placeholder='닉네임' />
                    </div>
                    <div css={S.inputBox}>
                        <div><HiOutlineMail /></div>
                        <input type="text" name='email' value={principal.email} disabled={true} onChange={handleInputChange} placeholder='이메일' />
                    </div>
                    <div css={S.inputBox}>
                        <div><HiOutlineDevicePhoneMobile /></div>
                        <input type="text" name='phone' value={principal.phone} disabled={true} onChange={handleInputChange} placeholder='전화번호' />
                    </div>
                    <button css={S.SModify} onClick={handleModifyMypageDetailSubmit}>정보변경</button>
                    <button css={S.SCancel} onClick={handleCancelClick}>취소</button>
                    <button css={S.SWithdrawn} onClick={handleIsWithdrawn}>회원탈퇴</button>
                </div>
            </MypageDetailSideBar>
        </BaseLayout>
    );
}

export default MyPageDetails;