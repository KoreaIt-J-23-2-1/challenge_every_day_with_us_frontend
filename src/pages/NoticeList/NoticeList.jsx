import React from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
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
    const [ searchParams ] = useSearchParams();

    console.log(principal);

    const getNoticeList = useQuery(["getBoardList"], async () => {
        return await instance.get(`/api/notices/${searchParams.get("page")}`,option)
    }, {
        retry: 0,
        onSuccess: (response) => {

            console.log("공지목록");
            console.log(response);
            console.log("공지목록");
        }
    });



    const handleNoticeWriteBtn = () => {
        if (principal.isAdmin == 1) {
            navigate("/notice/write");
        } else {
            alert("공지는 관리자만 작성 가능")
        }
    };

    return (
        <BaseLayout>
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
                    <tr>
                        <td>notice.noticeId</td>
                        <td css={noticeTitle}>notice.noticeTitle</td>
                        <td>notice.nickname</td>
                        <td>notice.noticeDate</td>

                    </tr>

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

            <div css={btnBox}>

            </div>


        
        </BaseLayout>
    );
}

export default NoticeList;