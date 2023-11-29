import { css } from '@emotion/react';
import { SubModal } from '../../components/FeedEditModal/Style';

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
    font-size: 30px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    
    &>a{
        display: flex;
        align-items: center;
        justify-content: center;
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

export const SFeedBottomBody = css`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 10px 0px;
`;

export const WriteCommentBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

`;
export const CommentInputBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    width: 80%;
    height: 25px;
    border: none;
    background: rgba(250, 250, 250, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fafafa;

    cursor: pointer;
    &:focus{
        outline: none;
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
    background: #fafafa;
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
    align-items: end;
    /* align-items: center; */
    /* justify-content: end ; */

    &>div{
        gap: 10px;
    }
`;

export const InfoImg = css`
    width: 50px;
    height: 50px;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    margin-right: 10px;
`;

export const SFeedBody = css`
    display: flex;
    height: 200px;
    gap: 10px;
`;

export const FeedImg = css`
    margin-top: 20px;
    width: 200px;
    height: 180px;
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

    & > a > b {
        display: flex;
        justify-content: end;
        font-size: 12px;
        padding-right: 10px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;


export const SFeedBottomHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const FeedLikeBtn = css`
    display: flex;
    justify-content: end;
    width: 180px;
    font-size: 13px;
    cursor: pointer;

    &>div{
        margin-left: 5px;
    }

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

export const Btn = css`
    border: none;
    padding: 5px 10px;
    margin: 4px 1px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
    cursor: pointer;

    &:hover{
        background: rgba(80, 80, 80, 0.2);
    }
    &:active{
        background: rgba(80, 80, 80, 0.4);
    }
`;

export const StopWatch = css`
    display: flex;
    justify-content: flex-start;
`;

export const CommentBox = css`
    margin: 10px 0px;
    padding: 10px;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #fafafa;
`;


// 오른쪽 
export const BodyRightBox = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 320px;
    &>p{
        font-size: 13px;
        margin-top:20px;
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
    background-color: #fafafa; 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
    margin-right: 3px;
`;

export const ListBox = css`
    display: flex;
    flex-direction: column;
    overflow: auto;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    height: 297px;

    & scrollable-container {
        height: 100%;
    }

    ::-webkit-scrollbar {
    width: 2px;
    }
    ::-webkit-scrollbar-thumb {
    background-color: #dbdbdb
    }
`;

export const ListContainer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 4px 0px;

    &>a{
        font-weight: 400;
        margin-right: 10px;
    }

    &>div{
        display: flex;
        align-items: center;
    }
    
`;

export const ImgBox = css`
    display: flex;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-right: 10px;

    & img {
        border: 2px solid white;
        border-radius: 50%;
        width: 100%;
        height: 100%;
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

export const ProgressBarBox = css`
    position: relative;
    height: 40px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ProgressBar = css`
    position: absolute;
    top: 13px;
    width: 100%;
    padding: 0px 5px;
`;


export const ModalOverlay = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

export const ModalContent = css`
    height: 500px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;

    ${SubModal} 
`;