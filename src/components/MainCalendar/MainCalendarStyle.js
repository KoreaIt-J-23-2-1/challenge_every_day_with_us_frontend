/* Style.js */

import { css } from '@emotion/react';
import attendanceCheckImg from "../../img/출석체크.png";

export const calendarContainer = css`
    background: linear-gradient(135deg, #f0e7d4, #efd1c5, #dadde2, #d5e4df);

    .react-calendar .react-calendar__navigation {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
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
            height: 30px;
        }
    }

    & button {
        height: 60px;
        background-color: rgba(255, 255, 255, 0.3);
        border: 1px solid #fafafa;
        font-size: 14px;
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
        width: 80px;
        height: 44px;
    }
`;


