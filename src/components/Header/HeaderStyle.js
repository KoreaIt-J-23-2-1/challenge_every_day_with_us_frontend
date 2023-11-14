import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */

export const Layout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    padding: 5px 0px;
`;

export const HeaderBox = css`
    position: fixed;
    top: 0;
    width: 99%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    background-color:#ffffff50;
    z-index: 100;
    padding: 5px 10px;
    /* box-shadow: 0 10px 20px -5px #ededed; */
    `;

export const HeaderTitleBox = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px auto;
    height: 35px;
    width: 70%;
    /* border: 1px solid #ededed; */
    border-radius: 50px;
    box-shadow: 0px 3px 6px 0px #ededed;

`;

export const LogoBtn = css`
    cursor: pointer;
    margin: 0px 10px;
    width: 50px;
    height: 50px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

export const Icon = css`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px;
    padding: 2px;
    height: 40px;
    width: 40px;
    font-size: 27px;
`;

export const LetterCountBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
    bottom: 15px;
    border-radius: 50%;
    padding: 3px;
    width: 13px;
    height: 13px;
    color: red;
    background-color: #ffe292;
`;


export const LetterSideBarCss = css`
    z-index: 10;
    right: -400px;
    overflow: hidden;
    display: flex;
    position: fixed;
    background-color: white;
    width: 400px;
    height: 92vh;
    transition: right 0.8s ease;
    
`;

export const BackBtn = css`
    cursor: pointer;
`;

