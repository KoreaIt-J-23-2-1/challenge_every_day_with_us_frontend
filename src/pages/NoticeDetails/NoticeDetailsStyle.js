import { css } from '@emotion/react';

export const Header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100%;
    margin-top: 20px;
    border-bottom: 2px solid #dbdbdb;
    
    & b {
        width: 100%;
    }
`;

export const Box = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-top: 20px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.4); 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    height:660px;
    width: 100%;
`;


export const NoticeHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100%;
`;

export const NoticeTitle = css`
    width: 100%;
    font-size: 40px;
    font-weight: 700;
    display: flex;
    align-items: center;
    &>a{
        font-size: 25px;
        margin-right: 10px;
        color: #7e7e7e;
    }
`;

export const NoticeInfo = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #9d9d9d;
    font-size: 14px;
    color: #8a8a8a;
`;

export const NoticeContent = css`
    width: 100%;
    padding: 30px;
    font-size: 15px;
`;

export const pointFont = css`
    font-size: 17px;
    font-style: oblique;
    fo
`;

export const btnBox = css`
    display: flex;
    justify-content: end;
    width: 100%;
    margin: 20px 0px;

    & > button{
        width: 80px;
        height: 30px;
        background: rgba(255, 255, 255, 0.4); 
        border-radius: 10px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border: none;
        cursor: pointer;
        margin: 0px 10px;

        &:active {
            background-color: #dbdbdb;
        }

        &:hover {
            background-color: #eee;
        }
    }
`;

export const ContentBox = css`
    margin-top: 20px;
    height: 450px;
    background: rgba(255, 255, 255, 0.8); 
    border-radius: 10px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: none;
    padding: 30px;
`;