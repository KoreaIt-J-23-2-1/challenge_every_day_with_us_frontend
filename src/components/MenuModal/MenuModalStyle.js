// MenuModalStyle.js

import { css } from '@emotion/react';

export const Background = css`
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    width: 570px;
    height: 300px;
    border-radius: 400px 20px 400px 400px;
    /* background-color: aliceblue; */
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
    transition: all 0.7s ease-in;

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