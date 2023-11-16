import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import BaseLayout from '../../components/BaseLayout/BaseLayout';

const ChallengeTitle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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

const CategoryBox = css`
    position: absolute;
    left: 38px;
    top: 65px;
    & b {
        font-size: 20px;
        margin-left: 5px;
    }
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
const Layout = css`

    & div {
        margin-top: 50px;
    }

    & h2 {
        margin-top: 50px;
    }
`;

const CheckBox = css`
    display: flex;

    & input {
        margin-right: 5px;
    }
`;

const CheckBoxLayout = css`
    display: flex;

    & div {
        margin-right: 20px;
    }
`;

const ContentLayout = css`
    border: 5px solid #dbdbdb;
    margin: 30px;

    & h2 {
        margin-left: 20px;
    }

    & div, p, textarea {
        margin-left: 10px;
        margin-bottom: 20px;
    }
`;

function ChallengeCreate({ children }) {
    const [ challengeTitle, setChallengeTitle ] = useState("");
    const [ isPrivate, setIsPrivate ] = useState(false);
    const [ applicable, setApplicable ] = useState(false);
    const [ startDate, setStartDate ] = useState("");
    const [ endDate, setEndDate ] = useState("");
    const [ userId, setUserId ] = useState(""); 
    const [ selectedLayout, setSelectedLayout ] = useState(1);
    const [ introduction, setIntroduction ] = useState("");
    const { categoryName } = useParams();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;
    const navigete = useNavigate();
    const getPrincipal = useQuery(["getPrincipal"], async () => {
        try {
            const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
            }
        return await instance.get("/api/account/principal", option);
    
        } catch(error) {
            throw new Error(error)
        }
        }, {
        retry: 0,
        refetchInterval: 1000 * 60 * 10,
        refetchOnWindowFocus: false
        });

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

    const handleLayoutChange = (e) => {
        setSelectedLayout(Number(e.target.value));
    }

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

    const handleIntroductionChange = (e) => {
        setIntroduction(e.target.value);
    }

    const handleBackButton = () => {
        navigete(-1);
    }

    const handleSubmitButton = () => {
        const requestData = {
            challengeName: challengeTitle,
            isOpen: isPrivate,
            isApplicable: applicable,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
            layout: selectedLayout,
            introduction: introduction,
            categoryName: categoryName,
            userId: userId
        };
        if(window.confirm("챌린지 생성시 1000 Point가 소요됩니다. 동의하시나요?")) {
            if(principal.point >= 1000){
                const principalPoint = {
                    point: 1000,
                    userId: userId
                };
                instance.post(`/api/challenge/create/point`, principalPoint)
                    .then((response) => {
                        instance.post(`/api/challenge/create`, requestData)
                        getPrincipal.refetch();
                    })
                    .catch((error) => {
                        console.error("챌린지 생성 실패:", error);            
                    });
            }else {
                window.confirm("해당 잔여 포인트가 부족합니다. Point 충전소로 이동하시겠습니까?")
                navigete("/point");
            }
        }
    };

    return (
        <>
            <button onClick={handleBackButton}>뒤로가기</button>
            <div css={ChallengeTitle}>
                <div css={CategoryBox}>
                    <div>Category : 
                        <b>{categoryName}</b>
                    </div>
                </div>
                <p>Challenge Title</p>
                <input type="text" placeholder='제목을 입력하세요' onChange={handleTitleChange} />
            </div>
            <div css={ContentLayout}>
                <h2>인증 방법</h2>
                <div css={CheckBoxLayout}>
                    <div css={CheckBox}>
                        <input type="radio" id="layout1" name='layout' value={1} onChange={handleLayoutChange}/>
                        <label htmlFor="layout1">글, 사진인증</label>
                    </div>
                    <div css={CheckBox}>
                        <input type="radio" id="layout2" name='layout' value={2} onChange={handleLayoutChange}/>
                        <label htmlFor="layout2">글, 사진, 시간인증</label>
                    </div>
                    <div css={CheckBox}>
                        <input type="radio" id="layout3" name='layout' value={3} onChange={handleLayoutChange}/>
                        <label htmlFor="layout3">글, 사진, 루틴기록</label>
                    </div>
                </div>
                <div css={Layout}>
                    <div>* 참가자들이 혼란을 겪지 않도록 정확한 기준과 구체적인 인증방법을 적어주세요.</div>
                    <h2>챌린지 소개</h2>
                    <textarea id="introText" rows="7" cols="60" maxLength={1000} onChange={handleIntroductionChange}></textarea>
                    <p>챌린지를 소개해보세요.</p>
                    <p>혹시 알아요? 리더님의 글에 반해서 의지가 불타오를지!</p>
                    <div>* 챌린지가 시작되면 챌린지를 수정할 수 없습니다. 신중하게 생성해주세요</div>
                </div>
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
        </>
    );
}

export default ChallengeCreate;