import { css } from '@emotion/react';

export const SubModal = css`
    width: 400px;
    height: auto;
`;

export const imgBox = css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 10px 0px;
    border-radius: 10px;
    width: 100%;
    height: 250px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    &>img{
        max-height: 100%;
    }
    &>:active{
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    }

`;

export const file = css`
    display: none;
`;

export const textBox = css`

    & > textarea{
        width: 100%;
        background: rgba(255, 255, 255, 0.5); 
        border-radius: 15px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin: 10px 0px;
        resize: none;
        transition: width 0.3s;
        border: none;
    }    
    & > textarea:focus{
        outline: none;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    }
`;

export const ModifyBtn = css`
    width: 100%;
    height: 40px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.5); 
    &:hover {
        background: rgba(200, 200, 200, 0.5); 
    }
    &:active {
        background: rgba(180, 180, 180, 0.5); 
    } 
`;
