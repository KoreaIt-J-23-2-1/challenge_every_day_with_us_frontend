import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */

export const Background = css`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 500px;
    border-radius: 400px 20px 400px 400px;
    transition: all 1s ease-in;
    
    
`;

export const MenuHeader = css`
    height: 65px;
    display: flex;
    /* align-items: center; */
    justify-content:space-between;
    margin: 0px 10%;
`;

export const MyBox = css`
    padding-bottom: 30px;
    &>button{
        margin-top: 10px;
        cursor: pointer;
        margin: 0px 5px;
        border: none;
        background: none;
        border-bottom: 3px solid #F7F4EC;
        font-size: 15px;
    }
    &>button:hover{
        font-weight: 700;
        border-bottom: 3px solid #EDD0C2;
    }
`;

export const BtnBox = css`
    padding-bottom: 30px;
    &>button{
        margin-top: 10px;
        cursor: pointer;
        margin: 0px 5px;
        border: none;
        background: none;
        border-bottom: 3px solid #F7F4EC;
        font-size: 30px;
    }
    &>button:hover{
        font-weight: 700;
        font-style: italic;
        border-bottom: 3px solid #EDD0C2;
    }
`;