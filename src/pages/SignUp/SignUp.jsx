import React from 'react';
import SignLayout from '../../components/SignLayout/SignLayout';
import { css } from '@emotion/react';
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
    return (
        <SignLayout>
            <h1>회원가입</h1>

            <div css={inputBox}> <label>이메일</label> <input type="email" name='email' placeholder='이메일을 입력하세요'/></div>
            <div css={inputBox}> <label>비밀번호</label> <input type="password" name='password'  placeholder='비밀번호를 입력하세요'/></div>
            <div css={inputBox}> <label>이름</label> <input type="text" name='name' placeholder='이름을 입력하세요'/></div>
            <div css={inputBox}> <label>닉네임</label> <input type="text" name='nickname'  placeholder='닉네임을 입력하세요'/></div>
            <div css={inputBox}> <label>전화번호</label> <input type="text" name='phone'  placeholder='전화번호를 입력하세요'/></div>
            
            <button css={btn}>회원가입</button>

        </SignLayout>

    );
}

export default SignUp;