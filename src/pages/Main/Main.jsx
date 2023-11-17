import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
import { useQueryClient } from 'react-query';
/** @jsxImportSource @emotion/react */


const btn = css`
    display: flex;
    flex-direction: column;

    & > button{
        cursor: pointer;
        margin: 10px;
        width: 170px;
        height: 30px;
        background-color: #efefef;
        border: none;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    & > button:hover{
        background-color: #dbdbdb;
    }
`;


function Main(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient().getQueryState("getPrincipal");
    const principal = queryClient?.data?.data;
    const userId = principal?.userId;

    const handleLogoutButton = async () => {
        localStorage.removeItem("accessToken");
        alert("로그아웃 되었습니다.");
        window.location.replace("/");
    };

    const checkLoginBeforeNavigate = (path) => {
        if(!principal) {
            alert("로그인을 먼저 진행해주세요");
            return;
        }
        navigate(path);
    };

    console.log(principal);
    
    return (
        <div>
            {/* <Header /> */}
            <BaseLayout>
                <h1>임시 메인페이지(버튼이동용...)</h1>
                <p>주소 매번 입력하기...귀찮았다...미안하다...</p>
                <div css={btn}>
                    
                    {principal ? <button onClick={handleLogoutButton}>로그아웃</button>
                    : <button onClick={() => { navigate("/auth/signin") }}>로그인</button>}
                    {/* <button onClick={() => { checkLoginBeforeNavigate("/store/items") }}>상점</button> */}
                    <button onClick={() => { checkLoginBeforeNavigate(`/store/${userId}/orders`) }}>상점 물품 구매 목록 조회</button>
                    <button onClick={() => { checkLoginBeforeNavigate("/account/mypage") }}>마이페이지</button>
                    <button onClick={() => { checkLoginBeforeNavigate("/account/mypage/detail") }}>내정보수정</button>
                    {/* <button onClick={() => { checkLoginBeforeNavigate("/point") }}>포인트상점</button> */}
                    <button onClick={() => { checkLoginBeforeNavigate("/notice/page/1") }}>공지목록</button>
                    <button onClick={() => { checkLoginBeforeNavigate("/challenge/category") }}>챌린지 생성 </button>
                    {/* <button onClick={() => { checkLoginBeforeNavigate("/challenge/5") }}>챌린지조회</button> */}
                    <button onClick={() => { checkLoginBeforeNavigate("/challenges") }}>챌린지리스트조회</button>
                    <button onClick={() => { checkLoginBeforeNavigate("/challenge/feed") }}>Feed</button>

                    <button onClick={() => { navigate("/maain") }}>찐메인</button>
                </div>
            </BaseLayout>
        </div>
    );
}

export default Main;
