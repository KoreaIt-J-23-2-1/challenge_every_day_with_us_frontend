import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */



const noticeLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const inputBox = css`
    margin: 5px;

    &> label{
        display: flex;
        align-items: center;
        width: 100px;
        font-size: 12px;
    }

    & > input {
        margin-top: 4px;
        width: 100%;
        height: 25px;
    }
`;

const btnBox = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 50px;
    width: auto;
    
    & > button{
        cursor: pointer;
        margin: 0px 5px;
        width: 80px;
        height: 30px;
        background-color: #efefef;
        border: none;
    }
    & > button:hover{
        background-color: #dbdbdb;
    }
`;

function NoticeWrite(props) {

    const navigete = useNavigate();

    const [noticeContent, setNoticeContent] = useState({
        title: "",
        content: ""
    })

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
                ["image"]
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
            <div css={noticeLayout}>
                <h1> 공지 작성</h1>
                <div css={inputBox}>
                    <label>제목</label>
                    <input type="text" name='title' placeholder='공지제목' onChange={handleTitleInput} />
                    <label>내용</label>
                    {/* <input type="text" name='content' placeholder='공지내용'/> */}
                    <ReactQuill 
                        style={{width: "700px", height: "500px"}} 
                        modules={modules}
                        onChange={handleContentInput}
                        />
                    
                    <div css={btnBox}>
                        <button onClick={handleCancelBtn}>취소</button>
                        <button onClick={handleWriteSubmit}>등록</button>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default NoticeWrite;