import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    
`;

export const HeaderLayout = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 100px;
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
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 730px;
    gap: 30px;
`;


export const BodyRightBox = css`
    display: flex;
    flex-direction: column;
    width: 400px;
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

export const SLikeButton = css`
    position: sticky;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    margin-left: 5px;
    width: 40px;
    height: 40px;
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
export const FeedContainer = css`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 700px;
    height: 95%;
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

export const FeedBox = css`
    margin: 5px 0px;
    border-radius: 15px; 
    background-color: white;
    padding: 15px;
`;

export const FeedHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;

    &>div>div{
        display: flex;
        align-items: center;
    }
`;
export const userInfo = css`
    display: flex;
    align-items: center;
    gap: 10px;
`;
export const ChInfo = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    &>div{
        gap: 10px;
    }
`;

export const InfoImg = css`
    width: 50px;
    height: 50px;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
`;

export const SFeedBody = css`
    display: flex;
    margin: 10px 0px;
    height: 200px;
    gap: 10px;

`;

export const FeedImg = css`
    width: 200px;
    height: 200px;
    border-radius: 10px;
`;

export const FeedContentBox = (imgExists) => css`
    margin: 0px auto;
    border-radius: 10px;
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;

    &>div{
        width: 100%;
        border: 1px solid #dbdbdb;
        border-radius: 10px;
        height: 180px;
    }
    &>a{
        display: flex;
        justify-content:end;
        /* height: 15px; */
        font-size: 13px;
        margin: auto 0px ;
    }

    ${!imgExists && `img { display: none; }`}
`;

export const FeedContent = css`
    display: flex;
    padding: 15px;
    word-wrap: break-word;
    white-space: pre-line; 
`;



export const SFeedBottomLayout = css`

`;

export const SFeedBottomHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CommentBox = css`
    
`;