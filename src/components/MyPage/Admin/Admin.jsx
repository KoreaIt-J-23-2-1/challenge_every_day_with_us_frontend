import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { instance } from '../../../api/config/instance';
import { useQuery, useQueryClient } from 'react-query';
import * as S from './AdminStyle';
import AdminModal from '../../AdminModal/AdminModal';
import BaseLayout from '../../BaseLayout/BaseLayout';
import ReactSelect from 'react-select';
import { MdDeleteOutline } from "react-icons/md";
import { IoStopCircleOutline } from "react-icons/io5";
import Chart from '../../Chart/Chart';
import { showAlert, showConfirmation } from '../../../styles/common';

function Admin() {
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState?.data?.data;
    const [ page, setPage ] = useState(1);
    const [ selectedChallenge, setSelectedChallenge ] = useState(null);
    const [ isModalOpen, setModalOpen ] = useState(false);
    const [ challengeList, setChallengeList ] = useState([]);
    const [ isChallengeListRefetch, setIsChallengeListRefetch ] = useState(false);
    const lastChallengeRef = useRef();
    const [ chart, setChart ] = useState(<></>);
    const [ sort, setSort ] = useState('latest');
    const options = [
        {value: "전체", label: "전체"},
        {value: "챌린지제목", label: "챌린지제목"},
        {value: "카테고리이름", label: "카테고리이름"}
    ];

    const search = {
        optionName: options[0].label,
        searchValue: ""
    }

    const [ searchParams, setSearchParams ] = useState(search);

    const getChallengeList = useQuery(["getChallengeList"], async () => {
        const option = {
            params: { ...searchParams, sort }
        }

        return await instance.get(`/api/challenges/${page}`, option);
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: isChallengeListRefetch,
        onSuccess: (response) => {
            setChallengeList(challengeList.concat(response.data));
            setIsChallengeListRefetch(false);
            setPage(page + 1);
        }
    });

    useEffect(() => {
        if(page === 1) {
            setChallengeList([]);
            getChallengeList.refetch();
        }
    }, [page])

    useEffect(() => {
        setChart(<Chart />);
    }, [])

    useEffect(() => {
        setPage(1);
        setChallengeList([]);
    }, [sort])

    useEffect(() => {
        const observerService = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setIsChallengeListRefetch(true);
                }
            });
        }

        const observer = new IntersectionObserver(observerService, {threshold: 0.1});
        observer.observe(lastChallengeRef.current);
    }, []);

    const handleChallengeClick = (challenge) => {
        setSelectedChallenge(challenge);
        setModalOpen(true);
    };

    const handleChallengeStopClick = async (challenge) => {
        setSelectedChallenge(challenge);
    
        setSelectedChallenge(async (prevChallenge) => {
            const challengeId = prevChallenge;
            const stop = await showConfirmation("챌린지 중단", `${challengeId}번 챌린지를 정말 중단 시키겠습니까?`, "question");
    
            if (stop === true) {
                try {
                    const response = instance.put(`/api/challenge/stop/${challengeId}`);
                    if (response) {
                        showAlert("중단 되었습니다.", "success");
                        setPage(1);
                    } else {
                        showAlert("error", "error");
                    }
                } catch (error) {
                    console.error("Error stopping challenge:", error);
                    showAlert("error", "error");
                }
            }
        });
    };

    const handleChallengeDeleteClick = async (challenge) => {
        setSelectedChallenge(challenge);

        setSelectedChallenge(async prevChallenge => {
            const challengeId = prevChallenge
            const stop = await showConfirmation("챌린지 삭제", `${challengeId}번 챌린지를 정말 삭제 시키겠습니까?`, "question");
            
            if(stop){
                const response = instance.put(`/api/challenge/hidden/${challengeId}`)
                if(response){
                    showAlert("삭제 되었습니다.", "success");
                    setPage(1);
                }else {
                    showAlert("error", "error")
                }
            }
        });    
    };
    
    const handleCloseModal = () => {
        setSelectedChallenge(null);
        setModalOpen(false);
    };

    const handleSearchButtonClick = () => {
        setPage(1);
    }

    const calculateDaysElapsed = (startDate) => {
        const today = new Date();
        const start = new Date(startDate);
        const timeDifference = today.getTime() - start.getTime();
        const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
        return daysElapsed;
    };

    const handleSearchInputChange = (e) => {
        setSearchParams({
            ...searchParams,
            searchValue: e.target.value
        })
    }

    const handleSearchOptionSelect = (option) => {
        setSearchParams({
            ...searchParams,
            optionName: option.label
        })
    }

    const handleCheckboxChange = async (event) => {
        setSort(event.target.value);
        setPage(1);
    };

    return (
        <BaseLayout>
            <div css={S.Layout}>
                <div css={S.UserBox}>
                    <div css={S.ImgLayout}>
                        <div css={S.ImgBoxImg}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/challengewithus-1ffef.appspot.com/o/files%2Ffree-icon-crown-931979.png?alt=media&token=f801604e-ee4d-4465-bbcb-9eacb448adab" alt="" />
                        </div>
                        <div css={S.ProfileImgBox}>
                            <img src={principal.profileUrl} alt="" />
                        </div>
                    </div>
                    <div css={S.ProfileBox}>
                        <div css={S.ProfileText}>
                            <p>{principal.nickname}</p>
                        </div>
                    </div>
                </div>
                    <div css={S.Alignment}>
                        <div>
                            <input type="radio" name="radioGroup" id="radio1" onChange={handleCheckboxChange} value="latest" defaultChecked={true}/>
                            <label htmlFor="radio1">최신순</label>
                            <input type="radio" name="radioGroup" id="radio2" onChange={handleCheckboxChange} value="oldest"/>
                            <label htmlFor="radio2">오래된순</label>
                            <input type="radio" name="radioGroup" id="radio3" onChange={handleCheckboxChange} value="popular"/>
                            <label htmlFor="radio3">인기순</label>
                            <input type="radio" name="radioGroup" id="radio4" onChange={handleCheckboxChange} value="participants"/>
                            <label htmlFor="radio4">참여자많은순</label>
                            <input type="radio" name="radioGroup" id="radio5" onChange={handleCheckboxChange} value="hidden"/>
                            <label htmlFor="radio5">삭제된 챌린지</label>
                            <input type="radio" name="radioGroup" id="radio6" onChange={handleCheckboxChange} value="stop"/>
                            <label htmlFor="radio6">중단된 챌린지</label>
                        </div>
                        <div css={S.searchContainer}>
                            <div>
                                <ReactSelect css={S.SelectSt} options={options} defaultValue={options[0]} onChange={handleSearchOptionSelect}/>
                            </div>
                            <input css={S.InputBox} type="text" onChange={handleSearchInputChange} onKeyDown={(e) => {if(e.keyCode === 13) {handleSearchButtonClick();}}}/>
                            <button css={S.ButtonBox} onClick={handleSearchButtonClick}>검색</button>
                        </div>
                    </div>
                <ul css={S.SChallengeList}>
                    <div css={S.SChallengeListHeader}>
                        <li>
                            <div>ChallengeName</div>
                            <div>Category</div>
                            <div>Founder</div>
                            <div>Day</div>
                            <div>Like</div>
                        </li>
                    </div>
                    <div css={S.SChallengeListBody}>
                        {challengeList?.map((myChallenge) => (
                            <li key={myChallenge.challengeId}>
                                <div onClick={() => handleChallengeClick(myChallenge.challengeId)}>{myChallenge.challengeName}</div>
                                <div onClick={() => handleChallengeClick(myChallenge.challengeId)}>{myChallenge.categoryName}</div>
                                <div onClick={() => handleChallengeClick(myChallenge.challengeId)}>{myChallenge.name}</div>
                                <div onClick={() => handleChallengeClick(myChallenge.challengeId)}>{calculateDaysElapsed(myChallenge.startDate)}일차</div>
                                <div onClick={() => handleChallengeClick(myChallenge.challengeId)}>{myChallenge.likeCount}</div>
                                {(!myChallenge.isDeadline && !myChallenge.isHidden) && <button css={S.StopButton} onClick={() => handleChallengeStopClick(myChallenge.challengeId)}><IoStopCircleOutline /></button>}
                                {!myChallenge.isHidden && <button css={S.Deletebutton} onClick={() => handleChallengeDeleteClick(myChallenge.challengeId)}><MdDeleteOutline /></button>}
                            </li>
                        ))}
                        <li ref={lastChallengeRef}></li>
                    </div>
                </ul>
                {isModalOpen && (
                    <div css={S.ModalOverlay}>
                        <div css={S.ModalContent}>
                            <AdminModal onClose={handleCloseModal} challengeDetails={selectedChallenge} />
                        </div>
                    </div>
                )}
                <div css={S.Chart}>
                    <h3>Challenge Chart</h3>
                    {chart}
                </div>
            </div>
        </BaseLayout>
    );
}

export default Admin;

