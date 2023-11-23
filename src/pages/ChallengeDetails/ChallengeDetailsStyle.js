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

export const ChallTitle = css`
    cursor: pointer;
    font-weight: 700;
    font-size: 40px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    
    &>a{
        opacity: 0;
        width: 40px;
        height: 40px;
    }
    &:hover{
        &>a{
            opacity: 1;
        }
    }
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

export const FeedLikeBtn = css`
    position: sticky;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;

`;


export const BodyLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 730px;
    gap: 30px;
`;

// 왼쪽 피드 
export const FeedContainer = css`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 750px;
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



export const CommentHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    &>b{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const CommentBox = css`
    
`;


// 오른쪽 
export const BodyRightBox = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 320px;
    &>p{
        font-size: 13px;
        margin-top:10px;
        margin-bottom: 0px;
    }
    &>b{
        font-size: 14px;
        margin-top: 15px;
        margin-bottom: 5px;
    }
    &>div{
        margin-top: 5px;
        margin-bottom: 10px;
    }
`;

export const ParticipationButton = css`
    margin: 10px 0px;
    width: 100%;
    height: 40px;
    border: none;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &:active {
        background-color: #eee;
    }
`;

export const ChallInfoBox = css`
    height: 170px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
`;

export const Pointfont = css`
    font-style: italic;
    font-size: 15px;
    background-color: #ededed80;
`;

export const ListBox = css`
    display: flex;
    flex-direction: column;
    overflow: auto;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    height: 250px;


    & scrollable-container {
        height: 100%;
    }
`;

export const ListContainer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 4px 0px;

    &>a{
        font-weight: 400;
    }
    
`;


export const DeleteChallengerButton = css`
    width: 50px;
    height: 22px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;

    &:hover{
        background-color: #eee;
        font-weight: 600;
    }

    &:active {
        background-color: #e1e1e1;
    }
`;



export const ProgressBar = css`
    height: 90px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;