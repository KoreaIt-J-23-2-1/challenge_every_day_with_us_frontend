import { css } from '@emotion/react';

export const SLayout = css`
    
    margin: 50px auto;
    width: 45%;
    min-width: 480px;
    *::-webkit-scrollbar {
        width: 5px;
    }

    *::-webkit-scrollbar-thumb {
        width: 5px;
        background-color: black;
    }
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

export const SScroll = css`
    overflow-y: auto;
    max-height: 600px;
    padding-right: 15px;
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
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`;

export const SFeedBottomBody = css`
    display: flex;
    & > div:nth-of-type(2) > input {
        outline: none;
        border: 1px solid #dbdbdb;
        border-radius: 10px;
        height: 30px;
        
    }
`;

export const SFeedBottomProfileImgContainer = css`
    width: 50px;
    height: 50px;
`;

export const SFeedBottomProfileImg = css`
    width: 100%;
    height: 100%;
`;

export const SFeedBottomFooter = css`
    
`;

export const SCommentContainer = css`
    border: 3px solid #dbdbdb;
    border-radius: 10px;
    padding: 10px;
    width: 600px;

    & > * {
        display: flex;
    }

    & > b:nth-of-type(1) {
        font-size: 14px;
        font-weight: 900;
    }
    
    & > div:nth-of-type(1) {
        font-size: 24px;
        font-weight: 700;
    }
    
    & > div:nth-of-type(2) {
        font-size: 14px;
    }

`;