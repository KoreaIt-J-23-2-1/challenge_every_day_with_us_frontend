// MenuModalStyle.js

import { css } from '@emotion/react';

export const Background = (isActive) => css`
    position: absolute;
    top: 10px;
    right: 3px;
    width: ${isActive ? '450px' : '0'};
    height: ${isActive ? '220px' : '0'};
    border-radius: 400px 20px 400px 400px;
    transition: width 0.5s ease-in, height 0.4s ease-in;
    overflow: hidden;
    background-color: #F7F4EC;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;


export const MenuBody = (isActive) => css`
    width: 400px;
    height: 250px;
    padding-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: start;
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
        border-bottom: 3px solid #F7F4EC;
        font-size: 15px;
    }
    
    & > button:hover {
        font-weight: 700;
        border-bottom: 3px solid #EDD0C2;
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
        padding-left: 60px;
    }
    & > div> button {
        margin-top: 10px;
        cursor: pointer;
        margin: 0px 5px;
        border: none;
        background: none;
        border-bottom: 3px solid #F7F4EC;
        font-size: 25px;
    }

    & >div> button:hover {
        font-weight: 700;
        font-style: italic;
        border-bottom: 3px solid #EDD0C2;
    }
`;