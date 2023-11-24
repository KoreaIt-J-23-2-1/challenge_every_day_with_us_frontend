import { css } from '@emotion/react';

export const LetterSideBarLayout = css`
    overflow: hidden;
    position: relative;
    width: 400px;
    border-radius: 10px 0px 0px 10px;
    padding: 0px 10px;
    border: none;
    background: linen;
    border: 5px solid antiquewhite;
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

export const LadioBox = css`
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 5px solid antiquewhite;

    & label {
        font-size: 13px;
    }
`;

export const SLetterScroll = css`
    height: 800px;
    width: 800px;
    overflow-y: scroll;
`;

export const miniLetter = css`
    word-wrap: break-word;
    cursor: pointer;
    width: 380px;
    border-bottom: 3px solid antiquewhite;
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
        font-size: 30px;
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

export const modalCloseBtn = css`
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
`;

export const modalContainer = css`
    margin: auto;
`;

export const modalTitle = css`
    display: flex;
    justify-content: center;
    cursor: pointer;
`;

export const modalFrom = css`

`;

export const modalDate = css`

`;

export const modalContent = css`
    padding: 20px;
    height: 170px;
    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const modalBottom = css`
    display: flex;
    justify-content: center;
`;