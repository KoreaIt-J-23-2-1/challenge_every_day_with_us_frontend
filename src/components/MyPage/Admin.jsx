import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { instance } from '../../api/config/instance';
import { useQuery, useQueryClient } from 'react-query';
import * as S from './AdminStyle';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import AdminModal from '../AdminModal/AdminModal';
import ReactSelect from 'react-select';

function Admin() {
    const navigate = useNavigate();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState?.data?.data;
    const [ page, setPage ] = useState(1);
    const [ selectedChallenge, setSelectedChallenge ] = useState(null);
    const [ isModalOpen, setModalOpen ] = useState(false);
    const [ challengeList, setChallengeList ] = useState([]);
    const [ isChallengeListRefetch, setIsChallengeListRefetch ] = useState(false);
    const lastChallengeRef = useRef();
    const [orderBy, setOrderBy] = useState('latest');

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
            params: { ...searchParams, orderBy }
        }
        return await instance.get(`/api/challenges/${page}`, option);
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: isChallengeListRefetch,
        onSuccess: (response) => {
            setChallengeList([
                ...challengeList
            ].concat(response.data));
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
        setPage(1);
        setChallengeList([]);
    }, [orderBy])

    useEffect(() => {
        const observerService = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setIsChallengeListRefetch(true);
                }
            });
        }

        const observer = new IntersectionObserver(observerService, {threshold: 1});
        observer.observe(lastChallengeRef.current);
    }, []);

    if(getChallengeList.isLoading) {
        return <></>
    };

    const handleChallengeClick = (challenge) => {
        setSelectedChallenge(challenge);
        setModalOpen(true);
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
        const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
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

    const handleCheckboxChange = (event) => {
        setOrderBy(event.target.value);
        setPage(1);
    };

    return (
        <div css={S.Layout}>
            <div css={S.UserBox}>
                <div css={S.ImgBoxImg}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/challengewithus-1ffef.appspot.com/o/files%2Ffree-icon-crown-931979.png?alt=media&token=f801604e-ee4d-4465-bbcb-9eacb448adab" alt="" />
                </div>
                <div css={S.ImgBox}>
                    <img src={principal.profileUrl} alt="" />
                </div>
                <div css={S.ProfileBox}>
                    <div css={S.ProfileText}>
                        <p>
                            {principal.nickname}
                        </p>
                    </div>
                </div>
            </div>
                <div css={S.Alignment}>
                    <input type="radio" name="radioGroup" id="radio1" checked={orderBy === 'latest'} onChange={handleCheckboxChange} value="latest"/>
                    <label htmlFor="radio1">최신순</label>
                    <input type="radio" name="radioGroup" id="radio2" checked={orderBy === 'oldest'} onChange={handleCheckboxChange} value="oldest"/>
                    <label htmlFor="radio2">오래된순</label>
                    <input type="radio" name="radioGroup" id="radio3" checked={orderBy === 'popular'} onChange={handleCheckboxChange} value="popular"/>
                    <label htmlFor="radio3">인기순</label>
                    <input type="radio" name="radioGroup" id="radio4" checked={orderBy === 'participants'} onChange={handleCheckboxChange} value="participants"/>
                    <label htmlFor="radio4">참여자많은순</label>
                    <div css={S.searchContainer}>
                        <ReactSelect options={options} defaultValue={options[0]} onChange={handleSearchOptionSelect}/>
                        <input type="text" onChange={handleSearchInputChange} />
                        <button onClick={handleSearchButtonClick}>검색</button>
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
                        <li key={myChallenge.challengeId} onClick={() => handleChallengeClick(myChallenge.challengeId)}>
                            <div>{myChallenge.challengeName}</div>
                            <div>{myChallenge.categoryName}</div>
                            <div>{myChallenge.name}</div>
                            <div>{calculateDaysElapsed(myChallenge.startDate) + 1}일차</div>
                            <div>{myChallenge.likeCount}</div>
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
        </div>
    );
}

export default Admin;