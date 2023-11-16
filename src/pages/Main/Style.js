import { css } from '@emotion/react';
import background from '../../img/배경2.jpg';

export const Background = css`
    background-image: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`;


export const Layout = css`
    position: relative;
    width: 80%;
    height: 90vh;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
`;