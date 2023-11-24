import React, { useEffect, useRef, useState } from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

function NoticeWrite(props) {
    const textareaRef = useRef(null);
    const navigete = useNavigate();
    const [ noticeContent, setNoticeContent ] = useState({
        title: "",
        content: "",
    });
    
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

    const handleWriteSubmit = async () => {
        try {
            if (!noticeContent.title || !noticeContent.content) {
                alert("제목과 내용을 모두 입력해주세요.");
                return;
            }
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            };

            await instance.post("/api/notice", noticeContent, option);
            alert("공지가 작성되었습니다.");
            window.history.back();
        } catch (error) {
            console.error(error);
            alert("작성에 실패하였습니다.");
        }
    };

    return (
        <BaseLayout>
            <div css={S.noticeLayout}>
                <h1> 공지 작성</h1>
                <div css={S.inputBox}>
                    <label>제목</label>
                    <input type="text" name='title' placeholder='공지제목' onChange={handleTitleInput} />
                    <label>내용</label>
                    <textarea ref={textareaRef}
                        id="content" css={S.Quill} maxLength={1000} onChange={handleContentInput}/>
                    <div css={S.btnBox}>
                        <button onClick={handleCancelBtn}>취소</button>
                        <button onClick={handleWriteSubmit}>등록</button>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default NoticeWrite;