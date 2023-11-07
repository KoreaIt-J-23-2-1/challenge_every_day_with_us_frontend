import React, { useState } from 'react';
import SignLayout from '../../components/SignLayout/SignLayout';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/config/instanse';
/** @jsxImportSource @emotion/react */



const btn = css`
    cursor: pointer;
    margin-top: 10px;
    width: 208px;
    height: 30px;
    background-color: #efefef;
    border: none;

    &:hover{
        background-color: #dbdbdb;
    }
`;



const inputBox = css`
    margin: 5px;
    &> label{
        display: flex;
        align-items: center;
        width: 100px;
        font-size: 12px;
    }
    & > input {
        margin-top: 4px;
        width: 200px;
        height: 25px;
    }
`;


function SignIn(props) {
    const navigete = useNavigate();

    const user = {
        email: "",
        password: ""                                               
    }
    
    const [signinUser, setSigninUser] = useState(user);

    const handleSigninSubmit = async () => {
        try {
            const response = await instance.post("/auth/sign-in", signinUser);
            localStorage.setItem("accessToken", "Bearer " + response.data);
            alert("로그인 성공");
            window.location.replace("/");
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

    const handleSignup = () => {
        navigete("/auth/signup")
    };

    
    return (
        <SignLayout>
            <h1>로그인</h1>

            <div>
                <div>
                    <div css={inputBox}> <label>이메일</label> <input type="email" name='email' placeholder='이메일을 입력하세요' onChange={handleInputChange}/></div>
                    <div css={inputBox}> <label>비밀번호</label> <input type="password" name='password'  placeholder='비밀번호를 입력하세요' onChange={handleInputChange}/></div>
                    <button css={btn} onClick={handleSigninSubmit}>로그인</button>
                </div>
            </div>
                <button css={btn} onClick={handleNaverSignin}>네이버 연동 로그인</button>
                <button css={btn} onClick={handleSignup}>회원가입</button>


            <div>
                <a href="#" >이메일 찾기</a>
                <a href="#"> 비밀번호 찾기</a>
            </div>


            
        </SignLayout>
        
    );
}

export default SignIn;