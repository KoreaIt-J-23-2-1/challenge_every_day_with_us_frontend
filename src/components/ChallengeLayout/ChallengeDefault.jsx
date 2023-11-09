import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { instance } from '../../api/config/instance';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
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
    width: 1100px;
`;

const textareaBox = css`
    display: flex;
    flex-grow: 1;
    resize: none;
    border-radius: 10px;
    transition: width 0.3s;
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

    useEffect(() => {
        if (selectedImage) {
            const img = new Image();
            img.src = selectedImage;
            img.onload = function () {
                const imgWidth = img.width;
                console.log(img.width)
                const textareaWidth = 1100 - (imgWidth + 50);
                textareaRef.current.style.width = `${textareaWidth}px`;
            };
        }
    }, [selectedImage]);
    

    if(getChallenge.isLoading) {
        return <></>
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const blobUrl = URL.createObjectURL(file);
        setSelectedImage(blobUrl);
    };

    console.log(challenge);

    const handleSave = async () => {
        const data = {
            text: document.getElementById('challengeText').value,
            image: selectedImage,
            categoryName: challenge.categoryName,
            challengeLayout: challenge.layout,
            layout: 1
        }
        try {
            const response = await instance.post(`/api/challenge/feed/${challengeId}`, data, {
                headers: {
                    Authorization: localStorage.getItem('accessToken')
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

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
                    <textarea ref={textareaRef} css={textareaBox} id="challengeText" rows="32" cols="88" maxLength={1000}></textarea>
                    <input css={FileBox} type="file" accept="image/*" onChange={handleImageChange} />
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