import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    width: 90%;
`;

export const searchContainer = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 30px 0px;
    
    & > input {
        margin-left: 10px;
        height: 100%;
    }

    & > button {
        height: 100%;
    }
`;

export const selectBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SChallengeList = css`
    width: 100%;
    border: 1px solid #dbdbdb;
    padding: 0px;
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
        }
        & > div:nth-of-type(1) {width: 7%;}
        & > div:nth-of-type(2) {width: 53%;}
        & > div:nth-of-type(3) {width: 5%;}
        & > div:nth-of-type(4) {width: 24%;}
        & > div:nth-of-type(5) {width: 11%;}
    }
`;

export const SChallengeListBody = css`
    height: 500px;
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
        & > div:nth-of-type(1) {width: 15%;}
        & > div:nth-of-type(2) {width: 40%;}
        & > div:nth-of-type(3) {width: 15%;}
        & > div:nth-of-type(4) {width: 14%;}
        & > div:nth-of-type(5) {width: 16%;}
    }
`;