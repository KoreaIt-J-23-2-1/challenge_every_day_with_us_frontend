import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

import Logo from '../../img/Start.png';

function LogoPage() {
    const navigate = useNavigate();

    const GoMainPage = () => {
        setTimeout(() => {
            navigate("/maain");
        }, 400);
    };

    useEffect(() => {
        const autoGoMainPage = setTimeout(() => {
            navigate("/maain");
        }, 2500);
        return () => clearTimeout(autoGoMainPage);
    }, [navigate]);

    return (
        <div css={S.layout}>
            <div css={S.LogoImg} onClick={GoMainPage} ></div>
        </div>
    );
}
export default LogoPage;
