import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
`;

export const HeaderLayout = css`
    display: flex;
    /* justify-content: space-between; */
    align-items: flex-end;
    height: 120px;
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 4px solid #999;

`;

export const Box = css`
    display: flex;
    align-items: center;
`;

export const DeleteButton = css`
    width: 50px;
    height: 30px;
    border: 1px solid #eee;
    background-color: transparent;
    border-radius: 10px;
    cursor: pointer;
    
    &:active {
        background-color: #eee;
    }
`;

export const Writer = css`
    font-size: 14px;

    & b {
        margin-left: 5px;
        font-size: 20px;
    }
`;

export const BodyLayout = css`
    display: flex;
    margin: 20px 0px;
    /* justify-content: center; */
    width: 100%;
    gap: 30px;
`;


export const BodyRightBox = css`
    display: flex;
    flex-direction: column;
    min-width: 400px;
`;

export const ParticipationButton = css`
    width: 100%;
    height: 40px;
    background-color: transparent;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    cursor: pointer;
    &:active {
        background-color: #eee;
    }
`;

export const textBox = css`
    height: 100px;
    border: 2px solid #dbdbdb;
`;

export const SLikeButton = (isLike) => css`
    position: sticky;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: ${isLike ? "#7bbdff" : "#fff"};
    cursor: pointer;
`;


export const ListBox = css`
    display: flex;
    flex-direction: column;
    overflow: auto;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    
    & scrollable-container {
        height: 100%;
    }
`;

export const ListContainer = css`
    display: flex;
    align-items: center;
`;

export const DeleteChallengerButton = css`
    width: 50px;
    height: 20px;
    background-color: transparent;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    cursor: pointer;

    &:active {
        background-color: #eee;
    }
`;

// 왼쪽 피드 
export const BodyFeedLayout = css`
    display: flex;
    flex-direction: column;
    width: 700px;
    height: 700px;
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.7); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    ::-webkit-scrollbar {
    width: 2px;
    }
    ::-webkit-scrollbar-thumb {
    background-color: #dbdbdb
    }
`;

export const SLayout = css`
    display: flex;
    flex-direction: column;
    /* justify-content: center;   */
    width: 560px;
    margin: 20px auto;
`;


export const SFeedLayout = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0px auto;
`;

export const SFeedHeader = css`
    display: flex;
    /* justify-content: space-between; */
    align-items: center;

`;

export const FeedImg = css`
    width: 40px;
    height: 40px;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
`;

export const SFeedBody = css`
    display: flex;
    /* justify-content: space-between; */
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
    /* align-items: center; */
    margin: 10px 20px;
`;

export const SFeedBottomLayout = css`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    border-top: 1px solid #dbdbdb;
`;

export const SFeedBottomHeader = css`
    display: flex;
    align-items: center;
`;

export const SFeedBottomBody = css`
    display: flex;
    align-items: center;
`;