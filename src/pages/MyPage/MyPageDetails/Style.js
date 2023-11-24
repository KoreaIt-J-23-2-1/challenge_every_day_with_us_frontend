import { css } from "@emotion/react";

export const Layout = css`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`;

export const inputBoxLayout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0px 20px;
    width: 350px;
`;

export const userBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    width: 600px;
    height: 600px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.4); 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    & h2 {
        color: #333;
    }

    & button {
        border: none;
        padding: 5px 10px;
        margin: 10px 2px;
        background: rgba(255, 255, 255, 0.5); 
        border-radius: 15px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        width: 250px;

        &:hover{
            background: rgba(80, 80, 80, 0.2);
        }
        &:active{
            background: rgba(80, 80, 80, 0.4);
        }
    }
`;

export const inputBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #dbdbdb;
    padding: 0 17px;
    width: 300px;
    height: 70px;

    & > input {
        border: none;
        margin-left: 10px;
        border-radius: 15px;
        padding: 10px;
        font-size: 15px;
        padding: 10px;
        &:focus {
            outline: none;
        }
    }
`;

