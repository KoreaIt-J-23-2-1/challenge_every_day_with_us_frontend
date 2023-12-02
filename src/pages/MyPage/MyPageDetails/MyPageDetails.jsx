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
import { showAlert, showConfirmation } from '../../../styles/common';

function MyPageDetails(props) {
    const navegate = useNavigate();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;   
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const [ modifyMypageDetail, setModifyMypageDetail ] = useState(principal);
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

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
                showAlert("프로필 정보가 변경되었습니다.", "success");
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
    
        const firstConfirmation = await showConfirmation("탈퇴", "정말 탈퇴하시겠습니까?", "question");
        
        if (firstConfirmation) {
            const secondConfirmation = await showConfirmation("탈퇴", "진짜로 떠나시겠습니까?", "question");
    
            if (secondConfirmation) {
                try {
                    const response = await instance.delete(`/api/account/${userId}`, option);
    
                    if (response) {
                        localStorage.removeItem("accessToken");
                        queyrClient.refetchQueries("getPrincipal");
                        showAlert("탈퇴 완료 !!", "success");
                        navegate("/");
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    return (
        <BaseLayout>
            <MypageDetailSideBar setUploadFiles={setUploadFiles}>
                <div css={S.Layout}>
                    <div css={S.userBox}>
                        <h2>내 정보수정</h2>
                        <div css={S.inputBoxLayout}>
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
                        </div>
                        <button onClick={handleModifyMypageDetailSubmit}>정보변경</button>
                        <button onClick={handleCancelClick}>취소</button>
                        <button onClick={handleIsWithdrawn}>회원탈퇴</button>
                    </div>
                </div>
            </MypageDetailSideBar>
        </BaseLayout>
    );
}

export default MyPageDetails;