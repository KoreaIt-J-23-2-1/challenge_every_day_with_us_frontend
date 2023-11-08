import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/config/instance';
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


function NoticeEdit(props) {

    const navigate = useNavigate();

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
        navigate("/notice")
    
    }

    const handleWriteSubmit = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            };
            await instance.post("/notice",noticeContent, option);
        } catch (error) {
            console.error(error);
        }
    };

        const handleEditSubmit = async () => {
        // try {
        //     const option = {
        //         headers: {
        //             Authorization: localStorage.getItem("token")
        //         }
        //     }
        //     console.log(noticeContent);
        //     await instance.put(`/notice/${noticeId}`, noticeContent, option);
        //     alert("게시글 수정완료");
        //     navigate(`/notice/${noticeId}`);
        // } catch(error) {
        //     console.error(error);
        //     alert("게시글 수정실패");
        //     navigate(`/board/${noticeId}`);
        // }
    }

    return (
        <BaseLayout>
            <h1> 공지 작성</h1>
            <div>
                <div css={inputBox}> <label>제목</label> <input type="text" name='title' placeholder='공지제목' value={noticeContent.title}/></div>
                <div css={inputBox}>
                    <label>내용</label>
                    {/* <input type="text" name='content' placeholder='공지내용'/> */}
                    <ReactQuill 
                        value={noticeContent.content}
                        style={{width: "938px", height: "500px"}} 
                        modules={modules}
                        onChange={handleContentInput}
                    />
                    
                <div css={btnBox}>
                    <button onClick={handleCancelBtn}>취소</button>
                    <button onClick={handleEditSubmit}>수정</button>
                </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default NoticeEdit;