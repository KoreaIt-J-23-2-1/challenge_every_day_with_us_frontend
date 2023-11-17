import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useQueryClient } from 'react-query';
import { ref, getDownloadURL, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import * as S from "./Style";


function MypageDetailSideBar({ children }) {

    const navigate = useNavigate();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data; 
    const profileFileRef = useRef();
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const [ profileImgSrc, setProfileImgSrc ] = useState("");

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
        console.log(files)

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

    return (
        
        <div css={S.layout}>
            <div css={S.sideBox}>
                <div css={S.imgContainer}>
                    <div css={S.imgBox} onClick={handleProfileUploadClick}>
                        <img src={profileImgSrc} alt="" />
                        <input css={S.file} type="file" onChange={handleProfileChange} ref={profileFileRef}/>
                    </div>
                </div>
                <div css={S.profile}>
                    <b>{principal.nickname}</b>
                    <p>{principal.email}</p>
                </div>
                <div css={S.line}></div>
                <div css={S.leftHeader}>
                    <ul css={S.leftMenu}>
                        <li onClick={() => navigate("/account/mypage/detail")}>내 정보수정</li>
                        <li>참여 현황</li>
                        <li onClick={() => navigate("/store/:userId/orders")}>상점물품 구매내역</li>
                    </ul>
                </div>
            </div>
            {children}
        </div>
    );
}

export default MypageDetailSideBar;