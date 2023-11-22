import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`;

export const SubModal = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 300px;

    & h4 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        font-size: 20px;
    }
`;

export const LoginBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0px;

    & input {
        margin: 10px;
        width: 170px;
        height: 30px;
        background-color: #fff;
        border: none;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        outline: none;
        padding-left: 10px;
    }
`;

export const btn = css`
    cursor: pointer;
    margin: 10px;
    width: 170px;
    height: 30px;
    background-color: #efefef;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:active {
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);    
    }
`;