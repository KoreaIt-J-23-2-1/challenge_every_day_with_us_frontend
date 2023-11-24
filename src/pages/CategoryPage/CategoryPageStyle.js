import { css } from '@emotion/react';


export const CategoryBox = css`
    height:100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    
`;


export const SProductContainer =  css`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    /* margin: 10px; */
    width: calc(30% - 10px);
    min-width: 280px;
    height: 230px;
    background-color: transparent;
    border-radius: 15%;
    border: none;
    font-size: 20px;
    font-weight: 600;
    overflow: hidden;
    cursor: pointer;   
    transition: transform 0.5s ease-out; 

    &:hover{
        opacity: 0.7;
        transform: scale(1.07);
    }
    &:active {
        transform: scale(0.8);
    }
`;

export const imgName = css`
    position: absolute;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    left: 0;
    font-size: 30px;
    font-weight: 700;
    color: #fff;
    z-index: 3;
    text-shadow: -1px 0px #444, 0px 1px #444, 1px 0px #444, 0px -1px #444;

    &:hover{
        color: #000;
        text-shadow: -1px 0px #fff, 0px 1px #fff, 1px 0px #fff, 0px -1px #fff;
    }
`;

export const imgBox = (imgUrl) => css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;  
    height: 100%; 
    background-image: url(${imgUrl});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center; 

    & :active {
        transform: scale(1.1);
    }
`;

export const Header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100%;
    margin: 20px 0px;
    border-bottom: 2px solid #dbdbdb;
    
    & b {
        width: 100%;
    }
`;