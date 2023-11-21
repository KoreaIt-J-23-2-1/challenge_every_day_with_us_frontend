import React, { useEffect, useState } from 'react';
import SignLayout from '../../components/SignLayout/SignLayout';
import { css } from '@emotion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { async } from 'q';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { storage } from '../../api/firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

function SignUp(props) {
    const navigete = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();

    const user = {
        email: searchParams.get('email'),
        password: "",
        name: searchParams.get('name'),
        nickname: "",
        phone:"",
        oauth2Id: searchParams.get("oauth2Id"),
        profileUrl: searchParams.get("picture")
    };

    const [ signupUser, setSignupUser ] = useState(user);

    const handleSignupSubmit = async() => {
        try {
            await instance.post("/api/auth/sign-up", signupUser);
            alert("회원가입 완료");
            // window.location.replace("/auth/signin");
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
    
    const handleCheckEmailDuplicate = async () => {
        try {
            const response = await instance.get(`/api/auth/duplicate/${signupUser.email}`);
            if(response.data === true) {
                alert("이미 존재하는 이메일 입니다.");
                return;
            }
            alert("사용 가능한 이메일 입니다.");

        }catch(error) {
            console.error(error);
            alert("확인 실패");

        }
    }

    return (
        <SignLayout>
            <h1>회원가입</h1>
            <div css={S.inputBox}> <label>이메일</label> <input type="email" name='email' placeholder='이메일을 입력하세요' value={signupUser?.email} onChange={handleInputChange}/></div><button onClick={handleCheckEmailDuplicate}>중복 확인</button>
            <div css={S.inputBox}> <label>비밀번호</label> <input type="password" name='password'  placeholder='비밀번호를 입력하세요' onChange={handleInputChange}/></div>
            <div css={S.inputBox}> <label>이름</label> <input type="text" name='name' placeholder='이름을 입력하세요' value={signupUser?.name} onChange={handleInputChange} disabled={true}/></div>
            <div css={S.inputBox}> <label>닉네임</label> <input type="text" name='nickname'  placeholder='닉네임을 입력하세요' onChange={handleInputChange}/></div>
            <div css={S.inputBox}> <label>전화번호</label> <input type="text" name='phone'  placeholder='전화번호를 입력하세요' onChange={handleInputChange}/></div>
            
            <div>
                <button css={S.btn} onClick={handleSignupSubmit} >회원가입</button> 
                <button css={S.btn} onClick={handleSigninPage}>로그인</button>
            </div>

        </SignLayout>

    );
}

export default SignUp;