import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    justify-content: center;
    align-items: stretch;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
`;

export const sideBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 350px;
    background-color: #fff;
    box-shadow: 5px 1px 8px 0 rgba(0,0,0,.06);
    border-left: 1px solid rgba(0,0,0,.08);
    vertical-align: top;
    z-index: 1;
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
    width: 100px;
    height: 100px;
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
        margin-top: 20px;
        font-size: 18px;
        font-weight: 900;
    }

    & > p {
        font-size: 12px;
        color: #777
    }
`;

export const line = css`
    margin-top: 40px;
    border-top: 1px solid rgba(146,146,148,.3);
`;

export const leftHeader = css`
    display: flex;
    
`;

export const leftMenu = css`
    margin-top: 50px;
    list-style: none;
    padding: 0 39px;
    font-size: 16px;
    cursor: pointer;

    & > li {
        margin-bottom: 20px;

        &:hover {
        color: #666 !important;
        }
    }
`;