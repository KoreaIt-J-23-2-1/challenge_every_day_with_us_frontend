import { css } from '@emotion/react';

export const SLayout = css`
    display: flex;
    flex-direction: column;
    margin: 20px 30px;
`;

export const SFeedContainer = css`
    flex-direction: column;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    width: 550px;
`;

export const SFeedLayout = css`
    display: flex;
    flex-direction: column;
`;

export const SFeedHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & button {
        margin: 0px 20px;
    }

    & img {
        margin: 20px;
        width: 40px;
        height: 40px;
        border: 1px solid #dbdbdb;
        border-radius: 50%;
    }
`;

export const SFeedBody = css`
    display: flex;
    justify-content: space-between;
    margin-left: 20px;

    & img {
        max-width: 150px;
        max-height: 150px;
        margin-right: 20px;
        border-radius: 10px;
    }

    & div {
        font-size: 15px;
    }

    & b {
        font-size: 40px;
    }

    & p {
        margin: 0px;
    }
`;

export const SText = css`
    margin: 20px;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    height: 80px;
    & div {
        margin: 10px;
    }
`;

export const SInfo = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px 20px;
`;

export const SFeedBottomLayout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-top: 1px solid #dbdbdb;
`;

export const SFeedBottomHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SFeedBottomBody = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;