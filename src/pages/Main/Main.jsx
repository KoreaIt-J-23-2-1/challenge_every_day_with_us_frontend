import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
import Header from '../../components/Header/Header';
import LetterSideBar from '../../components/LetterSideBar/LetterSideBar';
import { useQueryClient } from 'react-query';
/** @jsxImportSource @emotion/react */


const btn = css`
    display: flex;
    flex-direction: column;

    &> div > button{
        margin: 10px;
        height: 30px;
    }
`;


function Main(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient().getQueryState("getPrincipal");
    const principal = queryClient?.data?.data;
    const userId = principal?.userId;

    const handleLogoutButton = async () => {
        localStorage.removeItem("accessToken");
        window.location.replace("/");
    };


    
    return (
        <div>
            <Header />
            <BaseLayout>
                <h1>임시 메인페이지(버튼이동용...)</h1>
                <p>주소 매번 입력하기...귀찮았다...미안하다...</p>
                <div css={btn}>
                <button onClick={() => { navigate("/auth/signin") }}>로그인</button>
                <button onClick={() => { navigate("/store/items") }}>상점</button>
                <button onClick={() => { navigate(`/store/${userId}/orders`) }}>상점 물품 구매 목록 조회</button>
                <button onClick={() => { navigate("/account/mypage") }}>마이페이지</button>
                <button onClick={() => { navigate("/account/mypage/detail") }}>내정보수정</button>
                <button onClick={() => { navigate("/point") }}>포인트상점</button>
                <button onClick={() => { navigate("/notice") }}>공지목록</button>
                <button onClick={() => { navigate("/challenge/category") }}>챌린지카테고리</button>
                <button onClick={() => { navigate("/challenge/5") }}>챌린지조회</button>
                <button onClick={() => { navigate("/challenges/1") }}>챌린지리스트조회</button>
                <button onClick={() => { navigate("/challenge/feed") }}>Feed</button>
                </div>
            </BaseLayout>
        </div>
    );
}

export default Main;
