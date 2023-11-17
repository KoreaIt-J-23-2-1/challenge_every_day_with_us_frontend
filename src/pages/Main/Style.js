import { css } from '@emotion/react';

export const HederBox = css`
    position: relative;
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
`;

export const ProfileBox = css`
    position: relative;
    height: 70%;
    /* background-color: white; */
    border-bottom: 4px solid rgba(0, 0, 0, 0.1);
`;

export const BtnBox = css`
    display: flex;
    align-items: center;
    justify-content:space-between;
    margin: 30px;
`;

export const MenuBox = css`
    position: relative;
    height: 30%;
    background-color: skyblue;
    border-top: 4px solid rgba(20, 50, 69);
    
`;

export const ProfileImg = css`
    margin: 80px;
    width: 300px;
    height: 300px;
    background-color: #dbdbdb;
    position: absolute;
    border-radius: 10%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ContentBox = css`
    height: 50%;
    width: 100%;
    /* background-color: beige; */
`;