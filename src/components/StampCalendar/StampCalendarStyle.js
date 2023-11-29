/* Style.js */

import { css } from '@emotion/react';
import attendanceCheckImg from "../../img/출석체크.png";

export const calendarLayout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
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

    .react-calendar .react-calendar__navigation {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background-color: #fafafa;
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
            background-color: #FFBDA3;
            height: 40px;
        }
    }

    & button {
        height: 80px;
        background-color: rgba(255, 255, 255, 0.3);
        border: 1px solid white;
        background-color: #fafafa;
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

    & .checked-attendance {
        position: relative;
        display: inline-block;
    }

    & .checked-attendance::before {
        content: '';
        position: absolute;
        display: block;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-image: url(${attendanceCheckImg});
        background-size: cover;
        width: 100px;
        height: 55px;
    }
`;

export const checkInButtonContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const checkInButton = css`
    align-items: center;
    appearance: none;
    background-color: #FFBDA3;
    border: 0;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
    box-sizing: border-box;
    color: #36395A;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono",monospace;
    height: 40px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s,transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow,transform;
    font-size: 18px;

    & button {
        border: none;
        background-color: transparent;
        color: white;
        font-size: 14px;
        font-weight: 500;
    }

.checkInButton:focus {

    box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.checkInButton:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    transform: translateY(-2px);
}

.checkInButton:active {
    box-shadow: #D6D6E7 0 3px 7px inset;
    transform: translateY(2px);
}
`;
