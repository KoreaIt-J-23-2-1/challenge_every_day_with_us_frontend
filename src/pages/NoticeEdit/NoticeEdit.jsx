import React, { useEffect, useRef, useState } from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../api/config/instance';
import { useQuery } from 'react-query';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { showAlert } from '../../styles/common';

function NoticeEdit(props) {
    const textareaRef = useRef(null);
    const navigete = useNavigate();
    const { noticeId } = useParams();

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }
    
    const [noticeContent, setNoticeContent] = useState({
        title: "",
        content: ""
    })

    const getNotice = useQuery(["getNotice"], async () => {
        try {
            return await instance.get(`/api/notice/${noticeId}`,option);
        }catch(error) {
            showAlert("해당 게시글을 불러올 수 없습니다.", "error");
        }
    }, {
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setNoticeContent({
                ...noticeContent,
                title: response.data.noticeTitle,
                content: response.data.noticeContent
            })
        } 
    }) 

    const handleTitleInput = (e) => {
        setNoticeContent({
            ...noticeContent,
            title: e.target.value
        });
    }

    const handleContentInput = (e) => {
        setNoticeContent({
            ...noticeContent,
            content: e.target.value
        });
    }

    const handleCancelBtn = () => {
        navigete("/notice/page/1")
    }

        const handleEditSubmit = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            await instance.put(`/api/notice/${noticeId}`, noticeContent, option);
            showAlert("게시글 수정 완료.", "success");
            window.history.back();
        } catch(error) {
            console.error(error);
            showAlert("게시글 수정 오류.", "error");
            window.history.back();
        }
    }
    
    return (
        <BaseLayout>
            <div css={S.noticeLayout}>
                <h1> 공지 수정</h1>
                <div css={S.inputBox}>
                    <label>제목</label>
                    <input type="text" name='title' onChange={handleTitleInput} defaultValue={noticeContent.title} />
                    <label>내용</label>

                    <textarea ref={textareaRef}
                        id="content" css={S.Quill} value={noticeContent.content} maxLength={1000} onChange={handleContentInput}/>

                    <div css={S.btnBox}>
                        <button onClick={handleCancelBtn}>취소</button>
                        <button onClick={handleEditSubmit}>수정</button>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default NoticeEdit;