import { css } from '@emotion/react';

export const StoreHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 600px;
    }
    & * h1 {
        white-space: nowrap;
        font-size: 30px;
    }

    & * h3 {
        white-space: nowrap;
        font-size: 15px;
    }
`;

export const UserPoint = css`
    display: flex;
    justify-content: center;
    align-items: center;
    
    & > h3 > b {
        font-weight: 700;
    }
`;

export const SBaseLayout = css`
    overflow-y: auto;
    scroll-behavior: smooth;
    max-height: 650px;
    margin: 20px 30px;
    padding-right: 15px;

    ::-webkit-scrollbar {
    width: 2px;
    }
    ::-webkit-scrollbar-thumb {
    background-color: #dbdbdb
    }
`;

export const SItemLayout = css`
    display: flex;
    background: rgba(255, 255, 255, 0.7); 
    margin-bottom: 20px;
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

export const SItemImgLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
`;



export const SItemImgContainer = css`
    width: 160px;
    height: 120px;
`;

export const SItemContainer = css`
    padding: 25px 20px;
    width: 400px;

    & > b {
        font-size: 16px;
        margin-bottom: 20px;
    }

    & > p {
        font-size: 14px;
    }
`;

export const itemImg = css`
    width: 100%;
    height: 100%;
`;

export const SBuyBtn = css`
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: black;
    cursor: pointer;
    display: inline-block;
    font-weight: 600;
    height: 30px;
    line-height: 30px;
    outline: 0;
    overflow: hidden;
    padding: 0 20px;
    pointer-events: auto;
    position: relative;
    justify-content: center;
    align-items: center;
    text-align: center;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: top;
    white-space: nowrap;
    width: 100px;
    z-index: 9;
    border: 0;

    &:hover {
        background: lightpink;
        color: white;
    }
`;
export const SPointPurchaseBtn = css`
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #333;
    cursor: pointer;
    display: inline-block;
    font-family: Inter,-apple-system,system-ui,Roboto,"Helvetica Neue",Arial,sans-serif;
    font-size: 12px;
    font-weight: 600;
    height: 25px;
    line-height: 23px;
    outline: 0;
    overflow: hidden;
    margin-left: 20px;
    pointer-events: auto;
    position: relative;
    justify-content: center;
    align-items: center;
    text-align: center;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: top;
    white-space: nowrap;
    width: 88px;
    z-index: 9;
    border: 0;

    &:hover {
        background: lightpink;
        color: white;
        box-shadow: rgba(200, 50, 80, 0.5) 0 3px 8px;
    }
`;

export const ModalOverlay = css`
    position: fixed;
    margin: 0 auto;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;

export const ModalContent = css`
    background: rgba(253, 253, 255);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 8px;
    z-index: 10;
`;