import { css } from '@emotion/react';

export const SubModal = css`
    height: auto;
    width: auto;
    background: rgba(255, 255, 255, 0.7); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    padding: 20px;
    z-index: 2;

    & li {
        width: 100px;
        margin-bottom: 9px;
    }
`;

export const Layout = css`
    background: rgba(255, 255, 255, 0.9); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    padding: 20px;
    z-index: 1;

    & > div > b {
        font-size: 18px;
        font-weight: 900;
        margin-right: 5px;
    }

    & > div {
        font-size: 12px;
        margin: 0px 0px 15px 0px;
    }
`;

export const Challenger = css`
    cursor: pointer;
`;