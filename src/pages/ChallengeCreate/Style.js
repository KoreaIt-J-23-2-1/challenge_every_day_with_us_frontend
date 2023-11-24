import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;

    & h2 {
        margin-top: 30px;
    }
`;

export const ChallengeTitle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    font-size: 12px;

    & div {
        margin-left: 30px;
    }

    & b {
        margin-left: 5px;
    }
`;

export const InputBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 35px 0px 0px;

    & input {
        width: 75%;
        height: 30px;
        margin-top: 10px;
        border-radius: 5px;
        border: 1px solid #dbdbdb;
    }

    & p {
        margin: 10px 0px 0px 30px;
        text-align: center;
        font-weight: 600;
        font-size: 20px;
    }
`;

export const ContentLayout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    & div, p, textarea {
        margin-bottom: 15px;
    }
`;

export const CheckBoxLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin: 0px;
`;

export const CheckBox1 = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;

    & input {
        margin-right: 5px;
    }

    & label {
        font-size: 13px;
    }
`;

export const CheckBox2 = css`
    display: flex;
    justify-content: center;
    align-items: center;

    & input {
        margin-right: 5px;
    }

    & label {
        font-size: 13px;
    }
`;

export const Introduction = css`
    
    & div {
        margin-bottom: 20px;
        font-size: 12px;
    }

    & textarea {
        resize: none;
        border-radius: 10px;
    }

    & p {
        font-size: 13px;
        font-weight: 600;
    }
`;

export const ApplicationBtn = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 40px;

    & button {
        border: 1px solid #dbdbdb;
        background: rgba(255, 255, 255, 0.5); 
        border-radius: 15px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 40px;
        font-size: 20px;
        cursor: pointer;

        &:active {
            background-color: #eee;
        }
    }
`;

export const DataBox = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
`;

export const DateInput = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 13px;

    & label {
        margin-right: 10px;
        font-size: 14px;
    }

    & input {
        width: 150px;
        height: 25px;
        border: none;
        background: rgba(255, 255, 255, 0.5); 
        border-radius: 15px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        vertical-align: middle;
        padding: 10px;
        font-size: 13px;
    }
`;

export const allApprovalCheckbox = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px 30px 0px 0px;
    font-size: 14px;
`;

