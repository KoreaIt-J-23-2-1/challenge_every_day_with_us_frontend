import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import ReactSelect from 'react-select';
import { useQuery } from 'react-query';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */

const table = css`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #dbdbdb;

    & th, td {
        border: 1px solid #dbdbdb;
        height: 30px;
        text-align: center;
    }

    & td {
        cursor: pointer;
    }
`;

const searchContainer = css`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    width: 100%;
    
    & > * {
        margin-left: 5px;
    }
`;

const selectBox = css`
    width: 100px;
`;

const SChallengeTitle = css`
    max-width: 500px;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const SPageNumbers = css`
    display: flex;
    align-items: center;
    margin-top: 10px;
    width: 200px;

    & button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 3px;
        width: 20px;
        border: 1px solid #dbdbdb;
        cursor: pointer;
    }

`;


function ChallengeList(props) {

    const navigate = useNavigate();
    const { page } = useParams();

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
            params: searchParams
        }
        return await instance.get(`/api/challenges/${page}`, option);
    }, {
        refetchOnWindowFocus: false
    });

    const getChallengeCount = useQuery(["getChallengeCount", page], async () => {
        const option = {
            params: searchParams
        }
        return await instance.get("/api/challenges/count", option);
    }, {
        refetchOnWindowFocus: false
    });

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
        navigate("/challenges/1");
        getChallengeList.refetch();
    }

    const pagination = () => {

        if(getChallengeCount.isLoading) {
            return <></>
        }

        const totalChallengeCount = getChallengeCount.data.data;

        const lastPage = totalChallengeCount % 10 === 0
            ?   totalChallengeCount / 10
            :   Math.floor(totalChallengeCount / 10) + 1
    
        const startIndex = parseInt(page) % 5 === 0 ? parseInt(page) - 4 : parseInt(page) - (parseInt(page) % 5) + 1;
        const endIndex = startIndex + 4 <= lastPage ? startIndex + 4 : lastPage;
    
        const pageNumbers = [];
    
        for (let i = startIndex; i <= endIndex; i++) {
            pageNumbers.push(i);
        }

        
    
        return (
            <>
                <button disabled={parseInt(page) === 1} onClick={() => {
                    navigate(`/challenges/${parseInt(page) - 1}`);
                }}>&#60;</button>
    
                {pageNumbers.map(num => {
                    return <button key={num} onClick={() => {
                        navigate(`/challenges/${num}`);
                    }}>{num}</button>;
                })}
    
                <button disabled={parseInt(page) === lastPage} onClick={() => {
                    navigate(`/challenges/${parseInt(page) + 1}`);
                }}>&#62;</button>
            </>
        );
    };


    

    return (
        <div>
            <div css={searchContainer}>
                <div css={selectBox}>
                    <ReactSelect options={options} defaultValue={options[0]} onChange={handleSearchOptionSelect} />
                </div>
                <input type="text" onChange={handleSearchInputChange} />
                <button onClick={handleSearchButtonClick}>검색</button>
            </div>
            <table css={table}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>챌린지제목</th>
                        <th>카테고리이름</th>
                        <th>시작일</th>
                        <th>좋아요 수</th>
                    </tr>
                </thead>
                <tbody>
                    {!getChallengeList.isLoading && getChallengeList?.data?.data.map(challenge => {
                        return (<tr key={challenge.challengeId} 
                                onClick={() => {navigate(`/challenge/${challenge.challengeId}`)}}>
                                    <td>{challenge.challengeId}</td>
                                    <td css={SChallengeTitle}>{challenge.title}</td>
                                    <td>{challenge.categoryname}</td>
                                    <td>{challenge.startDate}</td>
                                    <td>{challenge.likeCount}</td>
                                </tr>);
                    })}
                </tbody>
            </table>

            <div css={SPageNumbers}>
                {pagination()}
            </div>
        </div>
    );
}

export default ChallengeList;