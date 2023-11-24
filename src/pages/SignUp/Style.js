import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 70px;

    & button {
        margin: 15px;
        width: 300px;
        height: 30px;
        background-color: #efefef;
        border: none;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        cursor: pointer;

        &:active {
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);    
        }
    }
`;

export const inputBox = css`
    margin: 5px;

    & > label{
        display: flex;
        align-items: center;
        width: 100px;
        font-size: 12px;
        padding-left: 9px;
    }

    & > input {
        margin-top: 5px;
        width: 300px;
        height: 30px;
        background-color: #fff;
        border: none;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        outline: none;
        padding-left: 10px;
    }
`;

export const btn = (isEmailChecked) => css`
    margin: 15px;
    width: 300px;
    height: 30px;
    background-color: #efefef;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:active {
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);    
    }

    ${isEmailChecked && css`
        display: none;
    `}
`;