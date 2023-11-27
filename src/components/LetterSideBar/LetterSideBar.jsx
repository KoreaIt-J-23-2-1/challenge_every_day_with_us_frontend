import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */
import LetterModal from '../LetterModal/LetterModal';
import * as S from './LetterSideBarStyle';
import { IoMdCloseCircle } from 'react-icons/io';
import noticeIcon from '../../img/공지알람.png'
import ImgModal from '../LetterModal/ImgModal';

function LetterSideBar(props) {
    const [ isModalOpen, setIsModalOpen] = useState(false);
    const [ isImgModalOpen, setIsImgModalOpen ] = useState(false);
    const [ selectedImgUrl, setSelectedImgUrl ] = useState('');
    const [ letterViewType, setLetterViewType ] = useState("unread");
    const [ selectedLetter, setSelectedLetter ] = useState(null);
    const [ letterList, setLetterList ] = useState([]);
    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState("getPrincipal");
    const lettersCount = queryClient.getQueryState("getLettersCount");
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    };

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

    const getLetterList = useQuery(["getLetters", letterViewType], async () => {
        try {
            const response = await instance.get(`/api/letters`, option);
            queryClient.refetchQueries(["getLettersCount"]);
            queryClient.refetchQueries(["getUnreadLettersCount"]);
            return response.data;
        }catch (error) {
            return [];
        }
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!principal?.data?.data,
        onSuccess: (response) => {
            setLetterList(response);
        }
    });

    const GoTargetLetterUrl = () => {
        window.location.replace(selectedLetter.targetUrl);
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
                    receiverUserId: selectedLetter.senderUserId,
                    senderUserId: principal.data.data.userId,
                    letterTitle: "챌린지 승인 완료",
                    title: "챌린지 승인 완료",
                    content: `${selectedLetter.challengeName} 챌린지의 승인이 완료되었습니다.`,
                    targetUrl: principal.data.data.profileUrl,
                    targetId: selectedLetter.challengeId
                }, option);
                selectedLetter.acceptState = 1;
                closeModal();

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
                    receiverUserId: selectedLetter.senderUserId,
                    senderUserId: principal.data.data.userId,
                    letterTitle: "챌린지 승인 거부",
                    title: "챌린지 승인 거부",
                    content: `${selectedLetter.challengeName} 챌린지의 승인이 거절되었습니다..`,
                    targetUrl: principal.data.data.profileUrl,
                    targetId: selectedLetter.challengeId
                }, option);
                selectedLetter.acceptState = 2;
                closeModal();

            }
        }catch(error) {
            console.error(error)
        }
    }

    const handleImgModalOpen = (imgUrl) => {
        setSelectedImgUrl(imgUrl);
        setIsImgModalOpen(true);
    }

    return (
        <div css={S.LetterSideBarLayout}>
            <div css={S.Layout}>
                <h2>알림</h2>
                <h4>전체 알림 수 : {lettersCount.data}</h4>
                <div css={S.LadioBox}>
                    <input type="radio" id="unread-letter-radio-button" name="letterViewType" checked={letterViewType === "unread"} onChange={() => {setLetterViewType("unread");}}/>
                    <label htmlFor="unread-letter-radio-button" >읽지 않은 메시지</label>
                    <input type="radio" id="read-letter-radio-button" name="letterViewType" checked={letterViewType === "read"} onChange={() => {setLetterViewType("read");}}/>
                    <label htmlFor="read-letter-radio-button" >읽은 메시지</label>
                </div>
                <div css={S.SLetterScroll}>
                    {letterViewType === "unread" ?
                        getLetterList?.data?.map((letter) => (
                            letter.isRead === 0 ? 
                            <div css={S.miniLetter} onClick={() => openModal(letter)} key={letter.letterId}>
                                <div css={S.Title}><b>{letter.letterTitle} </b> {letter.title}</div>
                                <div css={S.lettersHeader}>{letter.sendDateTime}</div>
                                <div css={S.lettersHeader}>발신자: {letter.senderNickname}</div>
                                <div css={S.letterContent} dangerouslySetInnerHTML={{ __html: letter.content }}></div>
                            </div>
                            :
                            <div key={letter.letterId}></div>
                            ))
                            :
                            getLetterList?.data?.map((letter) => (
                                letter.isRead === 1 ? 
                                <div css={S.miniLetter} onClick={() => openModal(letter)} key={letter.letterId}>
                                <h3>{letter.title}</h3>
                                <div css={S.lettersHeader}>{letter.sendDateTime}</div>
                                <div css={S.lettersHeader}>발신자: {letter.senderNickname}</div>
                                <div css={S.letterContent} dangerouslySetInnerHTML={{ __html: letter.content }}></div>
                            </div>
                            :
                            <div key={letter.letterId}></div>
                        ))
                    }
                </div>
            </div>

            <LetterModal isOpen={isModalOpen} onClose={closeModal} selectedLetter={selectedLetter}>
                <div css={S.modalCloseBtnContainer}><IoMdCloseCircle  css={S.modalCloseBtn} onClick={closeModal}/></div>
                {!letterList.isLoading && selectedLetter && (
                    <div css={S.modalContainer}>
                        <div css={S.noticeTitleBox}>
                            <h3 css={S.modalTitle} onClick={GoTargetLetterUrl}><img src={noticeIcon} css={S.noticeIcon} />{selectedLetter.title}</h3>
                        </div>
                        <div css={S.fromAndDate}>
                            <div>
                                <div css={S.modalFrom}><b>From </b>{selectedLetter.senderNickname}</div>
                                <div css={S.modalDate}><b>Date </b>{selectedLetter.sendDateTime}</div>
                            </div>
                        </div>
                        <div css={S.modalContent}><div dangerouslySetInnerHTML={{ __html: selectedLetter.content }}></div>
                        {selectedLetter.letterTitle === "상점구매" && <img src={selectedLetter.targetUrl} alt="" />}
                        </div>
                        <div css={S.modalBottom}>
                            {selectedLetter.letterTitle === "챌린지 승인 요청" && (
                                selectedLetter.acceptState === 0 ?
                                    <div>
                                            <button css={S.Btn}  onClick={handleAcceptChallenge}>수락</button>
                                            <button css={S.Btn}  onClick={handleRejectChallenge}>거절</button>
                                    </div>
                                    :
                                    <div>
                                        <b>Accept-State: </b>{selectedLetter.acceptState === 1 ? "수락 완료" : "거절 완료"}
                                    </div>
                                )}
                            {selectedLetter.letterTitle === "공지" && (
                                <div>
                                    <button css={S.Btn} onClick={() => {window.location.replace(selectedLetter.targetUrl);}}>바로가기</button>
                                </div>
                            )}
                            {selectedLetter.letterTitle === "상점구매"  && (
                                <div>
                                    <button css={S.Btn} onClick={() => { handleImgModalOpen(selectedLetter.targetUrl); }}>바로가기</button>
                                </div>
                            )}
                            {isImgModalOpen && (
                                <ImgModal imgUrl={selectedImgUrl} onClose={() => setIsImgModalOpen(false)} />
                            )}
                        </div>
                    </div>
                )}
            </LetterModal>
        </div>
    );
    }

export default LetterSideBar;
