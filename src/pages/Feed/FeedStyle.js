import { css } from '@emotion/react';
import { SubModal } from '../../components/FeedEditModal/Style';

export const SLayout = css`
    margin: 20px auto;
    width: 100%;
    min-width: 480px;
    *::-webkit-scrollbar {
        width: 4px;
    }
    *::-webkit-scrollbar-thumb {
        background-color: #dbdbdb
    }
`;

export const SHeaderLayout = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #dbdbdb;
    height: 50px;

`;

export const SAlignment = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 30px;
    font-size: 15px;
`;

export const SScroll = css`
    overflow-y: auto;
    max-height: 670px;
    padding-right: 15px;
    background: rgba(255, 255, 255, 0.7); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display:flex;
    flex-direction: column;
    align-items: center;
`;

export const SFeedContainer = css`
    flex-direction: column;
    width: 90%;
    margin: 10px 0px;
    border-radius: 15px; 
    background-color: white;
    padding: 15px;
`;


// 피드 상단
export const FeedHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;

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
    margin: 10px 0px;
    height: 200px;
    gap: 10px;

`;

export const FeedImg = css`
    width: 200px;
    height: 180px;
    border-radius: 10px;
    margin-top: 20px;
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


//  하단
export const SFeedBottomLayout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

// 댓글
export const SFeedBottomHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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
    margin: 0px auto;
    padding-left: 10px;
    width: 600px;
    height: 25px;
    border: none;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    &:focus{
        outline: none;
    }

`;


export const CommentBox = css`
    margin: 10px 0px;
    padding: 10px;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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

export const BtnBox = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 180px;
`;

export const Btn = css`
    border: none;
    padding: 5px 10px;
    margin: 0px 2px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &:hover{
        background: rgba(80, 80, 80, 0.2);
    }
    &:active{
        background: rgba(80, 80, 80, 0.4);
    }
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