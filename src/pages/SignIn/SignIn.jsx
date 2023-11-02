import React from 'react';
import SignLayout from '../../components/SignLayout/SignLayout';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
/** @jsxImportSource @emotion/react */



const btn = css`
    margin: 10px;
`;



function SignIn(props) {
    const navigete = useNavigate();


    const handleSignup = () => {
        navigete("/auth/signup")
    };



    return (
        <SignLayout>
            <h1>로그인</h1>

            <button css={btn}>네이버 연동 로그인</button>

            <div>
                <a  href="#" >이메일 찾기</a>
                <a href="#"> 비밀번호 찾기</a>
            </div>

            <button css={btn} onClick={handleSignup}>회원가입</button>

            
        </SignLayout>
        
    );
}

export default SignIn;