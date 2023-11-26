import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    justify-content: space-between;
`;

export const LeftBox = css`
    display: flex;
    flex-direction: column;
`;

export const ListLayout = css`
    margin: 20px 10px 20px 25px;
    padding: 30px 0px 0px 65px;
    width: 350px;
    height: 500px;
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.4); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    & h2 {
        color: #333;
    }
`;

export const ListBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    

    & li {
        cursor: pointer;
        margin-bottom: 10px;
        font-size: 14px;
        color: #555;

        &:hover {
            color: darkgray;
        }
    }
`;

export const EndListLayout = css`
    margin: 0px 0px 20px 25px;
    padding: 30px 0px 0px 75px;
    width: 350px;
    height: 500px;
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.4); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    & h2 {
        color: #333;
    }
`;

export const RightBox = css`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 10px;
    border-left: 1px solid #dbdbdb;
`;

export const TitleBox = css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 50px;

    & h2 {
        margin: 0px 0px 10px 0px;
    }

    & b {
        font-size: 12px;
    }
`;

export const ProgressBox = css`
    margin: 0px 0px 0px 150px;
`;

export const FeedListBox = css`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-left: 22px;
    padding: 20px;
    width: 500px;
    height: 480px;
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.4); 
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


export const SubModal = css`
    height: auto;
    width: auto;
    border-top: 2px solid #dbdbdb;
    z-index: 2;
    
    & li {
        width: 100px;
        margin-bottom: 9px;
    }
`;

export const ModalContent = css`
    height: 500px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    ${SubModal} 
`;