import React, { useState } from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import Header from '../../components/Header/Header';
/** @jsxImportSource @emotion/react */
import * as S from './NoticeListStyle';
import ReactSelect from 'react-select';

function NoticeList(props) {
    const navigate = useNavigate();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;
    const { page } = useParams();
    const option = {
        headers: {
        Authorization: localStorage.getItem("accessToken")
        }
    }
    const options = [
        {value: "전체", label: "전체"},
        {value: "챌린지제목", label: "챌린지제목"},
        {value: "카테고리이름", label: "카테고리이름"}
    ];

    const search = {
        optionName: options[0].label,
        searchValue: ""
    }

    const getNoticeList = useQuery(["getBoardList", page], async () => {
        return await instance.get(`/api/notices/${page}`, option)
    }, {
        retry: 0,
        refetchOnWindowFocus: false
    });

    const getNoticesCount = useQuery(["getNoticesCount"], async () => {
        return await instance.get(`/api/notices/count`, option)
    }, {
        retry: 0,
        refetchOnWindowFocus: false
    });

    const getAdminList = useQuery(["getAdminList"], async () => {
        return await instance.get(`/api/admin`, option)
    }, {
        retry: 0,
        refetchOnWindowFocus: false
    });

    const [ searchParams, setSearchParams ] = useState(search);

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
        getNoticeList.refetch();
    }

    const pagination = () => {
        if(getNoticesCount.isLoading) {
            return <></>;
        }

        const totalNoticeCount = getNoticesCount.data.data;
        const lastPage = totalNoticeCount % 10 === 0
            ? totalNoticeCount / 10
            : Math.floor(totalNoticeCount / 10) + 1;
        const startIndex = parseInt(page) % 5 === 0 ? parseInt(page) - 4 : parseInt(page) - (parseInt(page) % 5) + 1;
        const endIndex = startIndex + 4 <= lastPage ? startIndex + 4 : lastPage;
        const pageNumbers = [];
        for(let i = startIndex; i <= endIndex; i++) {
            pageNumbers.push(i);
        }

        return (
            <>
                <button disabled={parseInt(page) === 1} onClick={() => {
                    navigate(`/notice/page/${parseInt(page) - 1}`);
                }}>&#60;</button>
                {pageNumbers.map(page => {
                    return <button key={page} onClick={() => {
                        return navigate(`/notice/page/${page}`);
                    }}>{page}</button>
                })}
                <button disabled={parseInt(page) === lastPage} onClick={() => {
                    navigate(`/notice/page/${parseInt(page) + 1}`);
                }}>&#62;</button> 
            </>
        )
    };

    const isAdmins = getAdminList?.data?.data?.some(admin => admin.userId === principal.userId);

    return (
        <BaseLayout>
            <h1>공지</h1>
            <div css={S.btnBox}>
            {isAdmins && (
                <div css={S.btnBox}>
                    <button>공지 작성</button>
                </div>
            )}
                <div css={S.btnBox}>
                    <ReactSelect options={options} defaultValue={options[0]} onChange={handleSearchOptionSelect} />
                    <input onChange={handleSearchInputChange} type="text" placeholder='검색어를 입력하세요' />
                    <button onClick={handleSearchButtonClick}>검색</button>
                </div>
            </div>
            <table css={S.listTable}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                
                <tbody>
                    {!getNoticeList.isLoading && getNoticeList?.data?.data.map(notice => {
                        return (
                            <tr key={notice.noticeId} onClick={() => { navigate(`/notice/${notice.noticeId}`) }}>
                                <td>{notice.noticeId}</td>
                                <td css={S.noticeTitle}>{notice.noticeTitle}</td>
                                <td>{notice.nickname}</td>
                                <td>{notice.noticeDate}</td>
                            </tr>
                        );
                    })}
                    
                </tbody>
            </table>
            <ul css={S.SPageNumbers}>
                {pagination()}
            </ul>
        </BaseLayout>
    );
}

export default NoticeList;