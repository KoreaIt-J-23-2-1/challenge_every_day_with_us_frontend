import { css } from '@emotion/react';

export const SCommentContainer = css`
    border-radius: 10px;
    padding: 10px;
    width: 100%;

    & > div:nth-of-type(1){
        font-size: 14px;
        font-weight: 300;

    }
    & > div:nth-of-type(2) {
        font-size: 12px;
    } 

`;