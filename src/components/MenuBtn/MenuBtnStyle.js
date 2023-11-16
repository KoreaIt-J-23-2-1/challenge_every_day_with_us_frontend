// MenuBtnStyle.js
import { css } from '@emotion/react';

export const menuBtn = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 27px;
    cursor: pointer;
    transition: all 1s;

    & > span {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 36px;
        height: 3px;
        background-color: #000;
        border-radius: 4px;
        transition: all 0.7s;
    }

    & > span:nth-child(1) {
        top: 0;
    }

    & > span:nth-child(2) {
        top: 12px;
    }

    & > span:nth-child(3) {
        bottom: 0;
    }
`;

export const active = css`
    & > span {
        left: 2px;
        
    }
    & > span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 12px);
    }
    & > span:nth-child(2) {
        opacity: 0;
    }
    & > span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -13px);
    }
`;
