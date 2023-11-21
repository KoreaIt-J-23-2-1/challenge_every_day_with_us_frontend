import React, { useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { instance } from '../../api/config/instance';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../api/firebase/firebase';
import * as S from './DefaultStyle';

function Challengedefault(props) {
    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState("getPrincipal");
    const { challengeId } = useParams();
    const [ challenge, setChallenge ] = useState({});
    const [ selectedImage, setSelectedImage ] = useState(null);
    const textareaRef = useRef(null);
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const [ profileImgSrc, setProfileImgSrc ] = useState("");
    const navigate = useNavigate();
    const [ page, setPage ] = useState(1);
    const [ isChallengeFeedRefetch, setIsChallengeFeedRefetch ] = useState(false);

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
            navigate("/");
        }
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setChallenge(response.data);
        }
    });
    
    const getFeedList = useQuery(["getFeedList"], async () => {
        return await instance.get(`/api/challenge/certification/feed/${page}/${challengeId}`, option);
    }, {
        refetchOnWindowFocus: false,
        enabled: isChallengeFeedRefetch,
        onSuccess: (response) => {
            setIsChallengeFeedRefetch(false);
            setPage(page + 1);
        }
    });
    

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
        const today = new Date().toISOString().split('T')[0];
        const userFeedToday = getFeedList.data.data.find(feed =>
            feed.userId === principal.data.data.userId &&
            new Date(feed.dateTime).toISOString().split('T')[0] === today);
    
        if (userFeedToday) {
            alert('오늘 이미 피드를 작성하셨습니다.');
            return;
        }
        let imageUrl = "";
        if (uploadFiles.length > 0) {
            try {
                imageUrl = await uploadImageToFirebase(uploadFiles[0]);
            } catch (error) {
                console.error(error);
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
            if (response) {
                alert("피드 등록 성공");
                setIsChallengeFeedRefetch(true);
                navigate(-1);
            } else {
                alert("피드 등록 실패");
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div css={S.Layout}>

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