import { css } from '@emotion/react';
import { SubModal } from '../AdminModal/Style';

export const Layout = css`
    display: flex;
    flex-direction: column;
    margin: 50px;
    width: 100%;
`;

export const UserBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ImgLayout = css`
    position: relative;
`;

export const ProfileImgBox = css`
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

export const ImgBoxImg = css`
    position: absolute;
    top: -15px;
    right: 5px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;

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
            margin: 0px 9px;
        }
        & > div:nth-of-type(1) {width: 25%;}
        & > div:nth-of-type(2) {width: 17%;}
        & > div:nth-of-type(3) {width: 14%;}
        & > div:nth-of-type(4) {width: 12%;}
        & > div:nth-of-type(5) {width: 14%;}
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
            margin: 0px 8.5px;
        }
        & > div:nth-of-type(1) {width: 30%;}
        & > div:nth-of-type(2) {width: 12%;}
        & > div:nth-of-type(3) {width: 16%;}
        & > div:nth-of-type(4) {width: 9%;}
        & > div:nth-of-type(5) {width: 16%;}
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

export const ModalContent = css`
    height: 500px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;

    ${SubModal} 
`;

export const Chart = css`
    display: flex;
    margin-top: 20px;

    & h2 {
        margin-left: 50px;
    }

    & > div {
        width: 100%;
        height: 100%;
    }
    flex-direction: column;
    align-items: center;
    height: 200px;
`;