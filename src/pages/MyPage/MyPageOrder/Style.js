import { css } from '@emotion/react';

export const SOrderHeader = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`;

export const SBaseLayout = css`
    overflow-y: auto;
    scroll-behavior: smooth;
    max-height: 600px;
    margin: 20px 30px;
    padding-right: 15px;
`;

export const SItemContainer = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
`;

export const SItemHeader = css`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const SItemDetail = css`
    font-size: 14px;
    margin-bottom: 8px;
`;

export const SItemPrice = css`
    font-size: 16px;
    font-weight: bold;
    margin: 4px 0px 12px;
`;

