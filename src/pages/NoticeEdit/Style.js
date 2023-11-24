import { css } from '@emotion/react';

export const noticeLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & h1 {
        margin-top: 50px;
        font-weight: 700;
        font-size: 30px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
`;

export const inputBox = css`
    margin: 5px;

    &> label{
        display: flex;
        align-items: center;
        width: 100px;
        font-size: 12px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        margin: 5px 0px;
    }

    & > input {
        margin: 0px 0px 20px 0px;
        width: 100%;
        height: 40px;
        padding-left: 20px;
        background: rgba(255, 255, 255, 0.7); 
        border-radius: 15px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border: none;
        font-size: 15px;
        outline: none;
    }
`;

export const Quill = css`
    width: 700px;
    height: 500px;
    background: rgba(255, 255, 255, 0.7); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: none;
    resize: none;
    outline: none;
    padding: 20px;
    font-size: 15px;
`;


export const btnBox = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 30px;
    width: auto;
    
    & > button{
        cursor: pointer;
        margin: 0px 5px;
        width: 80px;
        height: 30px;
        border: none;
        background: rgba(255, 255, 255, 0.5); 
        border-radius: 15px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

        &:active {
            background-color: #eee;
        }
        
        &:hover {
            background-color: #eee;
        }
    }
`;
