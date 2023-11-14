import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { css } from '@emotion/react';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../api/config/instance';
import { useQuery } from 'react-query';
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


function NoticeEdit(props) {

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
            alert("해당 게시글을 불러올 수 없습니다.");
        }
    }, {
        refetchOnWindowFocus: false,
        onSuccess: response => {
            console.log(response)
            setNoticeContent({
                ...noticeContent,
                title: response.data.noticeTitle,
                content: response.data.noticeContent
            })
        } 
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

        const handleEditSubmit = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            console.log(noticeContent);
            await instance.put(`/api/notice/${noticeId}`, noticeContent, option);
            alert("게시글 수정 완료.");
            window.history.back();
        } catch(error) {
            console.error(error);
            alert("게시글 수정 오류.");
            window.history.back();
        }
    }
    
    console.log(getNotice.noticeTitle)

    return (
        <BaseLayout>
            <div css={noticeLayout}>
                <h1> 공지 수정</h1>
                <div css={inputBox}>
                    <label>제목</label>
                    <input type="text" name='title' onChange={handleTitleInput} defaultValue={noticeContent.title} />
                    <label>내용</label>
                    {/* <input type="text" name='content' placeholder='공지내용'/> */}
                    <ReactQuill 
                        style={{width: "700px", height: "500px"}} 
                        modules={modules}
                        value={noticeContent.content}
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