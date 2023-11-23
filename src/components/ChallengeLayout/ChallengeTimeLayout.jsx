import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */
import * as S from './TimeLayoutStyle';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../api/firebase/firebase';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';


function ChallengeTimeLayout() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const { challengeId } = useParams();
    const [ challenge, setChallenge ] = useState({});
    const [ selectedImage, setSelectedImage ] = useState(null);
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const [ profileImgSrc, setProfileImgSrc ] = useState("");
    const [ refetch, setRefetch ] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    };

    const getChallenge = useQuery(["getChallenge"], async () => {
            try {
                return await instance.get(`/api/challenge/${challengeId}`, option);
            } catch (error) {
                throw new Error('챌린지 데이터를 가져올 수 없습니다.');
            }
        }, {
            retry: 0,
            refetchOnWindowFocus: false,
            enabled: refetch,
            onSuccess: response => {
                setChallenge(response.data);
                setRefetch(false);
            }
    });

    useEffect(() => {
        setRefetch(true);
    }, [])

    useEffect(() => {
        let timerInterval;
        
        if (isRunning) {
            timerInterval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, [isRunning]);

    if(getChallenge.isLoading) {
        return <></>
    }

    const startTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setTime(0);
        setIsRunning(false);
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const formattedTime = formatTime(time);

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
    

    const handleInputImg = () => {
        inputRef.current.click();
    };

    const handleSave = async () => {
        const textValue = document.getElementById('challengeText').value;
        if (!textValue.trim()) {
            alert('텍스트를 입력하세요.');
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
            time: time,
            text: textValue,
            image: imageUrl,
            categoryName: challenge.categoryName,
            challengeLayout: challenge.layout,
            layout: 2
        }
        try {
            const response = await instance.post(`/api/challenge/feed/${challengeId}`, data, option);
            if(response) {
                navigate(-1);
            }else {
                alert("피드 등록 실패!")
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div css={S.Layout}>
            <div css={S.TimeLayout}>{formattedTime}</div>
            <div css={S.ButtonLayout}>
                <button onClick={startTimer} disabled={isRunning}>Start</button>
                <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
                <button onClick={resetTimer}>Reset</button>
            </div>

            <div css={S.contentBox}>
                <div css={S.textBox}>
                    <b>Write Text</b>
                    <textarea  id="challengeText" rows="12" cols="70" maxLength={1000}/>
                </div>

                <div>
                    <b>Choice Img</b>
                    <div css={S.imgBox} onClick={handleInputImg}>
                        {selectedImage && (
                            <img src={selectedImage} alt="Selected" />
                        )}
                    </div>
                    <input ref={inputRef} css={S.file} type="file" accept="image/*" onChange={handleProfileChange} />  
                </div>       
                
            </div>

            <button css={S.SaveBtn} onClick={handleSave}>인증하기</button>
        </div>
    );
}

export default ChallengeTimeLayout;
