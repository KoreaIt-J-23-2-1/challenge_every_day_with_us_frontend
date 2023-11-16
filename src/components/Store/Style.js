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
    max-height: 800px;
    margin: 20px 30px;
    padding-right: 15px;
`;

export const SItemLayout = css`
    display: flex;
    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
`;

export const SItemImgLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #dbdbdb;
    padding: 10px;
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
    background-color: initial;
    background-image: linear-gradient(-180deg, #00D775, #00BD68);
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: Inter,-apple-system,system-ui,Roboto,"Helvetica Neue",Arial,sans-serif;
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
        background: #00bd68;
    }
`;
export const SPointPurchaseBtn = css`
    background-color: initial;
    background-image: linear-gradient(-180deg, #FF7E31, #E62C03);
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: Inter,-apple-system,system-ui,Roboto,"Helvetica Neue",Arial,sans-serif;
    font-size: 12px;
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
        box-shadow: rgba(253, 76, 0, 0.5) 0 3px 8px;
    }
`;

export const ModalOverlay = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;

export const ModalContent = css`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    z-index: 10;
`;