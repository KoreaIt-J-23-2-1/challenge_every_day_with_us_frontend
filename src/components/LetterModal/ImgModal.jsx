import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './LetterModalStyle';
import ChallusQRImg from '../../img/챌어스큐알.jpeg';
import { IoMdCloseCircle } from 'react-icons/io';

function ImgModal({ onClose }) {
    const modalRef = useRef();
    const [ isImgModalOpen, setIsImgModalOpen ] = useState(true);

    const closeModal = () => {
        setIsImgModalOpen(false);
        onClose();
    };

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