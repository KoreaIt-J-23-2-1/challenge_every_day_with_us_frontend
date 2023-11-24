import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import * as S from './NoticeDetailsStyle';
import TitleComponent from '../../components/TitleComponent/TitleComponent';
/** @jsxImportSource @emotion/react */

function NoticeDetails(props) {
    const navigate = useNavigate();
    const [ notice, setNotice ] = useState({});
    const [ isAdmin, setIsAdmin ] = useState([]);
    const { noticeId } = useParams();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState?.data?.data;
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }
    
    const getNotice = useQuery(["getNotice"], async () => {
        try {
            return await instance.get(`/api/notice/${noticeId}`);
        }catch(error) {
        }
    }, {
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setNotice(response.data);
        }
    })

    const getAdminList = useQuery(["getAdminList"], async () => {
        try {
            return await instance.get(`/api/admin`, option)
        }catch(error) {
        }
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setIsAdmin(response.data);
        }
    });

    const deleteNoticeBtn = async () => {
        /* eslint-disable no-restricted-globals */ 
        const deleteNotice = confirm("삭제하시겠습니까?");

        try {
            if(deleteNotice) {
                await instance.delete(`/api/notice/${noticeId}`, option);
                alert("게시글 삭제 완료.");
                window.location.replace("/notice/page/1");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const isAdmins = getAdminList?.data?.data?.some(admin => admin.userId === principal.userId);

    return (

        <BaseLayout>
            <TitleComponent title="공지를 확인해주세요 !"/>
            
            <div css={S.Box}>
                <div css={S.NoticeHeader}>
                    <div css={S.NoticeTitle}>
                        <a>공지</a> {notice.noticeTitle}
                    </div>
                </div>
                <div css={S.NoticeInfo}>
                    <b>{notice.nickname}</b>
                    <div>작성 시간 : {notice.noticeDate}</div>
                </div>
                <div css={S.NoticeContent} >
                    <b>
                        모두와 함께 도전하는 일상, <a css={S.pointFont}>[Challenge every day with us]</a> 입니다.   공지를 꼭 읽어주세요 ! 
                    </b>

                    <div css={S.ContentBox}>
                        <div>{notice.noticeContent} </div>
                    </div>

                </div>
            </div>
            {isAdmins &&
                <div css={S.btnBox}>
                    <button onClick={()=>{navigate(`/notice/${noticeId}/edit`)}}>수정</button>
                    <button onClick={deleteNoticeBtn} >삭제</button>
                </div>
            }  
        </BaseLayout>
    );
}

export default NoticeDetails;