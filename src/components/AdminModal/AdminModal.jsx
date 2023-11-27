import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { instance } from '../../api/config/instance';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

const AdminModal = ({ onClose, challengeDetails }) => {
    const navigate = useNavigate();
    const [ challenge, setChallenge ] = useState({});
    const [ challengerModalOpen, setChallengerModalOpen ] = useState(false);
    const [ challengers, setChallengers ] = useState({});
    const [ challengersRefetch, setChallengersRefetch ] = useState(false);
    const modalRef = useRef();

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    const getChallenge = useQuery(["getChallenge"], async () => {
        try {
            return await instance.get(`/api/challenge/${challengeDetails}`, option);
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

    const getChallengers = useQuery(["getChallengers"], async () => {
        try {
            const challengeId = challenge.challengeId
            const challengersResponse = await instance.get(`/api/challengers/${challengeId}`, option);
            return challengersResponse.data;
        }catch(error) {
            console.log(error);
        }
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: challengersRefetch,
        onSuccess: challengersResponse => {
            setChallengers(challengersResponse);
            setChallengersRefetch(false);
            setChallengerModalOpen(!challengerModalOpen);
        }
    })

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

    const handleChallengerClick = () => {
        setChallengersRefetch(true);
    }

    return (
    <div ref={modalRef}>
        <h2>Challenge Details</h2>
        <p><b>Challenge ID: </b>{challenge.challengeId}</p>
        <p><b>Challenge Name: </b>{challenge.challengeName}</p>
        <p><b>Category: </b>{challenge.categoryName}</p>
        <p><b>Founder: </b>{challenge.name}</p>
        <p><b>introduction: </b>{challenge.introduction}</p>
        <p><b>Challenge startDate: </b>{challenge.startDate}</p>
        <p><b>Challenge endDate: </b>{challenge.endDate}</p>
        <p><b>LikeCount: </b>{challenge.challengeLikeCount}</p>
        <p css={S.Challenger}><b onClick={handleChallengerClick}>Challenger: </b><span onClick={handleChallengerClick}>{challenge.challenger}</span></p>
            {challengerModalOpen && (
                <div css={S.SubModal}>
                    <h2>Challenger</h2>
                    <ul>
                        {challengers?.map((challenger, index) => (
                            <li key={index}>{challenger.nickname}</li>
                        ))}
                    </ul>
                </div>
            )}
    </div>
    );
};

export default AdminModal;
