import { css } from '@emotion/react';

export const LetterSideBarLayout = css`
    overflow: hidden;
    position: relative;
    width: 440px;
    height: 850px;
    border-radius: 30px 0px 0px 30px;
    padding: 0px 10px;
    border: none;
    background: #F7F0F0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

`;

export const Layout = css`

    & h2 {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 30px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    & h4 {
        display: flex;
        justify-content: flex-end;
    }
`;

export const LetterTitle = css`


`;

export const LadioBox = css`
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 5px solid #eaeaea;

    & label {
        font-size: 13px;
    }
`;

export const LetterScroll = css`
    margin-top: 15px;
    height: 650px;
    width: 800px;
    overflow-y: scroll;
`;

export const miniLetter = css`
    word-wrap: break-word;
    cursor: pointer;
    width: 420px;
    border-bottom: 3px solid #f2f2f2;
    padding: 5px;
`;

export const Title = css`
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
    text-align: end;
    margin-bottom: 5px;

    & b {
        font-weight: 700;
        font-size: 29px;
        margin-right: 15px;
        color: gray;
    }
`;

export const lettersHeader = css`
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    color: #555;
`;

export const letterContent = css`
    max-width: 350px;
    width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 10px 0px;
`;

export const modalCloseBtnContainer = css`
    display: flex;
    justify-content: flex-end;
`;

export const modalCloseBtn = css`
    cursor: pointer;
`;

export const modalContainer = css`
    margin: auto;
`;

export const noticeTitleBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const noticeIcon = css`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

export const modalTitle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 15px;
    font-size: 24px;
`;

export const fromAndDate = css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0px 0px 10px 10px;
    font-size: 12px;
`;

export const modalFrom = css`
    & b {
        font-size: 15px;
        margin-right: 5px;
    }
`;

export const modalDate = css`
    margin-top: 3px;
    & b {
        font-size: 15px;
        margin-right: 5px;
    }
`;

export const modalContent = css`
    width: 100%;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px 0px;
    transition: width 0.3s;
    border: none;
    padding: 20px;
    height: 170px;
    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 15px;
    line-height: 20px;

    & img {
        width: 150px;
        height: 100%;
    }
    
`;

export const modalBottom = css`
    display: flex;
    justify-content: center;
`;


export const Btn = css`
    width: 150px;
    height: 30px;
    border: none;
    background-color: transparent;
    border-radius: 15px; 
    cursor: pointer;
    
    &:hover{
        font-weight: 700;
        background: rgba(80, 80, 80, 0.2);
    }
    &:active{
        background: rgba(80, 80, 80, 0.3);
    }

`;