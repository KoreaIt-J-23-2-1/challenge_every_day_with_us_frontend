import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    /* justify-content: flex-start; */
    align-items: stretch;
    overflow: hidden;
    height: 670px;
    width: 1350px;
    border-radius: 10px;
`;

export const sideBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    background-color: #fff;
    box-shadow: 5px 1px 8px 0 rgba(0,0,0,.06);
    border-left: 1px solid rgba(0,0,0,.08);
    vertical-align: top;
    z-index: 1;
    padding: 15px;
`;

export const imgContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const imgBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: 2px solid #dbdbdb;
    overflow: hidden;
    cursor: pointer;

    & > img {
        width: 100%;
    }
`;

export const file = css`
    display: none;
`;

export const profile = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > b {
        margin: 20px 0px 3px 5px;
        font-size: 18px;
        font-weight: 900;
    }

    & > p {
        margin-top: 3px;
        font-size: 12px;
        color: #777
    }

    & b {
        margin-left: 5px;
    }
`;

export const IntroBox = css`
    display: flex;
    flex-direction: column;

    & h5 {
        margin: 0px 0px 5px 5px;
        font-size: 12px;
        color: #777;
    }

    & textarea {
        border: 1px solid #dbdbdb;
        border-radius: 10px;
        resize: none;
        margin-bottom: 10px;
        padding: 5px;
    }

    & button {
        width: 50px;
        height: 20px;
        border: none;
        margin-right: 3px;
        background: rgba(255, 255, 255, 0.5); 
        border-radius: 15px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        font-size: 12px;
        cursor: pointer;

        &:hover {
            background-color: #eee;
        }
    }
`;

export const line = css`
    margin-top: 40px;
    border-top: 1px solid rgba(146,146,148,.3);
`;

export const leftHeader = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const leftMenu = css` 
    margin: 30px 40px 0px 0px;
    list-style: none;
    font-size: 15px;
    font-weight: 600;
    color: #444;
    cursor: pointer;

    & > li {
        margin-bottom: 20px;

        &:hover {
        color: #888 !important;
        }
    }
`;

export const modalOverlay = css`
    position: fixed;
    margin: 0 auto;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;



export const modalContent = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 8px;
    background: #fff;
    z-index: 1001;
`;
