import { css } from '@emotion/react';

export const SCommentContainer = css`
    width: 100%;
    margin: 5px 0px;
    padding: 2px;
    border-radius: 10px;
    border-bottom:1px solid #dbdbdb90;
`;
export const part1 = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
export const part2 = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 13px;
    margin-bottom: 2px;
`;

export const CommentName = css`
    width: 15%;
    font-size: 14px;
    margin: 0px 2px;
`;
export const Comment = css`
    font-size: 15px;
    margin: 0px 2px;
    width: 100%;
`;
export const InputComment = css`
    font-size: 14px;
    margin: 0px 2px;
    padding: 0px 5px;
    width: 100%;
    height: 30px;
    font-size: 13px;

    &:focus{
        outline: none;
    }
`;
export const CommentTime = css`
    font-size: 11px;
    margin: 0px 2px;

`;


export const FixBtn = css`
    font-size: 11px;
    border: none;
    padding: 5px 10px;
    margin: 0px 2px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 

    &:hover{
        background: rgba(80, 80, 80, 0.2);
    }
    &:active{
        background: rgba(80, 80, 80, 0.4);
    }
`;

export const font = css`
    font-size: 13px;
    
`;