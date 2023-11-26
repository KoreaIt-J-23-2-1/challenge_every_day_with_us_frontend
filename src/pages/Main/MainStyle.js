import { css } from '@emotion/react';
import Logo1 from '../../img/메인로고1.png';
import Logo2 from '../../img/메인로고2.png';
import Logo3 from '../../img/메인로고3.png';


export const MainBase = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const MainBox = css`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 860px;
    
    &>div{
        width: 100%;
        display: flex;
    }
`;

export const part1 = css`
    height: 640px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const part2 = css`
    display:flex;
    align-items: center;
    height: 200px;
    width: 900px;

`;
export const part3 = css`
    height: 440px;
    display: flex;
`;

export const part4 = css`
    margin-top: 10px;
`;

export const part5 = css`
    width: 390px;
    height: 100%;
    margin-right:10px;

`;

export const CategoryImgBox = css`
    height: 200px;
    border-radius: 15%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s ease-out; 
    
    &:hover{
        opacity: 0.9;    
        transform: scale(0.9);
    }
    &:active {
        opacity: 1;    
    }
`;

export const CategoryImg = css`
    height: 100%; 
    width: 100%;
`;

export const box01 = css`
    width: 400px;
    height: 100%;
    margin-right:10px;
    display: flex;
    align-items: center;
    justify-content: center;    
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    &:hover{
        opacity: 0.9;    
        transform: scale(0.9);
    }
    &:active {
        opacity: 1;    
    }    
`;
export const box02 = css`

    width: 100%;
    height: 200px;
    height: 315px;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover{
        opacity: 0.9;    
        transform: scale(0.9);
    }
    &:active {
        opacity: 1;    
    }
`;
export const box03 = css`
    cursor: pointer;
    width: 300px;    
    height: 200px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    &:hover{
        opacity: 0.9;    
        transform: scale(0.9);
    }
    &:active {
        opacity: 1;    
    }    
`;
export const box04 = css`

    width: 900px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover{
        opacity: 0.9;    
        transform: scale(0.9);
    }
    &:active {
        opacity: 1;    
    }
`;

export const MiniTitle = css`
    width: 90%;
    height: 50px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 50px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 0px 20px;
    display: flex;
    align-items: center;

`;

export const MiniContent = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

`;

export const box05 = css`

    margin: 0px 10px;
    width: 600px;
    &:hover{
        opacity: 0.9;    
        transform: scale(0.9);
    }
    &:active {
        opacity: 1;    
    }
`;
export const box06 = css`

    width: 810px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover{
        opacity: 0.9;    
        transform: scale(0.9);
    }
    &:active {
        opacity: 1;    
    }
`;




export const LogoImg1 = css`
    background-image: url(${Logo3});
    background-size: cover;
    width: 100%;
    height: 100%;
`;


export const IconBox = css`
    position: relative;

    &>div{
        width: 100px;
        height: 100px;
        font-size: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
    }
`;

export const calendarContainer = css`
    width: 1000px;
    background: linear-gradient(135deg, #f0e7d4, #efd1c5, #dadde2, #d5e4df);

    .react-calendar .react-calendar__navigation {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 1;

        & button {
            height: 40px;
            position: relative;
            z-index: 2;
        }

        & span {
            font-weight: 600;
        }
    }

    .react-calendar__month-view__weekdays {
        z-index: 11;

        & abbr {
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            height: 50px;
        }
    }
`;
