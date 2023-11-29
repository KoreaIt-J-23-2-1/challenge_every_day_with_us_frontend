import { css } from '@emotion/react';
import { SubModal } from '../../components/LoginModal/Style';

export const Layout = css`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    margin-top: 130px;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    
`;

export const btnBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
    padding: 30px 50px ;


    &>img {
        width: 200px;
        height: 40px;
        margin: 10px;
        border-radius: 10px;
        cursor: pointer;
        transition: transform 0.5s ease; 

    }
    &>img:hover{
        transform: scale(1.07);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  

    }
    &>img:active{
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  

    }
`;

export const GoogleButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 13px;
    border: none;
    border-radius: 10px;
    width: 214px;
    height: 41px;
    font-size: 16px;
    cursor: pointer;
    background-color: rgb(232,234,237);
    color: black;

    & > :nth-of-type(1) {
        margin-right: 3px;
        width: 20px;
        height: 20px;
    }

    & * {
        color: #FFFFFF;
    }
`;

export const KakaoButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 13px;
    border: none;
    border-radius: 10px;
    width: 214px;
    height: 41px;
    font-size: 16px;
    cursor: pointer;
    background-color: #fee500;
    color: black;

    & > :nth-of-type(1) {
        margin-right: 3px;
        width: 20px;
        height: 20px;
    }

    & * {
        color: black;
    }
`;

export const NaverButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 13px;
    border: none;
    border-radius: 10px;
    width: 214px;
    height: 41px;
    font-size: 16px;
    cursor: pointer;
    background-color: #03c75a;
    color: #FFFFFF;

    & > :nth-of-type(1) {
        margin-right: 3px;
        width: 20px;
        height: 20px;
    }

    & * {
        color: #FFFFFF;
    }
`;

export const AdminButton = css`
    position: absolute;
    bottom: 0px;
    right: -140px;

    & button {
        margin: 20px;
        width: 100px;
        height: 35px;
        background-color: #efefef;
        border: none;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        cursor: pointer;

        &:hover{
        background: rgba(150, 150, 150, 0.2); 

    }

        &:active {
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);    
        }
    }
`;

export const ModalOverlay = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

export const ModalContent = css`
    height: 500px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;

    ${SubModal} 
`;