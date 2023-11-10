import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useQuery } from 'react-query';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */
import Modal from 'react-modal';
import LetterModal from '../LetterModal/LetterModal';

const LetterSideBarLayout = css`
    overflow: hidden;
    position: relative;
`;

const miniLetter = css`
    word-wrap: break-word;
    cursor: pointer;
    width: 380px;
    border-bottom: 1px solid #dbdbdb;
    padding: 5px;
`;

const lettersHeader = css`
    display: flex;
    justify-content: flex-end;
`;

const letterContent = css`
    max-width: 350px;
    width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const modalCloseBtn = css`
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
`;

const modalTitle = css`
    cursor: pointer;
`;

function LetterSideBar(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState(null);

    const openModal = (letter) => {
        setSelectedLetter(letter);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedLetter(null);
        setIsModalOpen(false);
    };

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    };

    const getLetterList = useQuery(["getLetters"], async () => {
        return await instance.get(`/api/letters`, option);
    }, {
        retry: 0,
        refetchOnWindowFocus: false
    });

    const GoTargetLetterUrl = () => {
        // 여기에 챌린지 연결 해주세요  
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        // 
        
    }

    if (getLetterList.isLoading) {
        return <></>;
    }

    return (
        <div css={LetterSideBarLayout}>
            <div>
                <h2>알림</h2>
                <div>
                    {getLetterList?.data?.data.map(letter => (
                        <div css={miniLetter} onClick={() => openModal(letter)} key={letter.letterId}>
                            <h3>{letter.title}</h3>
                            <div css={lettersHeader}>{letter.sendDateTime}</div>
                            <div css={lettersHeader}>{letter.senderUserId}</div>
                            <div></div>
                            <div css={letterContent}>{letter.content}</div>
                        </div>
                    ))}
                </div>
            </div>

            <LetterModal isOpen={isModalOpen} onClose={closeModal} selectedLetter={selectedLetter}>
                <div css={modalCloseBtn} onClick={closeModal}>닫기</div>
                {!getLetterList.isLoading && selectedLetter && (
                    <div>
                        <h3 css={modalTitle} onClick={GoTargetLetterUrl}>{selectedLetter.title}</h3>
                        <div>{selectedLetter.sendDateTime}</div>
                        <div>{selectedLetter.senderUserId}</div>
                        <div>{selectedLetter.content}</div>
                    </div>
                )}
            </LetterModal>
        </div>
    );
}

export default LetterSideBar;
