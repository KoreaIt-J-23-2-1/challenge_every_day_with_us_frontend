import { css } from '@emotion/react';
import Logo from '../../img/Start.png';

export const layout = css`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    height: 85vh;
    margin-left: 20px;

`;

export const LogoImg = css`
    cursor: pointer;
    background-image: url(${Logo});
    background-size: cover;
    top: 0px;
    left: 0px;
    width: 500px;
    height: 500px;
    transition: transform 0.4s ease-out; 

    &:hover{
        opacity: 0.5;    
        transform: scale(0.9);
    }
    &:active {
        opacity: 1;    
    }
`;
