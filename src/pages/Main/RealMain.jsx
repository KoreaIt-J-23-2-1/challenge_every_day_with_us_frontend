import React, { useEffect, useState } from 'react';
import * as S from './Style';
import { css } from '@emotion/react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useQueryClient } from 'react-query';

/** @jsxImportSource @emotion/react */

function RealMain(props) {

    const navigate = useNavigate();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;   
    const [ profileImgSrc, setProfileImgSrc ] = useState("");
    
    useEffect(() => {
        setProfileImgSrc(principal.profileUrl);
    }, [])

    const handleLogoutButton = async () => {
        localStorage.removeItem("accessToken");
        window.location.replace("/");
    };

    return (
        <BaseLayout>
            <div css={S.HederBox}>
                <div css={S.ProfileBox}>
                    <div css={S.BtnBox}>
                        <div>
                            {!!principalState?.data?.data ? (
                                <button onClick={handleLogoutButton}>로그아웃</button>
                            ) : (
                                <button onClick={() => { navigate("/auth/signin") }}>로그인</button>
                            )}                        
                        </div>
                    </div>


                </div>

                <div css={S.MenuBox}>

                </div>

                <div css={S.ProfileImg}>
                </div>
            </div>

            <div css={S.ContentBox}>

            </div>
        
        </BaseLayout>
    );
}

export default RealMain;