import React, { useEffect } from 'react';
import logoimg from '../../img/로고이미지1.png';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
/** @jsxImportSource @emotion/react */
import Logo from '../../img/Start.png';

const layout = css`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    height: 85vh;
    margin-left: 20px;

`;

const imgbox = css`
    cursor: pointer;
    margin:  120px auto;
    width: 500px;
    height: 500px;

    &:hover{
        img {
            opacity: 0.5;
        }
    }
`;

const LogoImg = css`
    cursor: pointer;
    background-image: url(${Logo});
    background-size: cover;
    top: 0px;
    left: 0px;
    width: 500px;
    height: 500px;
        &:hover{
            opacity: 0.5;       
    }
`;


function LogoPage() {
    const navigate = useNavigate();

    const GoMainPage = () => {
        navigate("/main");
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
            {/* <div css={imgbox}>
                <img src={logoimg} alt="로고 이미지" onClick={GoMainPage} />
            </div> */}
        </div>
    );
}
export default LogoPage;
