import { css } from '@emotion/react';

export const ChallengeArea = css`
    width: 100%;
    height: 670px;
`;


export const Header = css`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0px;
`;

export const Title = css`
    color: #5d5d5d;

    &>b{
        color: black;
        font-size: 25px;
        font-weight: 700;
    }

`;

export const SelectBox = css`
    margin-left: 10px;
    padding: 2px 7px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    background-color: white;

    &:focus{
        outline: none;
        border-color: #5d5d5d;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    }

`;
