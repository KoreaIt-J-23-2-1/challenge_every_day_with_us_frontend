import React from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import ChallusQRImg from '../../img/챌어스큐알.jpeg';


const modalContainer = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
`;

const modalContent = css`
    padding: 20px;
    width: 400px;
    max-width: 500px;
    background: rgba(255, 255, 255, 0.9); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: none;
`;

const Img = css`
    background-image: url(${ChallusQRImg});
    background-size: cover;
    width: 100%;
    height: 100%;
`;


function ImgModal(props) {
    return (
        <div css={modalContainer}>
            <div css={modalContent}>
                <div css={Img}></div>
            </div>
        </div>
    );
}

export default ImgModal;