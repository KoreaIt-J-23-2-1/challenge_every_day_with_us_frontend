import { css } from '@emotion/react';

export const SLayout = css`
    margin: 100px 300px;
`;

export const SHeaderLayout = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #dbdbdb;

    & div {
        margin-bottom: 50px;
    }

    & button {
        margin-bottom: 50px;
    }
`;

export const SAlignment = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 30px;
`;

export const SFeedContainer = css`
    flex-direction: column;
    margin-top: 30px;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    width: 100%;
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
        width: 50px;
        height: 50px;
        border: 1px solid #dbdbdb;
        border-radius: 50%;
    }
`;

export const SFeedBody = css`
    display: flex;
    justify-content: space-between;
    margin-left: 20px;

    & img {
        max-width: 500px;
        max-height: 300px;
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
    /* width: 300px; */
    /* height: 70px; */
    border: 1px solid #dbdbdb;
    border-radius: 10px;

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