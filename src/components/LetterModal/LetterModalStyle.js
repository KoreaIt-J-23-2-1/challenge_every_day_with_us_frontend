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
    background: rgba(0, 0, 0, 0.5);
`;

export const modalContent = css`
    padding: 20px;
    width: 400px;
    max-width: 500px;
    background: rgba(255, 255, 255, 0.9); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: none;
    
`;