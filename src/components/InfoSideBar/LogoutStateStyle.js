import { css } from "@emotion/react";
import back from '../../img/반짝효과.png';


export const layout = css`
    display: flex;
    align-items: stretch;
    overflow: hidden;
    height: 670px;
    width: 1350px;
    border-radius: 10px;
`;

export const sideBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 670px;
    z-index: 1;
    padding: 15px;
    background-color: #fff;

    &:hover{
        background-image: url(${back});

    }
`;


export const text = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;
    &>b{
        margin: 10px 0px;
    }
`;


export const LoginBtn = css`
    width: 150px;
    height: 50px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: none;
    margin: 25px;
    cursor: pointer;
    
    &:hover{
        background: rgba(80, 80, 80, 0.2);
        font-weight: 700;
    }
    &:active{
        background: rgba(80, 80, 80, 0.4);
    }
`;