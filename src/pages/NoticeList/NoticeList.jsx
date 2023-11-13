import React from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
/** @jsxImportSource @emotion/react */

const listTable = css`
    width: 938px;
    border-collapse: collapse;

    & th, td {
        height: 30px;
        text-align: center;
    }

    & td {
        cursor: pointer;
    }

`;

const noticeTitle = css`
    max-width: 500px;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const btnBox = css`
    display: flex;
    justify-content: end;
    width: 938px;
    
    & > button{
        cursor: pointer;
        margin: 5px;
        width: 150px;
        height: 30px;
        background-color: #efefef;
        border: none;
    }

    & > button:hover{
        background-color: #dbdbdb;
    }
    
    & > input {
        margin:5px;
        width: 300px;
        height: 25px;
    }
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

function NoticeList(props) {
    const option = {
        headers: {
        Authorization: localStorage.getItem("accessToken")
        }
    }

    const navigate = useNavigate();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;
    const { page } = useParams();

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

    const handleNoticeWriteBtn = () => {
        if (principal.isAdmin == 1) {
            navigate("/notice/write");
        } else {
            alert("공지는 관리자만 작성 가능")
        }
    };

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

    return (
        <BaseLayout>
            {!getNoticesCount.isLoading && getNoticesCount.data.data}
            <h1>공지</h1>
            <div css={btnBox}>
                <button onClick={handleNoticeWriteBtn}>공지 작성</button>
                <div css={btnBox}>
                    <input type="text" placeholder='검색어를 입력하세요' />
                    <button>검색</button>
                </div>
            </div>
            <table css={listTable}>
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
                                <td>{notice.noticeTitle}</td>
                                <td>{notice.nickname}</td>
                                <td>{notice.noticeDate}</td>
                            </tr>
                        );
                    })}
                    
                </tbody>
            </table>

            <ul css={SPageNumbers}>
                {pagination()}
            </ul>
        </BaseLayout>
    );
}

export default NoticeList;