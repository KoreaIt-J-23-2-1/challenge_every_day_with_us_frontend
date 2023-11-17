import { css } from '@emotion/react';

export const btn = css`
    cursor: pointer;
    margin-top: 10px;
    width: 208px;
    height: 30px;
    background-color: #efefef;
    border: none;

    &:hover{
        background-color: #dbdbdb;
    }
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
        width: 200px;
        height: 25px;
    }
`;
