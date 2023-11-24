import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './MenuModalStyle';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

function MenuModal(props) {
    const navigate = useNavigate(); 
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState("getPrincipal");
    const principal = principalState.data;

    const checkLoginBeforeNavigate = (path) => {
        if(!principal) {
            alert("로그인을 먼저 진행해주세요");
            return;
        }
        navigate(path);
    };
    
    const handleLogoutButton = async () => {
        localStorage.removeItem("accessToken");
        alert("로그아웃 되었습니다.");
        window.location.replace("/");
    };


    return (
        <div css={S.Background}>
            <div css={S.MenuHeader}>
                <h3></h3>
                <div css={S.MyBox}>
                    {principal ? <button onClick={handleLogoutButton}>로그아웃</button>
                    : <button onClick={() => { navigate("/auth/signin") }}>로그인</button>}
                    <button onClick={() => { checkLoginBeforeNavigate("/account/mypage") }}>마이페이지</button>
                    <button onClick={() => { checkLoginBeforeNavigate("/account/mypage/detail") }}>내정보수정</button>
                </div>
            </div>

            <div>
                <div css={S.BtnBox}>
                    <button onClick={() => { checkLoginBeforeNavigate("/notice/page/1") }}>공지</button>
                    <button onClick={() => { checkLoginBeforeNavigate("/store/items") }}>상점</button>


                </div>
                <div css={S.BtnBox}>
                    <button onClick={() => { checkLoginBeforeNavigate("/challenge/category") }}>챌린지카테고리</button>
                    <button onClick={() => { checkLoginBeforeNavigate("/challenges") }}>챌린지리스트조회</button>
                    <button onClick={() => { checkLoginBeforeNavigate("/challenge/feed") }}>Feed</button>
                </div>
                <div css={S.BtnBox}>
                    <button>룰루랄라</button>
                    <button>닐니리야</button>
                    <button>추가할것</button>
                </div>
            </div>
        </div>
    );
}

export default MenuModal;