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
    max-height: 600px;
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


//  하단
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
    align-items: center;
    width: 100%;
`;

export const WriteCommentBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &>img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }


`;

export const CommentInputBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px auto;
    width: 600px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #dbdbdb;

`;


// 댓글 
export const SFeedBottomFooter = css`
    margin: 5px;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

`;

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