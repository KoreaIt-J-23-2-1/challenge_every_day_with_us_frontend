import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as S from "./InfoSideBarStyle";
import PointModal from '../PointModal/PointModal';

function MypageDetailSideBar({ setUploadFiles, children }) {
    const navigate = useNavigate();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data; 
    const [ profileImgSrc, setProfileImgSrc ] = useState("");

    
    useEffect(() => {
        setProfileImgSrc(principal.profileUrl);
    }, [])

    const handleLogoutButton = async () => {
        localStorage.removeItem("accessToken");
        alert("로그아웃 되었습니다.");
        window.location.replace("/main");
    };

    return (
        <div css={S.layout}>
            <div css={S.sideBox}>
                <div css={S.imgContainer}>
                    <div css={S.imgBox}>
                        <img src={profileImgSrc} alt="" />
                    </div>
                </div>
                <div css={S.profile}>
                    <b>{principal.nickname}</b>
                    <p>{principal.email}</p>
                    <p>{principal.membership}</p>
                    <p>{principal.point}<b>포인트</b></p>
                </div>
                <div css={S.line}></div>
                <div css={S.leftHeader}>
                    <ul css={S.leftMenu}>
                        {principal?.isAdmin !== 1 && (
                            <>
                                <li onClick={() => navigate("/user")}>마이페이지</li>
                                <li onClick={() => navigate("/account/mypage/detail")}>내정보수정</li>
                                <li onClick={() => navigate("/store/:userId/orders")}>구매내역</li>
                                <li onClick={handleLogoutButton}>로그아웃</li>
                            </>
                        )}
                        {principal?.isAdmin === 1 && (
                            <>
                                <li onClick={() => navigate("/mypage")}>관리자 페이지</li>
                                <li onClick={handleLogoutButton}>로그아웃</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            {children}
        </div>
    );
}

export default MypageDetailSideBar;