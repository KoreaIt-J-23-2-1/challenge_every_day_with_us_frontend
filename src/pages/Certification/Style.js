import { css } from '@emotion/react';

export const ChallengeArea = css`
    position: relative;
    display: flex;
    justify-content: center;
    height: 800px;
    margin: 20px;
    border: 5px solid #dbdbdb;
    font-weight: 600;

    & label {
        position: absolute;
        margin: 10px;
        right: 0px;
    }

    & select {
        margin-left: 10px;
        width: 200px;
    }
`;