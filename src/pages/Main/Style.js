import { css } from '@emotion/react';
import Logo from '../../img/Start.png';


export const MainBase = css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const LogoImg = css`
    cursor: pointer;
    background-image: url(${Logo});
    background-size: cover;
    width: 500px;
    height: 500px;
    transition: transform 0.4s ease-out; 

    &:hover{
        opacity: 0.5;    
        transform: scale(0.9);
    }
    &:active {
        opacity: 1;    
    }
`;

export const MenuBox = css`
    position: relative;

    &>div{
        cursor: pointer;
        width: 100px;
        height: 100px;
        font-size: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
    }

    &>div:hover{
        opacity: 0.5;    
        transform: scale(0.9);
    }
    &>div:active {
        opacity: 1;    
    }
`;