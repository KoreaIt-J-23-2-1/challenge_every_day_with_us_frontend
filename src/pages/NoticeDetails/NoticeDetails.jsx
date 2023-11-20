import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useQuery } from 'react-query';
import { instance } from '../../api/config/instance';

function NoticeDetails(props) {
    const navigate = useNavigate();
    const [notice, setNotice] = useState({});
    const { noticeId } = useParams();

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



    const deleteNoticeBtn = async () => {
        /* eslint-disable no-restricted-globals */ 
        const deleteNotice = confirm("삭제하시겠습니까?");

        try {
            await instance.delete(`/api/notice/${noticeId}`, option);
            alert("게시글 삭제 완료.");
            window.location.replace("/notice/page/1");
        } catch (error) {
            console.log(error);
        }

    }

    if(setNotice.isLoading) {
        return <></>
    }

    
    return (
        <>
            <BaseLayout>
                <div >
                    <h1>{notice.noticeTitle}</h1>
                    <p><b>{notice.nickname}</b> - {notice.noticeDate}</p>
                    
                    <div dangerouslySetInnerHTML={{ __html: notice.noticeContent }}></div>
                    <div >
                        
                        <button onClick={()=>{navigate(`/notice/${noticeId}/edit`)}}>수정</button>
                        
                        <button onClick={deleteNoticeBtn} >삭제</button>
                        
                    </div>
            </div>
            
            </BaseLayout>
        </>
    );
}

export default NoticeDetails;