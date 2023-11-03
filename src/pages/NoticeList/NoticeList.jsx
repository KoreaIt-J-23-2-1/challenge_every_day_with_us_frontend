import React from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
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


function NoticeList(props) {
    return (
        <BaseLayout>
            <div>
                <h1> 공지</h1>

                <div>
                    <input type="text" placeholder='검색어를 입력하세요' />
                    <button>검색</button>
                </div>

                <div>
                    <button>
                        공지 작성
                    </button>
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

        
        </BaseLayout>
    );
}

export default NoticeList;