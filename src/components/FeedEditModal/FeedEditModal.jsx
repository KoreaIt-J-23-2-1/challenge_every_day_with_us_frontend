import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../api/firebase/firebase';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

const FeedEditModal = ({ onClose, feedDetail }) => {
    const navigate = useNavigate();
    const [ selectedImage, setSelectedImage ] = useState(null);
    const [feedContent, setFeedContent] = useState("");
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const [ isChallengeFeedRefetch, setIsChallengeFeedRefetch ] = useState(false);
    const principalState = useQueryClient().getQueryState("getPrincipal");
    const principal = principalState?.data?.data;

    const modalRef = useRef();

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    const getFeed = useQuery(["getFeed"], async () => {
        return await instance.get(`/api/challenge/feed/${feedDetail}`, option);
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setSelectedImage(response?.data?.img);
            setFeedContent({
                contentValue: response?.data?.feedContent
            })
        }
    });

    const uploadImageToFirebase = async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    };

    const handleImgChange = (e) => {
        setUploadFiles(e.target.files);
        const files = e.target.files;
    
        if (!files.length) {
            setUploadFiles([]);
            return;
        }
    
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageDataUrl = e.target.result;
            setSelectedImage(imageDataUrl);
        };
    
        reader.readAsDataURL(files[0]);
    };

    const handleTextContentChange = (e) => {
        setFeedContent({
            ...feedContent,
            contentValue : e.target.value
        })
    }

    const handleFeedEditCloseModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleFeedEditCloseModal);
        return () => {
            document.removeEventListener('mousedown', handleFeedEditCloseModal);
        };
    }, [handleFeedEditCloseModal]);

    const handleFeedEditClick = async () => {
        let imageUrl = getFeed?.data?.data?.img;
        if (uploadFiles.length > 0) {
            try {
                imageUrl = await uploadImageToFirebase(uploadFiles[0]);
            } catch (error) {
                console.error(error);
                return;
            }
        }
        const data = {
            text: feedContent.contentValue,
            img: imageUrl
        }
        try {
            await instance.put(`/api/challenge/feed/${feedDetail}`, data, option);
            onClose();
        }catch(error) {
            console.log(error);
        }
            console.log(data)
    }



    return (
    <div ref={modalRef}>
        <h2>피드 수정</h2>
        <p><b>이미지: </b><input type="file"  onChange={handleImgChange}/></p>
        {selectedImage && (
            <img src={selectedImage} css={S.SContentImg} alt="selected" />
        )}
        <p><b>내용: </b><textarea name="" id="" cols="30" rows="10" defaultValue={getFeed?.data?.data?.feedContent} onChange={handleTextContentChange}></textarea></p>
        <button onClick={handleFeedEditClick}>수정하기</button>
    </div>
    );
};

export default FeedEditModal;
