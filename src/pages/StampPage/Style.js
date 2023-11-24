// Style.js

import { css } from '@emotion/react';

export const calendarLayout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    height: 100%;
`;

export const calendar = css`
    padding: 20px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

`;

export const calendarHeader = css`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

export const calendarContainer = css`
    width: 1000px;
    background: linear-gradient(135deg, #f0e7d4, #efd1c5, #dadde2, #d5e4df);
    

    .react-calendar .react-calendar__navigation {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 1;
        & button {
            height: 40px;
            position: relative;
            z-index: 2;
        }

        & span {
            font-weight: 600;
        }
    }

    .react-calendar__month-view__weekdays {
        z-index: 11;

        & abbr {
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            height: 50px;
        }
    }

    & button {

        height: 80px;
        background-color: rgba(255, 255, 255, 0.3); 
        border: 1px solid #fafafa;
        font-size: 15px;
        cursor: pointer;
        transition: background-color 0.3s, border-color 0.3s;
        box-sizing: border-box;

        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-color: #fafafa;
        }
    }

    & button:disabled {
        background-color: #e0e0e0;
        cursor: not-allowed;
    }

    & .react-calendar__tile--now {
        position: relative;
    }

    & .checked-circle {
        position: relative;
        background-color: rgba(255, 255, 255, 0.1);
    }

    & .checked-circle::before {
        content: '';
        position: absolute;
        display: block;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid orange;
        border-radius: 50%;
        width: 40px;
        height: 40px;
    }

    /* & .react-calendar__tile--active {
        background-color: rgba(255, 255, 255, 0.1);  
    } */
`;

export const checkInButtonContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    
`;

export const checkInButton = css`
    display: flex;
    & button {
        padding: 0.6em 2em;
        border: none;
        outline: none;
        color: #333;
        cursor: pointer;
        position: relative;
        z-index: 0;
        border-radius: 10px;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        font-weight: 600;
    }
    

    button:before {
    content: "";
    background: linear-gradient(135deg, #f0e7d4, #efd1c5, #dadde2, #d5e4df);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing-button-85 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
    }

    @keyframes glowing-button-85 {
    0% {
        background-position: 0 0;
    }
    50% {
        background-position: 400% 0;
    }
    100% {
        background-position: 0 0;
    }
    }

    button:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f0e7d4, #efd1c5, #dadde2, #d5e4df);
    left: 0;
    top: 0;
    border-radius: 10px;
    }
`;
