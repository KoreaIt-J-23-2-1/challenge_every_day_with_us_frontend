import { css } from '@emotion/react';


// 검색창
export const searchContainer = css`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    width: 100%;
    
    & > * {
        margin-left: 5px;
    }
`;
export const selectBox = css`
    width: 100px;
    `;
export const SChallengeList = css`
    width: 100%;
    border: 1px solid #dbdbdb;
    `;

export const listTable = css`
    overflow-y: auto;
    width: 938px;
    border-collapse: collapse;
    & th, td {
        height: 30px;
        text-align: center;
        cursor: pointer;
    }
    & td {
        cursor: pointer;
        
    }
    
`;

export const SChallengeListHeader = css`
    overflow-y: auto;

    & > tr {
        display: flex;
        & > th {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
        }
        & > th:nth-of-type(1) {width: 7%;}
        & > th:nth-of-type(2) {width: 53%;}
        & > th:nth-of-type(3) {width: 15%;}
        & > th:nth-of-type(4) {width: 20%;}
        & > th:nth-of-type(5) {width: 5%;}
    }
`;

export const SChallengeListBody = css`
    height: 300px;
    overflow-y: auto;

    & > li {
        display: flex;
        cursor: pointer;
        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            border: 1px solid #dbdbdb;
        }
        & > div:nth-of-type(1) {width: 7%;}
        & > div:nth-of-type(2) {
            width: 53%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        & > div:nth-of-type(3) {width: 15%;}
        & > div:nth-of-type(4) {width: 20%;}
        & > div:nth-of-type(5) {width: 5%;}
    }
`;

export const SPageNumbers = css`
    display: flex;
    align-items: center;
    margin-top: 10px;
    width: 200px;

    & button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 3px;
        width: 20px;
        border: 1px solid #dbdbdb;
        cursor: pointer;
    }

`;
