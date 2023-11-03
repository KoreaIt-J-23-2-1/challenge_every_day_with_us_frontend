import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
/** @jsxImportSource @emotion/react */


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
        width: 930px;
        height: 25px;
    }
`;

const btnBox = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 50px;
    width: 938px;
    
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

    useEffect(() => {
        const linkTag = window.document.createElement("link");
        linkTag.href = "//cdn.quilljs.com/1.3.6/quill.snow.css";
        linkTag.rel = "stylesheet";
        window.document.head.appendChild(linkTag);
    });

    const [noticeContent, setNoticeContent] = useState({
        title: "",
        content: ""
    })

    const modules = {
        toolbar: {
            container: [
                [{header: [1, 2, 3, false]}],
                ["bold", "underline"],
                ["image"]
            ]
        }
    }        

    const handleContentInput = (value) => {
        setNoticeContent({
            ...noticeContent,
            content: value
        });
    }

    const handleCancelBtn = () => {
        navigete("/notice")
    
    }

    const handleWriteSubmit = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            };
            await axios.post("http://localhost:8080/api/notice",noticeContent, option);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <BaseLayout>
            <h1> 공지 작성</h1>
            <div>
                <div css={inputBox}> <label>제목</label> <input type="text" name='title' placeholder='공지제목'/></div>
                <div css={inputBox}>
                    <label>내용</label>
                    {/* <input type="text" name='content' placeholder='공지내용'/> */}
                    <ReactQuill 
                        style={{width: "938px", height: "500px"}} 
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