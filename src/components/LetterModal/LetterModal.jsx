import React from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */



const modalContainer = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:#ededed50;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const modalContent = css`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 500px;
    
`;

const LetterModal = ({ isOpen,selectedLetter, children }) => {
    if (!isOpen) return null;
    if (!isOpen || !selectedLetter) return null;

    return (
        <div css={modalContainer}>
            <div css={modalContent}>
                {/* <div onClick={onClose}>닫기</div> */}
                {children}
            </div>
        </div>
    );
    };

export default LetterModal;
