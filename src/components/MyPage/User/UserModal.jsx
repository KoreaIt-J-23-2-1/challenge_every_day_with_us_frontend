import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './UserStyle';
import { CircularProgressBar } from '@tomickigrzegorz/react-circular-progress-bar';
import PropTypes from 'prop-types';

function UserModal({ challenge, closeModal, initialProgress, startDate, endDate }) {
    const modalRef = useRef();
    const [ challengeStartDate, setChallengeStartDate ] = useState(null);
    const [ challengeEndDate, setChallengeEndDate ] = useState(null);
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    useEffect(() => {
        setChallengeStartDate(startDate);
        setChallengeEndDate(endDate);
    }, [startDate, endDate]);

    const handleCloseModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleCloseModal);
        return () => {
            document.removeEventListener('mousedown', handleCloseModal);
        };
    }, [handleCloseModal]);

    return (
        <div ref={modalRef}>
            <div css={S.ProgressBox}>
                <h2>수행률</h2>
                <div>
                    <CircularProgressBar colorCircle="#eee" colorSlice="pink" fontSize="10px" percent={parseFloat(initialProgress)} />
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
}

UserModal.propTypes = {
    challenge: PropTypes.number.isRequired,
    closeModal: PropTypes.func.isRequired,
    initialProgress: PropTypes.number.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
};

export default UserModal;