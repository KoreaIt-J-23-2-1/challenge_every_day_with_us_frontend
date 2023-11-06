import React, { useState } from 'react';
import SignLayout from '../../components/SignLayout/SignLayout';
import { css } from '@emotion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { async } from 'q';
import { instance } from '../../api/config/instanse';
/** @jsxImportSource @emotion/react */

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

const btn = css`
    margin: 10px;
`;


function SignUp(props) {
    const navigete = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();

    const user = {
        email: "",
        password: "",
        name: "",
        nickname: "",
        phone:"",
        oauth2Id: searchParams.get("oauth2Id"),
        profileUrl: ""
    }

    const [ signupUser, setSignupUser ] = useState(user);

    const handleSignupSubmit = async() => {
        try {
            await instance.post("/api/auth/sign-up", signupUser);
            alert("회원가입 완료");
            window.location.replace("/auth/signin");
        }catch(error) {
            console.error(error);
            alert("회원가입 실패");

        }
    }
    
    const handleSigninPage = () => {
        navigete("/auth/signin")
    };

    const handleInputChange = (e) => {
        setSignupUser({
            ...signupUser,
            [e.target.name]: e.target.value
        });
    }

    return (
        <SignLayout>
            <h1>회원가입</h1>
            <div css={inputBox}> <label>이메일</label> <input type="email" name='email' placeholder='이메일을 입력하세요' onChange={handleInputChange}/></div><button onClick={handleCheckEmailDuplicate}>중복 확인</button>
            <div css={inputBox}> <label>비밀번호</label> <input type="password" name='password'  placeholder='비밀번호를 입력하세요' onChange={handleInputChange}/></div>
            <div css={inputBox}> <label>이름</label> <input type="text" name='name' placeholder='이름을 입력하세요' onChange={handleInputChange}/></div>
            <div css={inputBox}> <label>닉네임</label> <input type="text" name='nickname'  placeholder='닉네임을 입력하세요' onChange={handleInputChange}/></div>
            <div css={inputBox}> <label>전화번호</label> <input type="text" name='phone'  placeholder='전화번호를 입력하세요' onChange={handleInputChange}/></div>
            
            <div>
                <button css={btn} onClick={handleSignupSubmit} >회원가입</button> 
                <button css={btn} onClick={handleSigninPage}>로그인</button>
            </div>

        </SignLayout>

    );
}

export default SignUp;