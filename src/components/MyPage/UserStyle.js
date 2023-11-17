import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    margin: 50px;
`;

export const UserBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const ImgBoxImg = css`
    position: absolute;
    top: -18px;
    right: 120px;
    transform: rotate(25deg);

    & img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
    }
`;

export const ImgBox = css`
    margin-bottom: 20px;
    border: 2px solid #dbdbdb;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;

    & img {
        max-width: 100%;
        max-height: 100%;
        width: 100px;
        height: 100px;
    }
`;

export const IntroBox = css`
    display: flex;
    flex-direction: column;

    & textarea {
        resize: none;
        margin-bottom: 20px;
    }
`;

export const BtBox = css`
    display: flex;
    justify-content: center;
`;

export const UserCheckBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-right: 10px;
    width: 350px;
    height: 150px;
    border: 5px solid #dbdbdb;
`;

export const ProfileText = css`
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;

    & p {
        margin: 5px 10px;
        font-size: 20px;
        font-weight: 600;
    }
`;

export const ProfileBox = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const modalStyle = css`
    display: flex;
    flex-direction: row;
`;

export const SStore = css`
    overflow: auto;
    width: 100%;
    height: 100%;
    background-color: #dbdbdb;
`;