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
        /* background-repeat: no-repeat; */
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        color: #000;
    }

`;