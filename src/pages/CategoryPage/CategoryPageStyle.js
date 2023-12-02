import { css } from '@emotion/react';


export const CategoryBox = css`
    height:100%;
    width: 1150px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* align-items: center; */
    
`;


export const SProductContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: calc(33% - 15px);
    height: calc(33% - 20px);
    min-width: 250px;
    min-height: 170px;
    border-radius: 15px;
    border: none;
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
    /* background-color: aliceblue; */
    position: absolute;
    display: flex;
    align-items: end;
    justify-content: end;
    width: 100%;
    height: 180px;
    white-space: nowrap;
    padding-right: 20px;
    padding-bottom: 10px;
    left: 0;
    top: 0;
    bottom: 0;
    font-size: 35px;
    font-weight: 700;
    letter-spacing :1px;
    z-index: 3;
    color: #444;
    text-shadow: -2px 0px #fff, 0px 2px #fff, 2px 0px #fff, 0px -2px #fff;
    
    &:hover{
        color: #fff;
        text-shadow: -2px 0px #444, 0px 2px #444, 2px 0px #444, 0px -2px #444;
    }
`;

export const imgBox = (imgUrl) => css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;  
    height: 100%; 
    background-image: url(${imgUrl});
    background-size: 100%;
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