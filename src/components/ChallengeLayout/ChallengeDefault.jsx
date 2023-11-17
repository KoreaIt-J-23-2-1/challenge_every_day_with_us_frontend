import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { instance } from '../../api/config/instance';
import { useQuery } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../api/firebase/firebase';
import * as S from './DefaultStyle';

function Challengedefault(props) {
    const { challengeId } = useParams();
    const [ challenge, setChallenge ] = useState({});
    const [ selectedImage, setSelectedImage ] = useState(null);
    const textareaRef = useRef(null);
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const [ profileImgSrc, setProfileImgSrc ] = useState("");
    const navigate = useNavigate();

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    const getChallenge = useQuery(["getChallenge"], async () => {
        try {
            return await instance.get(`/api/challenge/${challengeId}`, option);
        }catch(error) {
            alert("해당 챌린지를 불러올 수 없습니다.");
            Navigate("/");
        }
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setChallenge(response.data);
        }
    })

    if(getChallenge.isLoading) {
        return <></>
    }

    const uploadImageToFirebase = async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    };

    const handleProfileChange = (e) => {
        setUploadFiles(e.target.files);
        const files = e.target.files;
    
        if (!files.length) {
            setUploadFiles([]);
            setProfileImgSrc("");
            return;
        }
    
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageDataUrl = e.target.result;
            setProfileImgSrc(imageDataUrl);
            setSelectedImage(imageDataUrl);
        };
    
        reader.readAsDataURL(files[0]);
    };

    const handleSave = async () => {
        const textValue = document.getElementById('challengeText').value;
        let imageUrl = "";
        if (uploadFiles.length > 0) {
            try {
                imageUrl = await uploadImageToFirebase(uploadFiles[0]);
            } catch (error) {
                console.error("Error uploading image:", error);
                return;
            }
        }
        const data = {
            text: textValue,
            image: imageUrl,
            categoryName: challenge.categoryName,
            challengeLayout: challenge.layout,
            layout: 1
        };
        try {
            const response = await instance.post(`/api/challenge/feed/${challengeId}`, data, {
                            headers: {
                                Authorization: localStorage.getItem('accessToken')
                            },
            });
            if(response){
                navigate(-1);
            }else {
                alert("피드 등록 실패");
            }
        } catch (error) {
            console.error(error);
        }
    };

    console.log(profileImgSrc)

    return (
        <div css={S.Layout}>
            <div css={S.TitleLayout}>
                {challenge ? (
                    <h1>Title: <b>{challenge.challengeName}</b>[{challenge.categoryName}]</h1>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
            <div css={S.textLayout}>
                <div>
                    <textarea ref={textareaRef} css={S.textareaBox} id="challengeText" rows="32" cols="200" maxLength={1000}></textarea>
                    <input css={S.FileBox} type="file" accept="image/*" onChange={handleProfileChange} />
                </div>
                {selectedImage && (
                    <img src={selectedImage} css={S.imagePreview} alt="Selected" />
                )}
            </div>
            <button css={S.SaveButton} onClick={handleSave}>인증하기</button>
        </div>
    );
}

export default Challengedefault;