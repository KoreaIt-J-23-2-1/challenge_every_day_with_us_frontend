import { css } from '@emotion/react';

export const Layout = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const TimeLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 600px;
    height: 150px;
    font-size: 100px;
    letter-spacing: 10px;
    text-align: center;
    margin: 20px 0px;
    padding: 10px 0px;
`;

export const ButtonLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;

    & button {
        cursor: pointer;
        width: 200px;
        height: 30px;
        background-color: transparent;
        border-radius: 5px;
    }
`;

export const contentBox = css`
    margin: 20px;
    display: flex;
    width: 100%;
    height: 350px;
    justify-content: space-between;

    &>div{
        display: flex;
        flex-direction: column;
    }

`;

export const textBox = css`
    border-radius: 10px;
    height: 100%;

    &>textarea{
        resize: none;
        background: rgba(255, 255, 255, 0.5); 
        border-radius: 15px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin: 10px 0px;
        height: 300px;
        resize: none;
        transition: width 0.3s;
        border: none;
    }    
    &>textarea:focus{
        outline: none;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    }
`;

export const imgBox = css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 10px 0px;
    border-radius: 10px;
    width: 440px;
    height: 300px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    &>img{
        width: 100%;
        height: 100%;
    }
    &>:active{
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    }
`;


export const file = css`
    display: none;
`;


export const SaveBtn = css`
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