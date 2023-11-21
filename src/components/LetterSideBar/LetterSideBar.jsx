import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */
import LetterModal from '../LetterModal/LetterModal';
import { useNavigate } from 'react-router-dom';
import * as S from './Style';

function LetterSideBar(props) {
    const [ isModalOpen, setIsModalOpen] = useState(false);
    const [ selectedLetter, setSelectedLetter ] = useState(null);
    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState("getPrincipal");
    const [ buttonDisabled, setButtonDisabled ] = useState(false);
    const navigate = useNavigate();

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    };

    useEffect(() => {
        const storedButtonDisabled = localStorage.getItem('buttonDisabled');
        if (storedButtonDisabled) {
            setButtonDisabled(JSON.parse(storedButtonDisabled));
        }
    }, []);

    const openModal = async (letter) => {
        setSelectedLetter(letter);
        setIsModalOpen(true);
        if(!letter.isRead) {
            try {
                await instance.put(`/api/letter/${letter.letterId}/is-read`, {}, option);
                await queryClient.refetchQueries(["getLetters"]);
                
            }catch(error) {
                console.error(error);
            }
        }
    };

    const closeModal = () => {
        setSelectedLetter(null);
        setIsModalOpen(false);
    };

    const getLetterList = useQuery(["getLetters"], async () => {
        try {
            const response = await instance.get(`/api/letters`, option);
            return response.data;
        }catch (error) {
            return [];
        }
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!principal?.data?.data
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

    const handleAcceptChallenge = async () => {
        try {
            const response = await instance.put(`/api/challenge/approval`, {
                data: {
                    userId: selectedLetter.senderUserId,
                    challengeId: selectedLetter.challengeId
                }
            }, option);
            if(response) {
                alert("승인 완료");
                instance.post("/api/challenge/atmosphere/letter", {
                    data: {
                        receiverUserId: selectedLetter.senderUserId,
                        senderUserId: principal.data.data.userId,
                        title: "챌린지 승인 완료",
                        content: `${selectedLetter.challengeName} 챌린지의 승인이 완료되었습니다.`,
                        targetUrl: principal.data.data.profileUrl
                    }
                }, option);
                setButtonDisabled(true);
                localStorage.setItem('buttonDisabled', JSON.stringify(true));
            }
        }catch(error) {
            console.error(error)
        }
    }

    const handleRejectChallenge = () => {
        try {
            const response = instance.put(`/api/challenge/refusal`, {
                data: {
                    userId: selectedLetter.senderUserId,
                    challengeId: selectedLetter.challengeId
                }
            }, option);
            if(response) {
                alert("거절 완료");
                instance.post("/api/challenge/atmosphere/letter", {
                    data: {
                        receiverUserId: selectedLetter.senderUserId,
                        senderUserId: principal.data.data.userId,
                        title: "챌린지 승인 거부",
                        content: `${selectedLetter.challengeName} 챌린지의 승인이 거절되었습니다..`,
                        targetUrl: principal.data.data.profileUrl
                    }
                }, option);
                setButtonDisabled(true);
                localStorage.setItem('buttonDisabled', JSON.stringify(true));
            }
        }catch(error) {
            console.error(error)
        }
    }

    return (
        <div css={S.LetterSideBarLayout}>
            <div>
                <h2>알림</h2>
                <div css={S.SLetterScroll}>
                    {getLetterList?.data?.map(letter => (
                        <div css={S.miniLetter} onClick={() => openModal(letter)} key={letter.letterId}>
                            <h3>{letter.title}</h3>
                            <div css={S.lettersHeader}>{letter.sendDateTime}</div>
                            <div css={S.lettersHeader}>발신자: {letter.senderNickname}</div>
                            <div css={S.letterContent}>{letter.content}</div>
                        </div>
                    ))}
                </div>
            </div>

            <LetterModal  isOpen={isModalOpen} onClose={closeModal} selectedLetter={selectedLetter}>
                <div css={S.modalCloseBtn} onClick={closeModal}>닫기</div>
                {!getLetterList.isLoading && selectedLetter && (
                    <div>
                        <h3 css={S.modalTitle} onClick={GoTargetLetterUrl}>{selectedLetter.title}</h3>
                        <div><b>Sender: </b>{selectedLetter.senderNickname}</div>
                        <div><b>Date: </b>{selectedLetter.sendDateTime}</div>
                        <div><b>Content: </b>{selectedLetter.content}</div>
                        {selectedLetter.title === "챌린지 승인 요청" && (
                            selectedLetter.acceptState === 0 ?
                                <div>
                                    <button onClick={handleAcceptChallenge} disabled={buttonDisabled}>수락</button>
                                    <button onClick={handleRejectChallenge} disabled={buttonDisabled}>거절</button>
                                </div>
                                :
                                <div><b>Accept-State: </b>{selectedLetter.acceptState === 1 ? "수락 완료" : "거절 완료"}</div>
                        )}
                        {selectedLetter.title === "새로운 공지가 있습니다." && (
                            <div>
                                <button onClick={() => {window.location.replace(selectedLetter.targetUrl);}}>바로가기</button>
                            </div>
                        )}
                    </div>
                )}
            </LetterModal>
        </div>
    );
}

export default LetterSideBar;
