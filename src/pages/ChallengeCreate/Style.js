import { css } from '@emotion/react';

export const ChallengeTitle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 20px;

    & p {
        margin-right: 10px;
        font-size: 20px;
        font-weight: 600;
    }

    & input {
        width: 70%;
        height: 40px;
    }
`;

export const layout = css`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
`;

export const CategoryBox = css`
    position: absolute;
    left: 38px;
    top: 65px;
    & b {
        font-size: 20px;
        margin-left: 5px;
    }
`;

export const ApplicationBtn = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 40px;

    & button {
        width: 100%;
        height: 40px;
        font-size: 20px;
        cursor: pointer;
    }
`;

export const Checkbox = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 30px;

    & label {
        margin-right: 15px;
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
    margin-right: 30px;

    & label {
        margin-right: 10px;
    }

    & input {
        width: 150px;
        height: 25px;
    }
`;
export const Layout = css`

    & div {
        margin-top: 50px;
    }

    & h2 {
        margin-top: 50px;
    }

    &>textarea{
        resize: none;

    }
`;

export const CheckBox = css`
    display: flex;

    & input {
        margin-right: 5px;
    }
`;

export const CheckBoxLayout = css`
    display: flex;

    & div {
        margin-right: 20px;
    }
`;

export const ContentLayout = css`
    margin: 30px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    & h2 {
        margin-left: 20px;
    }

    & div, p, textarea {
        margin-left: 10px;
        margin-bottom: 20px;
    }
`;
