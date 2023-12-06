import React from 'react';
/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import * as S from "./LogoutStateStyle";

function MypageDetailSideBar({ setUploadFiles, children }) {
    const navigate = useNavigate();




    return (
        <div css={S.layout}>
            <div css={S.sideBox}>
                <div css={S.text}>
                    <b> 환영합니다 !</b>

                    <b>로그인 시 사이트 이용이 가능합니다</b>

                    <b>챌어스에서 당신의 도전을 응원합니다</b>
                </div>

                <button css={S.LoginBtn} onClick={() => { navigate("/auth/signin") }}>로그인</button>


            </div>
        </div>
    );
}

export default MypageDetailSideBar;