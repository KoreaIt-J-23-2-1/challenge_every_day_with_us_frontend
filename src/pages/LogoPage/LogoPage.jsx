import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
/** @jsxImportSource @emotion/react */
import Logo from '../../img/Start.png';

const layout = css`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    height: 85vh;
    margin-left: 20px;

`;

const LogoImg = css`
    cursor: pointer;
    background-image: url(${Logo});
    background-size: cover;
    top: 0px;
    left: 0px;
    width: 500px;
    height: 500px;
    transition: transform 0.4s ease-out; 

    &:hover{
        opacity: 0.5;    
        transform: scale(0.9);
    }
    &:active {
        opacity: 1;    
    }
`;

function LogoPage() {
    const navigate = useNavigate();

    const GoMainPage = () => {
        setTimeout(() => {
            navigate("/main");
        }, 400);
    };

    useEffect(() => {
        const autoGoMainPage = setTimeout(() => {
            navigate("/main");
        }, 2500);
        return () => clearTimeout(autoGoMainPage);
    }, [navigate]);

    return (
        <div css={layout}>
            <div css={LogoImg} onClick={GoMainPage} ></div>

        </div>
    );
}
export default LogoPage;
