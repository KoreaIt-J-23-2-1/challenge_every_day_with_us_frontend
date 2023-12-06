import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './LetterModalStyle';
import ChallusQRImg from '../../img/챌어스큐알.jpeg';
import { IoMdCloseCircle } from 'react-icons/io';

function ImgModal({ onClose }) {
    const modalRef = useRef();

    const closeModal = () => {
        onClose();
    };

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [handleOutsideClick]);

    return (
        <div ref={modalRef}>
            <div css={S.modalContainer}>
                <div css={S.modalContent}>
                <div css={S.modalCloseBtnContainer}>
                    <IoMdCloseCircle  css={S.modalCloseBtn} onClick={closeModal}/>
                </div>
                    <img css={S.Img} src={ChallusQRImg} alt="" />

                </div>
            </div>
        </div>
    );
}

export default ImgModal;