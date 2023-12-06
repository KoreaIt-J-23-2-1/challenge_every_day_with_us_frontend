import React, { useState } from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import LoginModal from '../../components/LoginModal/LoginModal';
import TitleComponent from '../../components/TitleComponent/TitleComponent';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
const googleLogo = "https://firebasestorage.googleapis.com/v0/b/challengewithus-1ffef.appspot.com/o/button%2F%EA%B5%AC%EA%B8%80%EB%A1%9C%EA%B3%A0.png?alt=media&token=a91d106b-65cc-49c5-9dd0-546dcda82b18";

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
                        <button onClick={handleGoogleSignin} css={S.GoogleButton}><img src={googleLogo}></img>구글 아이디로 로그인</button>
                        <button onClick={handleKakaoSignin} css={S.KakaoButton}><RiKakaoTalkFill />카카오 아이디로 로그인</button>
                        <button onClick={handleNaverSignin} css={S.NaverButton}><SiNaver />네이버 아이디로 로그인</button>
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