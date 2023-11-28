import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './MenuModalStyle';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

function MenuModal({ isActive }) {
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
        <div css={S.Background(isActive)}>
            <div css={S.MenuBody(isActive)}>
                <div css={S.MenuHeader}>
                    <h3></h3>
                    <div css={S.MyBox}>
                        {principal ? <button onClick={handleLogoutButton}>로그아웃</button>
                            : <button onClick={() => { navigate("/auth/signin") }}>로그인</button>}
                        {principal?.data?.isAdmin === 1 ?
                            <button onClick={() => { checkLoginBeforeNavigate("/account/mypage") }}>관리자페이지</button>
                            :
                            <button onClick={() => { checkLoginBeforeNavigate("/account/mypage") }}>마이페이지</button>
                        }
                        <button onClick={() => { checkLoginBeforeNavigate("/account/mypage/detail") }}>내정보수정</button>
                    </div>
                </div>

                <div  css={S.BtnBox(isActive)}>
                    <div>
                        <div css={S.BtnMotion} onClick={() => { checkLoginBeforeNavigate("/main") }}>HOME <b>도전자의 집🛖</b> </div>
                    </div>
                    <div >
                        <div  css={S.BtnMotion}  onClick={() => { checkLoginBeforeNavigate("/challenges") }}>CHALLENGE  <b>도전 🚩</b> </div>
                        <div css={S.BtnMotion}  onClick={() => { checkLoginBeforeNavigate("/challenge/feed") }}>FEED<b>인증 ⭐</b></div>

                    </div>
                    <div >
                        <div css={S.BtnMotion}  onClick={() => { checkLoginBeforeNavigate("/notice/page/1") }}>NOTICE<b>공지 📢</b></div>
                        <div css={S.BtnMotion}  onClick={() => { checkLoginBeforeNavigate("/stamp") }}>STAMP<b>출석 ♨️</b></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuModal;