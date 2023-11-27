// MenuModalStyle.js

import { css } from '@emotion/react';

export const Background = (isActive) => css`
    position: absolute;
    top: 10px;
    right: 3px;
    width: ${isActive ? '600px' : '0'};
    height: ${isActive ? '400px' : '0'};
    border-radius: 400px 20px 400px 400px;
    transition: width 0.7s ease-in, height 0.7s ease-in;
    overflow: hidden;
    background-color: #F7F4EC;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;


export const MenuBody = (isActive) => css`
    width: 600px;
    height: 400px;
    padding: 10px 40px;
    display: flex;
    flex-direction: column;
    /* transition: opacity 0.7s ease; */
    opacity: ${isActive ? 1 : 0};
`;


export const MenuHeader = css`
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px 10%;
`;

export const MyBox = css`
    padding-bottom: 30px;
    /* transition: all 0.7s ease-in; */

    & > button {
        cursor: pointer;
        margin: 0px 5px;
        border: none;
        background: none;
        border-bottom: 3px solid #F7F4EC;
        font-size: 15px;
    }
    
    & > button:hover {
        font-weight: 700;
        border-bottom: 3px solid #EDD0C2;
    }
`;

export const BtnBox = (isActive) => css`

    padding-bottom: 20px;
    opacity: ${isActive ? '1' : '0'};
    transition: opacity 0.7s ease-in;

    & > button {
        margin-top: 10px;
        cursor: pointer;
        margin: 0px 5px;
        border: none;
        background: none;
        border-bottom: 3px solid #F7F4EC;
        font-size: 30px;
    }

    & > button:hover {
        font-weight: 700;
        font-style: italic;
        border-bottom: 3px solid #EDD0C2;
    }
`;

// export const show = css`
//     width: 400px !important;
//     height: 400px !important;

//     & ~ ${MyBox}, & ~ ${BtnBox} {
//         opacity: 1 !important;
//     }
// `;