import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';

function NoticeDetails(props) {
    const navigate = useNavigate();
    const [ notice, setNotice ] = useState({});
    const [ isAdmin, setIsAdmin ] = useState([]);
    const { noticeId } = useParams();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }
    
    const getNotice = useQuery(["getNotice"], async () => {
        try {
            return await instance.get(`/api/notice/${noticeId}`,option);
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

    console.log(isAdmin)

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
        <>
            <BaseLayout>
                <div >
                    <h1>{notice.noticeTitle}</h1>
                    <p><b>{notice.nickname}</b> - {notice.noticeDate}</p>
                    <div dangerouslySetInnerHTML={{ __html: notice.noticeContent }}></div>
                    {isAdmins &&
                        <div>
                            <button onClick={()=>{navigate(`/notice/${noticeId}/edit`)}}>수정</button>
                            <button onClick={deleteNoticeBtn} >삭제</button>
                        </div>
                    }
                </div>
            </BaseLayout>
        </>
    );
}

export default NoticeDetails;