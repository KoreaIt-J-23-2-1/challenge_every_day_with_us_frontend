import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../api/firebase/firebase';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

const FeedEditModal = ({ onClose, feedDetail }) => {
    const [ selectedImage, setSelectedImage ] = useState(null);
    const [feedContent, setFeedContent] = useState("");
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const feedFileRef = useRef();

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

    const handleInputImg = () => {
        feedFileRef.current.click();
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
        <b>이미지 </b>
        <div css={S.imgBox} onClick={handleInputImg}>
            {selectedImage && (
                <img src={selectedImage} alt="selected" />
            )}
        </div>
        <input css={S.file} type="file"  onChange={handleImgChange} ref={feedFileRef}/>
        <b>내용 </b>
        <div css={S.textBox}>
            <textarea name="" id="" cols="10" rows="10" defaultValue={getFeed?.data?.data?.feedContent} onChange={handleTextContentChange}></textarea>
        </div>
        
        <button css={S.ModifyBtn} onClick={handleFeedEditClick}>수정하기</button>
    </div>
    );
};

export default FeedEditModal;
