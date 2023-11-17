import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import ReactSelect from 'react-select';
import { useQuery } from 'react-query';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */
import * as S from './ChallengeListStyle';
import BaseLayout from '../../components/BaseLayout/BaseLayout';



function ChallengeList(props) {
    const navigate = useNavigate();
    const [ page, setPage ] = useState(1);
    const lastChallengeRef = useRef();
    const [ isChallengeListRefetch, setIsChallengeListRefetch ] = useState(false);
    const [ challengeList, setChallengeList ] = useState([]);
    const [sort, setSort] = useState('latest');

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

    const getChallengeList = useQuery(["getChallengeList", page], async () => {
        const option = {
            params: { ...searchParams, sort }
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

        const observer = new IntersectionObserver(observerService, {threshold: 1});
        observer.observe(lastChallengeRef.current);
    }, []);

    useEffect(() => {
        if(page === 1) {
            setChallengeList([]);
            getChallengeList.refetch();
        }
    }, [page])

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
        setPage(1);
    }

    return (
        <BaseLayout>
            <h1>챌린지리스트</h1>
        
            <div css={S.searchContainer}>
                <div css={S.selectBox}>
                    <ReactSelect options={options} defaultValue={options[0]} onChange={handleSearchOptionSelect} />
                </div>
                <input type="text" onChange={handleSearchInputChange} />
                <button onClick={handleSearchButtonClick}>검색</button>
            </div>
            
            <table css={S.listTable}>
                <thead >
                    <tr>
                        <th>챌린지 제목</th>
                        <th>카테고리 이름</th>
                        <th>시작일</th>
                        <th>좋아요 수</th>
                    </tr>
                </thead>
                <tbody >
                    {challengeList.map(challenge => (
                        <tr key={challenge.challengeId} onClick={() => { navigate(`/challenge/${challenge.challengeId}`) }}>
                            <td css={S.Title}>{challenge.challengeName}</td>
                            <td>{challenge.categoryName}</td>
                            <td>{challenge.startDate}</td>
                            <td>{challenge.likeCount}</td>
                        </tr>
                    ))}
                    <tr ref={lastChallengeRef}></tr>
                </tbody>
            </table>            
        </BaseLayout>
    );
}

export default ChallengeList;