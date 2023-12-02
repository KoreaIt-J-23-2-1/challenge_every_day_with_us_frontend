/* Style.js */

import { css } from '@emotion/react';
import attendanceCheckImg from "../../img/출석체크.png";

export const calendarContainer = css`

    .react-calendar .react-calendar__navigation {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background-color: #fafafa;
        z-index: 1;

        & button {
            height: 35px;
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
            background-color:#DDC0A5; 
            height: 30px;
        }
    }

    & button {
        height: 60px;
        background-color: rgba(255, 255, 255, 0.3);
        border: 1px solid white;
        background-color: #fafafa;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.3s, border-color 0.3s;
        box-sizing: border-box;

        &:hover {
            /* background-color:  #e7e7e7; */
            background-color:  #F2E4D1;
            color: #F7F4F0;
            border-color: #f7f4f4;
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
        width: 80px;
        height: 44px;
    }
`;


