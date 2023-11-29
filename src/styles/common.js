import { css } from "@emotion/react"
import backgroundImg from '../img/배경.jpg'



export const Common = css`
    *{
        box-sizing: border-box;
        font-family: 'NanumSquareNeo-Variable';
        color: #090909;
        
    }
    background-color: white;

    @font-face {
        font-family: "font1";
        font-weight: normal;
        src: url("/fonts/font1.ttf");
        font-size: 27px;
    }
    @font-face {
        font-family: "NanumSquareNeo-Variable";
        font-weight: normal;
        src: url("/fonts/NanumSquareNeo-Variable.ttf");
    }
    
    
    html{
        background-color: #fafafa;
        /* background-image: url(${backgroundImg}); */
        background-size: cover; 
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        color: #000;
    }

`;

// #E8A789 #E9D3C9 #F7F0F0 #f2f2f2 #fafafa

