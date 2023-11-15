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
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    z-index: 100;
    /* padding: 5px 10px; */
    
    `;

export const HeaderTitleBox = css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 5px;
    height: 60px;
    width: 80%;
`;

export const LogoBtn = css`
    position: absolute;
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

export const RightIconBox = css`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Icon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 10px;
    font-size: 30px;
`;

export const BackBtn = css`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    font-size: 27px;
`;

export const BtnBackground = css`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    margin: 0px 3px;
    &:hover{
        border-radius: 50%;
        background-color: #efefef;
    }
    &:active{
        background-color: #e5e5e5;

    }
`;

export const LetterCountBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 65px;
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
    width: 400px;
    height: 92vh;
    transition: right 0.8s ease;
    
`;

