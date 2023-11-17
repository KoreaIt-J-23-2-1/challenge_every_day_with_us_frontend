import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
`;

export const HeaderLayout = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 150px;
    margin: 0px 30px;

    & b {
        font-size: 30px;
    }

    & p {
        margin: 0px;
        margin-top: 20px;
    }
`;

export const Box = css`
    display: flex;
    justify-content: center;
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
    justify-content: space-between;
    margin: 0px 30px;
    
    & img {
        
    }
`;

export const BodyFeedLayout = css`
    display: flex;
    flex-grow: 1;
    height: 700px;
    border: 2px solid #dbdbdb;
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;

    ::-webkit-scrollbar {
    width: 2px;
    }

    ::-webkit-scrollbar-thumb {
    background-color: #dbdbdb
    }
`;

export const BodyRightBox = css`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;

export const ParticipationButton = css`
    margin-top: 20px;
    width: 500px;
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
    width: 500px;
    height: 100px;
    border: 2px solid #dbdbdb;
    margin: 20px 0px;
`;

export const SLikeButton = (isLike) => css`
    position: sticky;
    margin: 0px 40px;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: ${isLike ? "#7bbdff" : "#fff"};
    cursor: pointer;
`;

export const line = css`
    margin: 10px 20px;
    border-bottom: 2px solid #dbdbdb;
`;

export const ListBox = css`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    height: 445px;
    overflow: auto;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    
    & scrollable-container {
        height: 100%;
    }

    & b {
        margin: 5px;
    }

    & p {
        margin: 5px;
    }
`;

export const ListContainer = css`
    display: flex;
    align-items: center;

    & p {
        margin: 5px;
    }

    & button {
        
    }
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

export const SLayout = css`
    display: flex;
    flex-direction: column;
    margin: 30px 70px;
    width: 100%;
`;

export const SFeedContainer = css`
    flex-direction: column;
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
        max-width: 450px;
        height: 400px;
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