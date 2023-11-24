import React, { useState } from 'react';
import SignLayout from '../../components/SignLayout/SignLayout';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import LoginModal from '../../components/LoginModal/LoginModal';
import TitleComponent from '../../components/TitleComponent/TitleComponent';

function SignIn(props) {
    const [ isModalOpen, setModalOpen ] = useState(false);
        
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

    const handleAdminLoginModalOpenClick = () => {
        setModalOpen(true);
    };

    const handleAdminLoginModalCloseClick = () => {
        setModalOpen(false);
    }

    return (
        <BaseLayout>
            <TitleComponent title="로그인 시 사이트 이용이 가능합니다 ! "/>
            <div css={S.Layout}>
                <h2>간편로그인</h2>
                <div>
                    <div css={S.btnBox}>
                        <img onClick={handleGoogleSignin} src="https://firebasestorage.googleapis.com/v0/b/challengewithus-1ffef.appspot.com/o/button%2Fweb_neutral_sq_ctn%404x.png?alt=media&token=67d467dc-d735-4a5b-853e-0c002c77b9f6" alt="" />
                        <img onClick={handleKakaoSignin} src="https://firebasestorage.googleapis.com/v0/b/challengewithus-1ffef.appspot.com/o/button%2Fkakao_login_large_wide.png?alt=media&token=277f1adf-0b19-4abb-b173-f0ac59da60d3" alt="" />
                        <img onClick={handleNaverSignin} src="https://firebasestorage.googleapis.com/v0/b/challengewithus-1ffef.appspot.com/o/button%2FbtnG_official.png?alt=media&token=1c50c7cc-3746-4107-87f8-9b28fd312898" alt="" />
                        <div css={S.AdminButton}>
                            <button onClick={handleAdminLoginModalOpenClick}>관리자 로그인</button>
                        </div>
                    </div>
                    {isModalOpen && (
                        <div css={S.ModalOverlay} onClick={handleAdminLoginModalOpenClick}>
                            <div css={S.ModalContent}>
                                <LoginModal onClose={handleAdminLoginModalCloseClick}/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </BaseLayout>
    );
}

export default SignIn;