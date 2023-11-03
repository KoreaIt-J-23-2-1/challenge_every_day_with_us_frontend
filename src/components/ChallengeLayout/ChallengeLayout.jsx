import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useQueryClient } from 'react-query';
import { instance } from '../../api/config/instanse';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const ChallengeTitle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    & p {
        margin-right: 10px;
        font-size: 20px;
        font-weight: 600;
    }

    & input {
        width: 70%;
        height: 40px;
    }
`;

const ChallengeArea = css`
    display: flex;
    justify-content: center;
    height: 700px;
    margin: 20px;
    border: 5px solid #dbdbdb;
`;

const ApplicationBtn = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 40px;

    & button {
        width: 100%;
        height: 40px;
        font-size: 20px;
        cursor: pointer;
    }
`;

const Checkbox = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 30px;

    & label {
        margin-right: 15px;
    }
`;

const DataBox = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
`;

const DateInput = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 30px;

    & label {
        margin-right: 10px;
    }

    & input {
        width: 150px;
        height: 25px;
    }
`;

function ChallengeLayout(props) {
    const [ challengeTitle, setChallengeTitle ] = useState("");
    const [ isPrivate, setIsPrivate ] = useState(false);
    const [ applicable, setApplicable ] = useState(false);
    const [ startDate, setStartDate ] = useState("");
    const [ endDate, setEndDate ] = useState("");
    const [ userId, setUserId ] = useState(""); 
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;
    const navigete = useNavigate();

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().substr(0, 10);
        setStartDate(formattedDate);
    }, []);

    useEffect(() => {
        if (principal.userId) {
            setUserId(principal.userId);
        }
    }, [principal.userId]);

    const handleTitleChange = (e) => {
        setChallengeTitle(e.target.value);
    };

    // 비공개는 true로 전송됨
    const handlePrivateCheckboxChange = () => {
        setIsPrivate(!isPrivate);
    };

    // 승인을받을거면 true로 전송됨
    const handleCheckboxChange = () => {
        setApplicable(!applicable);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleBackButton = () => {
        navigete(-1);
    }

    const handleSubmitButton = () => {
        const requestData = {
            title: challengeTitle,
            isPrivate: isPrivate,
            isApplicable: applicable,
            startDate: startDate,
            endDate: endDate,
        };
        if(window.confirm("챌린지 생성시 1000 Point가 소요됩니다. 동의하시나요?")) {
            if(principal.point >= 1000){
                const principalPoint = {
                    point: 1000
                };
                instance.post(`/api/challenge/create/${userId}/point`, principalPoint)
                    .then((response) => {
                        instance.post(`/api/challenge/create/${userId}`, requestData)
                    })
                    .catch((error) => {
                        console.error("챌린지 생성 실패:", error);            
                    });
                }else {
                    if(window.confirm("해당 잔여 포인트가 부족합니다. Point 충전소로 이동하시겠습니까?")) {
                        navigete("/point");
                    }
                }
            }
            console.log(requestData);
    };

    return (
        <div>
            <button onClick={handleBackButton}>뒤로가기</button>
            <div css={ChallengeTitle}>
                <p>Category : </p>
                <p>Challenge Title</p>
                <input type="text" placeholder='제목을 입력하세요' onChange={handleTitleChange} />
            </div>
            <div css={ChallengeArea}>
            
            </div>
            <div css={DataBox}>
                <div css={DateInput}>
                    <label htmlFor="startDate">시작 날짜:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div css={DateInput}>
                    <label htmlFor="endDate">마감 날짜:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
            </div>
            <div css={Checkbox}>
                <input
                    type="checkbox"
                    id="privateCheckbox"
                    checked={isPrivate}
                    onChange={handlePrivateCheckboxChange}
                />
                <label htmlFor="privateCheckbox">비공개</label>
                <input
                    type="checkbox"
                    id="allApprovalCheckbox"
                    checked={applicable}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="allApprovalCheckbox">모든참여허용</label>
            </div>
            <div css={ApplicationBtn}>
                <button onClick={handleSubmitButton}>생성하기</button>
            </div>
        </div>
    );
}

export default ChallengeLayout;
