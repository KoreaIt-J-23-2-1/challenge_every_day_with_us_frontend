import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    *::-webkit-scrollbar {
        width: 4px;
    }
    *::-webkit-scrollbar-thumb {
        background-color: #dbdbdb
    }
`;

export const selectContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

export const searchContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 19px 0px 0px 10px;
    border-bottom: 2px solid #dbdbdb;
`;

export const InputBox = css`
    background: rgba(255, 255, 255, 0.4); 
    border-radius: 10px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: none;
    margin-left: 10px;
    height: 35px;
    padding: 10px;
    outline: none;
`;

export const ButtonBox = css`
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.4); 
    border-radius: 10px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: none;
    margin-left: 5px;
    height: 35px;
    width: 50px;
    padding: 11px;
    cursor: pointer;

    &:active {
        background: #eee;
    }
`;

export const selectBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SChallengeList = css`
    width: 100%;
    height: 670px;
    border: 1px solid #dbdbdb;
    padding: 0px;
    margin-top: 30px;
    background: rgba(255, 255, 255, 0.7); 
    border-radius: 10px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

`;

export const SChallengeListHeader = css`
    overflow-y: auto;
    margin: 20px;
    margin-left: 50px;
    white-space: nowrap;

    & > li {
        display: flex;
        height: 20px;
        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        & > div:nth-of-type(1) {width: 33%;}
        & > div:nth-of-type(2) {width: 25%;}
        & > div:nth-of-type(3) {width: 7%;}
        & > div:nth-of-type(4) {width: 25%;}
        & > div:nth-of-type(5) {width: 7%;}
    }
`;

export const SChallengeListBody = css`
    height: 605px;
    white-space: nowrap;
    overflow-y: auto;

    & > li {
        display: flex;
        margin-bottom: 10px;
        height: 30px;

        cursor: pointer;
        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        & > div:nth-of-type(1) {width: 40%;}
        & > div:nth-of-type(2) {width: 15%;}
        & > div:nth-of-type(3) {width: 15%;}
        & > div:nth-of-type(4) {width: 15%;}
        & > div:nth-of-type(5) {width: 15%;}
    }
`;

export const Plus = css`
    position: absolute;
    bottom: 20px;
    right: 30px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    & * {
        color: #999;

        &:active {
            color: #444;
        }
    }
`;

export const SelectSt = css`
    .css-13cymwt-control {
        height: 25px;
        width: 150px;
        background: rgba(255, 255, 255, 0.4); 
        border-radius: 10px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border: none;
        font-size: 12px;
    }

    .css-t3ipsp-control {
        height: 25px;
        width: 150px;
        background: rgba(255, 255, 255, 0.4); 
        border-radius: 10px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border: none;
        font-size: 12px;

    }

    .css-1nmdiq5-menu {
        font-size: 12px;
    }
`;