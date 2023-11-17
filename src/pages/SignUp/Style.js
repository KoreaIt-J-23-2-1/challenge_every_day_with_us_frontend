import { css } from '@emotion/react';

export const inputBox = css`
    margin: 5px;
    &> label{
        display: flex;
        align-items: center;
        width: 100px;
        font-size: 12px;
    }
    & > input {
        margin-top: 4px;
        width: 200px;
        height: 25px;
    }
`;

export const btn = css`
    margin: 10px;
`;
