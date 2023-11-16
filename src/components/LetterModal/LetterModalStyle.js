import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */



export const modalContainer = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    background: #8D8B8B50;
`;

export const modalContent = css`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
`;