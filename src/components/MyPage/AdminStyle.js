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
    top: -15px;
    right: 350px;
    transform: rotate(25deg);

    & img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
    }
`;

export const SChallengeList = css`
    width: 100%;
    border: 1px solid #dbdbdb;
    padding: 0px;
`;

export const Alignment = css`
    margin-top: 20px;

    & div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & label {
        margin-right: px;
        font-size: 12px;
    }
`;

export const searchContainer = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    
    & > input {
        margin-left: 10px;
    }
`;

export const selectBox = css`
    width: 150px;
    height: 10px;
`;

export const SChallengeListContainer = css`
    display: flex;
    flex-direction: column;
`;

export const SChallengeListHeader = css`
    overflow-y: auto;
    margin: 20px;
    margin-left: 50px;
    white-space: nowrap;

    & > li {
        display: flex;
        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 50px;
        }
        & > div:nth-of-type(1) {width: 20%;}
        & > div:nth-of-type(2) {width: 15%;}
        & > div:nth-of-type(3) {width: 4%;}
        & > div:nth-of-type(4) {width: 11%;}
        & > div:nth-of-type(5) {width: 5%;}
    }
`;

export const SChallengeListBody = css`
    height: 150px;
    white-space: nowrap;
    overflow-y: auto;

    & > li {
        display: flex;
        margin-bottom: 10px;

        cursor: pointer;
        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        & > div:nth-of-type(1) {width: 30%;}
        & > div:nth-of-type(2) {width: 15%;}
        & > div:nth-of-type(3) {width: 15%;}
        & > div:nth-of-type(4) {width: 12%;}
        & > div:nth-of-type(5) {width: 15%;}
    }
`;

export const StopButton = css`
    display: flex;
    align-items: center;
    border: 1px solid #fff;
    border-radius: 5px;
    background-color: transparent;
    margin-left: 2px;
    cursor: pointer;

    &:hover {
        background-color: #eee;
    }
`;

export const Deletebutton = css`
    display: flex;
    align-items: center;
    border: 1px solid #fff;
    border-radius: 5px;
    background-color: transparent;
    margin-left: 2px;
    cursor: pointer;

    &:hover {
        background-color: crimson;
        color: white;
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
    width: 400px;
    height: 300px;
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

export const ModalOverlay = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = css`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
`;

export const Chart = css`
    display: flex;
    margin-top: 20px;

    & h2 {
    }
`;