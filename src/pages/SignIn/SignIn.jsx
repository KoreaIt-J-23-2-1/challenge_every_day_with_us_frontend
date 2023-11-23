import React, { useState } from 'react';
import SignLayout from '../../components/SignLayout/SignLayout';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/config/instance';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

function SignIn(props) {
    const navigete = useNavigate();
    const user = {
        email: "",
        password: ""                                               
    }
    const [signinUser, setSigninUser] = useState(user);

    const handleSigninSubmit = async () => {
        try {
            const response = await instance.post("/api/auth/sign-in", signinUser);
            localStorage.setItem("accessToken", "Bearer " + response.data);
            alert("로그인 성공");
            window.location.replace("/main");
            
        }catch(error) {
            console.error(error);
            alert("로그인 실패");
        }   
    }

        const handleInputChange = (e) => {
        setSigninUser({
            ...signinUser,
            [e.target.name]: e.target.value
        });
    }
        
    const handleNaverSignin = () => {
        window.location.replace("http://localhost:8080/oauth2/authorization/naver");
    }

    const handleKakaoSignin = () => {
        try {
            window.location.replace("http://localhost:8080/oauth2/authorization/kakao");
        } catch (error) {
            console.error("Kakao login error:", error);
        }
    }

    const handleGoogleSignin = () => {
        window.location.replace("http://localhost:8080/oauth2/authorization/google");
    }
    
    const handleSignup = () => {
        navigete("/auth/signup")
    };

    
    return (
        <BaseLayout>
            
            <SignLayout>
                <h1>로그인</h1>

                <div>
                    <div>
                        <div css={S.inputBox}> <label>이메일</label> <input type="email" name='email' placeholder='이메일을 입력하세요' onChange={handleInputChange}/></div>
                        <div css={S.inputBox}> <label>비밀번호</label> <input type="password" name='password'  placeholder='비밀번호를 입력하세요' onChange={handleInputChange}/></div>
                        <button css={S.btn} onClick={handleSigninSubmit}>로그인</button>
                    </div>
                </div>
                    <button css={S.btn} onClick={handleNaverSignin}>네이버 연동 로그인</button>
                    <button css={S.btn} onClick={handleKakaoSignin}>카카오 연동 로그인</button>
                    <button css={S.btn} onClick={handleGoogleSignin}>구글 연동 로그인</button>
                    <button css={S.btn} onClick={handleSignup}>회원가입</button>


                {/* <div>
                    <a href="#" >이메일 찾기</a>
                    <a href="#"> 비밀번호 찾기</a>
                </div> */}


                
            </SignLayout>
            
        </BaseLayout>
    );
}

export default SignIn;