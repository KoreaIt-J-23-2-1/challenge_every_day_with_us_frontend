import React from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import * as S from './LetterModalStyle';


const LetterModal = ({ isOpen,selectedLetter, children }) => {
    if (!isOpen) return null;
    if (!isOpen || !selectedLetter) return null;

    return (
        <div css={S.modalContainer}>
            <div css={S.modalContent}>
                {children}
            </div>
        </div>
    );
    };

export default LetterModal;
