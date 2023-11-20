import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { instance } from '../../api/config/instance';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

const FeedEditModal = ({ onClose, feedId }) => {
    const navigate = useNavigate();
    const [ challenge, setChallenge ] = useState({});
    const modalRef = useRef();

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    const handleCloseModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleCloseModal);
        return () => {
            document.removeEventListener('mousedown', handleCloseModal);
        };
    }, [handleCloseModal]);

    const handleFeedEditClick = async () => {
        try {
            await instance.put(`/api/challenge/feed/${feedId}`, option)
        }catch(error) {
            console.log(error);
        }
    }

    return (
    <div ref={modalRef}>
        <h2>피드 수정</h2>
        <p><b>이미지: </b>{challenge.challengeId}</p>
        <p><b>내용: </b>{challenge.challengeName}</p>
        <button onClick={handleFeedEditClick}>수정하기</button>
    </div>
    );
};

export default FeedEditModal;
