import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

function NoticeWrite(props) {
    const navigete = useNavigate();
    const [ noticeContent, setNoticeContent ] = useState({
        title: "",
        content: "",
        // imageUrl: "",
    });


    useEffect(() => {
        const linkTag = window.document.createElement("link");
        linkTag.href = "//cdn.quilljs.com/1.3.6/quill.snow.css";
        linkTag.rel = "stylesheet";
        window.document.head.appendChild(linkTag);
    });

    const modules = {
        toolbar: {
            container: [
                [{header: [1, 2, 3, false]}],
                ["bold", "underline"],
                // ["image"]
            ]
        }
    }     

    
    const handleTitleInput = (e) => {
        setNoticeContent({
            ...noticeContent,
            title: e.target.value
        });
    }

    const handleContentInput = (value) => {
        setNoticeContent({
            ...noticeContent,
            content: value
            
        });
    }

    const handleCancelBtn = () => {
        navigete("/notice/page/1")
    
    }

    const handleWriteSubmit = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            };
            await instance.post("/api/notice", { ...noticeContent, imageUrl: noticeContent.imageUrl }, option);
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
                    {/* <input type="text" name='content' placeholder='공지내용'/> */}
                    <ReactQuill 
                        style={{width: "700px", height: "500px"}} 
                        modules={modules}
                        onChange={handleContentInput}
                        />
                    
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