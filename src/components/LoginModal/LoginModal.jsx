import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { instance } from '../../api/config/instance';

const FeedEditModal = ({ onClose }) => {
    const modalRef = useRef();
    const user = {
        email: "",
        password: ""                                               
    }
    const [signinUser, setSigninUser] = useState(user);

    const handleSigninSubmit = async () => {
        if (!signinUser.email || !signinUser.password) {
            alert("이메일과 비밀번호를 입력하세요.");
            return;
        }

        try {
            const response = await instance.post("/api/auth/sign-in", signinUser);
            console.log(response);
            if(response && response.data){
                const accessToken = response.data;

                if(accessToken) {
                    localStorage.setItem("accessToken", "Bearer " + response.data);
                    alert("환영합니다 관리자님!");
                    window.location.replace("/main");
                }else {
                    alert("유효하지 않은 토큰입니다.");
                }
            }else {
                alert("관리자만 로그인 할 수 있습니다.");
            }
        }catch(error) {
            console.error(error);
        }   
    }

    const handleInputChange = (e) => {
        setSigninUser({
            ...signinUser,
            [e.target.name]: e.target.value
        });
    }

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div ref={modalRef}>
            <h4>관리자 로그인</h4>
            <div css={S.LoginBox}>
                <input type="email" name='email' placeholder='이메일을 입력하세요' onChange={handleInputChange}/>
                <input type="password" name='password' placeholder='비밀번호를 입력하세요'  onChange={handleInputChange}/>
            </div>
            <button onClick={handleSigninSubmit} css={S.btn}>로그인</button>
        </div>
    );
};

export default FeedEditModal;
