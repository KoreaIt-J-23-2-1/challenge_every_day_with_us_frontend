import { css } from '@emotion/react';


export const listTable = css`
    width: 938px;
    border-collapse: collapse;
    & th, td {
        height: 30px;
        text-align: center;
    }
    & td {
        cursor: pointer;
    }

`;

export const noticeTitle = css`
    max-width: 500px;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const btnBox = css`
    display: flex;
    justify-content: end;
    width: 938px;
    
    & > button{
        cursor: pointer;
        margin: 5px;
        width: 150px;
        height: 30px;
        background-color: #efefef;
        border: none;
    }

    & > button:hover{
        background-color: #dbdbdb;
    }
    
    & > input {
        margin:5px;
        width: 300px;
        height: 25px;
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
