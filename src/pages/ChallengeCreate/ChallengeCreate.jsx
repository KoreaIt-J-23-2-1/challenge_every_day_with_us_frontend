import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import * as S from './ChallengeCreateStyle';
import TitleComponent from '../../components/TitleComponent/TitleComponent';

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
    
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

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

    const handleSubmitButton = async () => {
        if (!challengeTitle || !startDate || !endDate || !introduction) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }

        const requestData = {
            challengeName: challengeTitle,
            isApplicable: applicable,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
            layout: selectedLayout,
            introduction: introduction,
            categoryName: categoryName,
            userId: userId
        };
        if(window.confirm("챌린지 생성시 1000 Point가 소요됩니다. 동의하시나요?")) {
            try {
                if(principal.point >= 1000){
                    
                    const createResponse = await instance.post(`/api/challenge/create`, requestData, option);
                    
                    if (createResponse.data === true) {
                        alert("챌린지 등록 !! ");
                        queyrClient.refetchQueries(["getPrincipal"]);
                        navigete("/main");
                    } else {
                        console.log("챌린지 생성 실패");
                    }
                } else {
                    if (window.confirm("해당 잔여 포인트가 부족합니다. Point 충전소로 이동하시겠습니까?")) {
                        navigete("/store/items");
                    } else {
                        alert("포인트 충전 후 챌린지를 개설해주세요.");
                    }
                }
            } catch (error) {
                console.log(error);
                alert(error.response.data);
            }
        }
    };

    return (
        <BaseLayout>
            <TitleComponent title="어떤 도전을 하실건가요 ?" />
            <div css={S.Layout}>
                <div css={S.ChallengeTitle}>
                    <div>Category : 
                        <b>{categoryName}</b>
                    </div>
                </div>
                <div css={S.InputBox}>
                    <p>Challenge Title</p>
                    <input type="text" placeholder='제목을 입력하세요' onChange={handleTitleChange} />
                </div>
                <div css={S.ContentLayout}>
                    <h2>인증 방법</h2>
                    <div css={S.CheckBoxLayout}>
                        <div css={S.CheckBox1}>
                            <input type="radio" id="layout1" name='layout' value={1} onChange={handleLayoutChange}/>
                            <label htmlFor="layout1">글, 사진인증</label>
                        </div>
                        <div css={S.CheckBox2}>
                            <input type="radio" id="layout2" name='layout' value={2} onChange={handleLayoutChange}/>
                            <label htmlFor="layout2">글, 사진, 시간인증</label>
                        </div>
                    </div>
                    <div css={S.Introduction}>
                        <div>* 참가자들이 혼란을 겪지 않도록 정확한 기준과 구체적인 인증방법을 적어주세요.</div>
                        <h2>챌린지 소개</h2>
                        <textarea id="introText" rows="7" cols="60" maxLength={1000} onChange={handleIntroductionChange}></textarea>
                        <p>챌린지를 소개해보세요.</p>
                        <p>혹시 알아요? 리더님의 글에 반해서 의지가 불타오를지!</p>
                        <div>* 챌린지가 시작되면 챌린지를 수정할 수 없습니다. 신중하게 생성해주세요</div>
                    </div>
                </div>
                <div css={S.DataBox}>
                    <div css={S.DateInput}>
                        <label htmlFor="startDate">시작 날짜:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                    </div>
                    <div css={S.DateInput}>
                        <label htmlFor="endDate">마감 날짜:</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </div>
                </div>
                <div css={S.allApprovalCheckbox}>
                    <input
                        type="checkbox"
                        id="allApprovalCheckbox"
                        checked={applicable}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="allApprovalCheckbox">자동 승인</label>
                </div>
                <div css={S.ApplicationBtn}>
                    <button onClick={handleSubmitButton}>생성하기</button>
                </div>
            </div>
        </BaseLayout>
    );
}

export default ChallengeCreate;