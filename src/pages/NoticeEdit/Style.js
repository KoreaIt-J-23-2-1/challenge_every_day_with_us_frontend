import { css } from '@emotion/react';

export const noticeLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const inputBox = css`
    margin: 5px;

    &> label{
        display: flex;
        align-items: center;
        width: 100px;
        font-size: 12px;
    }

    & > input {
        margin-top: 4px;
        width: 100%;
        height: 25px;
    }
`;

export const btnBox = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 50px;
    width: auto;
    
    & > button{
        cursor: pointer;
        margin: 0px 5px;
        width: 80px;
        height: 30px;
        background-color: #efefef;
        border: none;
    }
    & > button:hover{
        background-color: #dbdbdb;
    }
`;