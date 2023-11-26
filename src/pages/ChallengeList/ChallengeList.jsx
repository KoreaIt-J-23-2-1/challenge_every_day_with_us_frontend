import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import ReactSelect from 'react-select';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */
import * as S from './ChallengeListStyle';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { PiPlusSquareLight } from "react-icons/pi";

function ChallengeList(props) {
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState?.data?.data; 
    const navigate = useNavigate();
    const [ page, setPage ] = useState(1);
    const lastChallengeRef = useRef();
    const [ isChallengeListRefetch, setIsChallengeListRefetch ] = useState(false);
    const [ challengeList, setChallengeList ] = useState([]);
    const [ sort, setSort ] = useState('latest');

    const options = [
        {value: "전체", label: "전체"},
        {value: "챌린지제목", label: "챌린지제목"},
        {value: "카테고리이름", label: "카테고리이름"}
    ];

    const [ searchParams, setSearchParams ] = useState({
        optionName: options[0].label,
        searchValue: ""
    });

    const getChallengeList = useQuery(["getChallengeList", page], async () => {
        const option = {
            params: {...searchParams, sort}
        }
        return await instance.get(`/api/challenges/${page}`, option);
    }, {
        refetchOnWindowFocus: false,
        enabled: isChallengeListRefetch,
        staleTime: 0,
        onSuccess: (response) => {
            setChallengeList(challengeList.concat(response.data));
            setIsChallengeListRefetch(false);
            if(response.data.length !== 0) {
                setPage(page + 1);
            }
        }
    });

    const getChallengeCount = useQuery(["getChallengeCount", page], async () => {
        const option = {
            params: searchParams
        }
        return await instance.get("/api/challenges/count", option);
    }, {
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        const observerService = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setIsChallengeListRefetch(true);
                }
            });
        }

        const observer = new IntersectionObserver(observerService, {threshold: 0.5});
        observer.observe(lastChallengeRef.current);
    }, []);

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

    const handleSearchButtonClick = () => {
        setChallengeList([]);
        if(page === 1) {
            getChallengeList.refetch();
        }
        setPage(1);
    }

    const handleChallengeClick = (challengeId) => {
        if (!principal) {
            if(window.confirm("로그인 후 열람 가능합니다. 로그인 하시겠습니까?")){
                navigate("/auth/signin");
            }
        } else {
            navigate(`/challenge/${challengeId}`);
        }
    };

    return (
        <BaseLayout>
            <div css={S.Layout}>
                <div css={S.searchContainer}>
                    <b> 여러분들의 도전을 응원합니다 !</b>
                    <div css={S.selectContainer}>
                        <div css={S.selectBox}>
                            <ReactSelect css={S.SelectSt} options={options} defaultValue={options[0]} onChange={handleSearchOptionSelect} />
                        </div>
                        <input css={S.InputBox} type="text" onChange={handleSearchInputChange} onKeyDown={(e) => {if(e.keyCode === 13) {handleSearchButtonClick();}}}/>
                        <button css={S.ButtonBox} onClick={handleSearchButtonClick}>검색</button>
                    </div>
                </div>
                    <ul css={S.SChallengeList}>
                    <div css={S.SChallengeListHeader}>
                        <li>
                            <div>번호</div>
                            <div>챌린지제목</div>
                            <div>카테고리이름</div>
                            <div>시작일</div>
                            <div>좋아요 수</div>
                        </li>
                    </div>
                    <div css={S.SChallengeListBody}>
                        {/* <li ref={topChallengeRef}></li> */}
                        {challengeList?.map((challenge) => {
                            return (<li key={challenge.challengeId} onClick={() => handleChallengeClick(challenge.challengeId)}>
                                        <div>{challenge.challengeId}</div>
                                        <div>{challenge.challengeName}</div>
                                        <div>{challenge.categoryName}</div>
                                        <div>{challenge.startDate}</div>
                                        <div>{challenge.likeCount}</div>
                                    </li>
                                    );
                        })}
                        <li ref={lastChallengeRef}></li>
                    </div>
                </ul>
            </div>
            <PiPlusSquareLight css={S.Plus}/>
        </BaseLayout>
    );
}

export default ChallengeList;