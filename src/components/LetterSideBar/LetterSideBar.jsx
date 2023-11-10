import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */
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
    const [ isModalOpen, setIsModalOpen] = useState(false);
    const [ selectedLetter, setSelectedLetter ] = useState(null);
    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState("getPrincipal");
    const [ buttonDisabled, setButtonDisabled ] = useState(false);

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
            console.log(response);
            return response.data || [];
        }catch (error) {
            console.error(error);
            return [];
        }
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

    console.log(getLetterList);

    return (
        <div css={LetterSideBarLayout}>
            <div>
                <h2>알림</h2>
                <div>
                    {getLetterList?.data.map(letter => (
                        <div css={miniLetter} onClick={() => openModal(letter)} key={letter.letterId}>
                            <h3>{letter.title}</h3>
                            <div css={lettersHeader}>{letter.sendDateTime}</div>
                            <div css={lettersHeader}>발신자: {letter.senderNickname}</div>
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
                        <div><b>Sender: </b>{selectedLetter.senderNickname}</div>
                        <div><b>Content: </b>{selectedLetter.content}</div>
                        <div><b>Date: </b>{selectedLetter.sendDateTime}</div>
                        {selectedLetter.title === "챌린지 승인 요청" && (
                            <div>
                                <button onClick={handleAcceptChallenge} disabled={buttonDisabled}>수락</button>
                                <button onClick={handleRejectChallenge} disabled={buttonDisabled}>거절</button>
                            </div>
                        )}
                    </div>
                )}
            </LetterModal>
        </div>
    );
}

export default LetterSideBar;
