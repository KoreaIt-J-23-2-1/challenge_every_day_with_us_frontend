import { css } from '@emotion/react';

export const calendarContainer = css`
    & button {
        height: 50px;
        background-color: white;
        border: 1px solid #dbdbdb;
    }

    & .react-calendar__tile--now {
        position: relative;
    }

    & .checked-circle {
        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 2px solid orange;
            border-radius: 50%;
            width: 40px;
            height: 40px;
        }
    }
`;