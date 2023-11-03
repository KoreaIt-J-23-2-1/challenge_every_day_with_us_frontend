import React from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
/** @jsxImportSource @emotion/react */

const listTable = css`
    width: 100%;
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

    const navigete = useNavigate();

    const handleNoticeWriteBtn = () => {
        navigete("/notice/write")
    
    }
    return (
        <BaseLayout>
            <h1> 공지</h1>
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
                </tbody>
            </table>

            <div css={btnBox}>

            </div>


        
        </BaseLayout>
    );
}

export default NoticeList;