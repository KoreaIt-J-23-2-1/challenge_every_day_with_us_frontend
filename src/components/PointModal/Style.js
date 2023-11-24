import { css } from '@emotion/react';

export const SPointLayout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & h1 {
        font-size: 20px;
    }
`;

export const SStoreContainer = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 10px;
    border: 1px solid white;
    border-radius: 10px;
    padding: 20px 20px;
`;


export const SPointBtn = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 120px;
    height: 120px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    appearance: none;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-width: 0;
    box-shadow: rgba(255, 182, 193, 0.4) 0 2px 4px,rgba(255, 182, 193, 0.3) 0 7px 13px -3px,#FFF8DC 0 -3px 0 inset;
    box-sizing: border-box;
    color: #FFB6C1;
    cursor: pointer;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s,transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow,transform;
    font-size: 15px;

    &:focus {
    box-shadow: #FFB6C1 0 0 0 1.5px inset, rgba(255, 248, 220, 0.4) 0 2px 4px, rgba(255, 248, 220, 0.4) 0 7px 13px -3px, #f0e7d4 0 -3px 0 inset;
    }

    &:hover {
    box-shadow: rgba(255, 248, 220, 0.4) 0 4px 8px, rgba(255, 248, 220, 0.3) 0 7px 13px -3px, #f0e7d4 0 -3px 0 inset;
    transform: translateY(-2px);
    }

    &:active {
    box-shadow: #FFB6C1 0 3px 7px inset;
    transform: translateY(2px);
    }

`;

export const SPointBtnContent = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;text-align: center;

    & h2 {
        font-size: 16px;
        margin-bottom: 10px;
    }

    & p {
            line-height: 18px;
            font-size: 12px;
            font-weight: 500;
            margin: 0;
        }
`;



