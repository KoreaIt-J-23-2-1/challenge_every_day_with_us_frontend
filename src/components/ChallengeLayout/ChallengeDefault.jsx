import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { instance } from '../../api/config/instance';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../api/firebase/firebase';
/** @jsxImportSource @emotion/react */

const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
`;

const TitleLayout = css`
    position: absolute;
    top: 0px;
    left: 50px;

    & b {
        margin: 0px 10px;
    }
`;

const textLayout = css`
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 50px;
    top: 100px;
    width: 95%;
`;

const textareaBox = css`
    display: flex;
    flex-grow: 1;
    resize: none;
    border-radius: 10px;
    transition: width 0.3s;
    width: 100%;
`;

const imagePreview = css`
    margin-left: 50px;
    max-width: 100%;
    max-height: 500px;
    border-radius: 10px;
`;

const FileBox = css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

const SaveButton = css`
    position: absolute;
    right: 30px;
    bottom: 30px;
    width: 100px;
    height: 30px;
    background-color: transparent;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    cursor: pointer;

    &:active {
        background-color: #dbdbdb;
    }
`;

function Challengedefault(props) {
    const { challengeId } = useParams();
    const [ challenge, setChallenge ] = useState({});
    const [ selectedImage, setSelectedImage ] = useState(null);
    const textareaRef = useRef(null);
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const [ profileImgSrc, setProfileImgSrc ] = useState("");

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

    console.log(challenge);

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
            await instance.post(`/api/challenge/feed/${challengeId}`, data, {
                headers: {
                    Authorization: localStorage.getItem('accessToken')
                },
            });
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(profileImgSrc)

    return (
        <div css={Layout}>
            <div css={TitleLayout}>
                {challenge ? (
                    <h1>Title: <b>{challenge.challengeName}</b>[{challenge.categoryName}]</h1>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
            <div css={textLayout}>
                <div>
                    <textarea ref={textareaRef} css={textareaBox} id="challengeText" rows="32" cols="200" maxLength={1000}></textarea>
                    <input css={FileBox} type="file" accept="image/*" onChange={handleProfileChange} />
                </div>
                {selectedImage && (
                    <img src={selectedImage} css={imagePreview} alt="Selected" />
                )}
            </div>
            <button css={SaveButton} onClick={handleSave}>인증하기</button>
        </div>
    );
}

export default Challengedefault;