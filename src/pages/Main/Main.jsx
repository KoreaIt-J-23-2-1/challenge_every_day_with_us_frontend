import React from 'react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
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

    const handleLogoutButton = async () => {
        localStorage.removeItem("accessToken");
        window.location.replace("/");

    };

    return (
        <BaseLayout>
            <h1>임시 메인페이지(버튼이동용...)</h1>
            <p>주소 매번 입력하기...귀찮았다...미안하다...</p>
            <div css={btn}>
                <button onClick={() => { navigate("/auth/signin") }}>로그인</button>
                <button onClick={() => { navigate("/account/mypage") }}>마이페이지</button>
                <button onClick={() => { navigate("/account/mypage/detail") }}>내정보수정</button>
                <button onClick={() => { navigate("/point") }}>포인트상점</button>
                <button onClick={() => { navigate("/notice") }}>공지목록</button>
                <button onClick={() => { navigate("/challenge/category") }}>챌린지카테고리</button>
                <button onClick={() => { navigate(`/challenge/5`) }}>챌린지조회</button>

            </div>
        </BaseLayout>
    );
}

export default Main;
