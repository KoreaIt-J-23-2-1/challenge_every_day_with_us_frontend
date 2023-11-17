import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
`;

export const TitleLayout = css`
    position: absolute;
    top: 0px;
    left: 50px;

    & b {
        margin: 0px 10px;
    }
`;

export const TimeLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    width: 600px;
    height: 200px;
    font-size: 100px;
    border: 1px solid black;
    border-radius: 10px;
    letter-spacing: 10px;
    text-align: center;
`;

export const ButtonLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;

    & button {
        width: 200px;
        height: 30px;
        background-color: transparent;
        border-radius: 5px;
    }
`;

export const textLayout = css`
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
`;

export const textareaBox = css`
    resize: none;
`;

export const imagePreview = css`
    margin-left: 50px;
    max-width: 100%;
    max-height: 200px;
    border-radius: 10px;
`;

export const FileBox = css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const SaveButton = css`
    position: absolute;
    right: 30px;
    bottom: 30px;
    width: 100px;
    height: 30px;
    background-color: transparent;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    cursor: pointer;

    &:active {
        background-color: #dbdbdb;
    }
`;