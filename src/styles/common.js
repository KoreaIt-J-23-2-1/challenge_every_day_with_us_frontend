import { css } from "@emotion/react"
import img1 from '../img/배경1.png'
import img2 from '../img/배경2.jpg'
import img3 from '../img/배경3.jpg'



export const Common = css`
    *{
        box-sizing: border-box;
        font-family: 'NanumSquareNeo-Variable';
        
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
        background-color: white;
        background-image: url(${img2});
        background-size: cover; 
        background-repeat: no-repeat;
        height: 100vh;
        box-sizing: border-box;
    }

`;