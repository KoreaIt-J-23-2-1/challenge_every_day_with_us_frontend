// MenuModalStyle.js

import { css } from '@emotion/react';

export const Background = (isActive) => css`

    position: absolute;
    top: 10px;
    right: 3px;
    width: ${isActive ? '440px' : '0'};
    height: ${isActive ? '250px' : '0'};
    border-radius: 40px 20px 40px 40px;
    transition: width 0.5s ease-in, height 0.4s ease-in;
    overflow: hidden;
    background-color: #fafafa;
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
    display: flex;
    justify-content: end;
    margin:10px;
    margin-bottom: 30px;
`;

export const HeaderBtnBox = css`
    height: 25px;

    & > button {
        font-family: 'KIMM_300';
        cursor: pointer;
        margin: 0px 5px;
        border: none;
        background: none;
        border-bottom: 3px solid #fafafa;
        font-size: 15px;
    }
    
    & > button:hover {
        font-family: 'KIMM_700';
        background-color: #E9D3C9;
        font-style: italic;
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
        padding-left: 10px;
        height: 45px;
    }

`;

export const BtnMotion = css`
    font-family: 'KIMM_300';
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
    border: none;
    background: none;
    font-size: 25px;
    display: flex;
    align-items: center;

    &>b{
        margin-left: 9px;
        opacity: 0;
        width: 0px;
        height: 0px;
        display: flex;
        align-items: center;

    }
    &:hover{
        font-style: italic;

        &>b{
            opacity: 1;
            font-size: 15px;
            font-weight: 700;
            width: 100%;
        }
    }


`;