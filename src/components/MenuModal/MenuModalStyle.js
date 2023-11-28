// MenuModalStyle.js

import { css } from '@emotion/react';

export const Background = (isActive) => css`
    position: absolute;
    top: 10px;
    right: 3px;
    width: ${isActive ? '440px' : '0'};
    height: ${isActive ? '230px' : '0'};
    border-radius: 40px 20px 40px 40px;
    transition: width 0.5s ease-in, height 0.4s ease-in;
    overflow: hidden;
    background-color: #efd1c5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;


export const MenuBody = (isActive) => css`
    width: 400px;
    height: 250px;
    padding-top: 5px;
    display: flex;
    flex-direction: column;
    /* transition: opacity 0.7s ease; */
    opacity: ${isActive ? 1 : 0};
`;


export const MenuHeader = css`
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: end;
    margin: 0px 10%;
`;

export const MyBox = css`
    padding-bottom: 20px;

    & > button {
        cursor: pointer;
        margin: 0px 5px;
        border: none;
        background: none;
        border-bottom: 3px solid #efd1c5;
        font-size: 15px;
    }
    
    & > button:hover {
        font-weight: 700;
        border-bottom: 3px solid #dadde2;
    }
`;

export const BtnBox = (isActive) => css`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    opacity: ${isActive ? '1' : '0'};
    transition: opacity 0.7s ease-in;
    
    
    &>div{
        display: flex;
        /* justify-content: center; */
        margin-bottom: 20px;
        padding-left: 10px;
        height: 35px;
    }
    & > div> div {
        margin-top: 10px;
        cursor: pointer;
        margin: 0px 5px;
        border: none;
        background: none;
        border-bottom: 3px solid #efd1c5;
        font-size: 25px;
        display: flex;
        align-items: center;
    }

    & >div> div:hover {
        font-weight: 700;
        font-style: italic;
        border-bottom: 3px solid #dadde2;
    }
`;

export const BtnMotion = css`
    &>b{
        margin-left: 9px;
        opacity: 0;
        width: 0px;

    }
    &:hover{
        &>b{
            opacity: 1;
            font-size: 15px;
            font-weight: 700;
            width: 100%;
        }
    }


`;