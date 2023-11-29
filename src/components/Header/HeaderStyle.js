import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import logo1 from '../../img/상단로고01.png';
import logo2 from '../../img/상단로고02.png';


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

export const LogoBox = css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const LogoBtn = css`
    cursor: pointer;
    background-image: url(${logo1});
    background-repeat: no-repeat;
    width: 550px;
    height: 100%;
    margin-left: 9%;

    &:hover{
        background-image: url(${logo2});
        opacity: 0.7;

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
    color: salmon;
    font-weight: 700;
    font-size: 12px;
    background-color: linen;
`;

export const LetterSideBarCss = css`
    z-index: 10;
    right: -440px;
    overflow: hidden;
    display: flex;
    justify-content: end;
    position: fixed;
    width: 450px;
    height: 900px;
    transition: right 0.8s ease;
    top: 80px;
    bottom: 20px;
`;

