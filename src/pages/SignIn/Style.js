import { css } from '@emotion/react';
import { SubModal } from '../../components/LoginModal/Style';

export const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    margin-top: 20px;

    & img {
        width: 200px;
        height: 35px;
        margin-bottom: 10px;
        border-radius: 10px;
        cursor: pointer;
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

        &:active {
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);    
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