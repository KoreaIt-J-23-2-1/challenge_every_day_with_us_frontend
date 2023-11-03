import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import {instance} from '../../api/config/instanse';
import { useQueryClient } from 'react-query';

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const imgBox = css`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #dbdbdb;
    overflow: hidden;
    cursor: pointer;

    & > img {
        width: 100%;
    }
`;

const file = css`
    display: none;
`;

function MyPageDetails(props) {
    
    const navegate = useNavigate();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;   
    const profileFileRef = useRef();
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const [ profileImgSrc, setProfileImgSrc ] = useState("");
    const [ modifyMypageDetail, setModifyMypageDetail ] = useState(principal);

    useEffect(() => {
        setProfileImgSrc(principal.profileUrl);
    }, [])

    const handleProfileUploadClick = () => {
        if(window.confirm("프로필 사진을 변경하시겠습니까?")) {
            profileFileRef.current.click();
        }
    }

    const handleProfileChange = (e) => {
        const files = e.target.files;

        if(!files.length) {
            setUploadFiles([]);
            e.target.value = "";
            return;
        }

        for(let file of files){
            setUploadFiles([...uploadFiles, file]);
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setProfileImgSrc(e.target.result);
        }

        reader.readAsDataURL(files[0])
    }

    const handleUploadSubmit = () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            instance.put(`/api/account/img/${1}`, uploadFiles, option)
        }catch(error) {

        }    
    }

    const handleUploadCancel = () => {
        setUploadFiles([]);
        profileFileRef.current.value = "";
    }

    const handleInputChange = (e) => {
        setModifyMypageDetail({
            ...modifyMypageDetail,
            [e.target.name]: e.target.value
        });
    }

    const handleModifyMypageDetailSubmit = async () => {
        try{
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            await instance.put(`/api/account/nickname/${1}`, modifyMypageDetail, option);
        }catch(error) {
            console.error(error);
        }
    }

    const handleCancelClick = () => {
        navegate("/account/mypage");
    }

    const handleIsWithdrawn = async () => {
        if(window.confirm("정말 탈퇴하시겠습니까?")) {
            if(window.confirm("진짜로 떠나시겠습니까?")) {
                try{
                    const option = {
                        headers: {
                            Authorization: localStorage.removeItem("accessToken")
                        }
                    }
                    await instance.delete(`/api/account/${1}`, option);
                }catch(error) {
                    console.error(error);
                }
            }
        }
    }

    return (
        <div css={layout}>
            <div>
                <div css={imgBox} onClick={handleProfileUploadClick}>
                    <img src={profileImgSrc} alt="" />
                </div>
                <input css={file} type="file" onChange={handleProfileChange} ref={profileFileRef}/>
                {!!uploadFiles.length && 
                    <div>
                        <button onClick={handleUploadSubmit}>변경</button>
                        <button onClick={handleUploadCancel}>취소</button>
                    </div>
                }
                <div>
                    <input type="text" name='name' value={principal.name} onChange={handleInputChange} placeholder='이름' />
                </div>
                <div>
                    <input type="text" name='nickname' defaultValue={principal.nickname} onChange={handleInputChange} placeholder='닉네임' />
                </div>
                <div>
                    <input type="text" name='email' value={principal.email} onChange={handleInputChange} placeholder='이메일' />
                </div>
                <div>
                    <input type="text" name='phone' value={principal.phone} onChange={handleInputChange} placeholder='전화번호' />
                </div>
                <button onClick={handleModifyMypageDetailSubmit}>정보변경</button>
                <button onClick={handleCancelClick}>취소</button>
                <button onClick={handleIsWithdrawn}>회원탈퇴</button>
            </div>
        </div>
    );
}

export default MyPageDetails;