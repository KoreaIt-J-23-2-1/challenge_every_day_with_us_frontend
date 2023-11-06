import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { instance } from '../../api/config/instanse';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
/** @jsxImportSource @emotion/react */

const challengeTitle = css`
    width: 100%;
    font-size: 50px;
    word-wrap: break-word;
`;

const categoryDetail = css`
    display: flex;
    justify-content: space-between;
    & p {
        font-size: 16px;
        margin-left: 5px;
    }
`;

const categoryBox = css`
    & b {
        font-size: 16px;
        margin-left: 5px;
    }
`;

const line = css`
    width: 100%;
    margin: 30px 0px;
    border-bottom: 2px solid #dbdbdb;
`;

const contentContainer = css`
    width: 100%;
    word-wrap: break-word;
    & * {
        word-wrap: break-word;
    }
    & img {
        max-width: 100%;
    }
`;



function ChallengeDetails(props) {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    // const principal = queryClient.getQueryState("getPrincipal");

    const { challengeId } = useParams();
    const [ challenge, setChallenge ] = useState({});

    const getChallenge = useQuery(["getChallenge"], async () => {
        try {
            return await instance.get(`/api/challenge/${21}`)
        }catch(error) {
            alert("해당 챌린지를 불러올 수 없습니다.");
            navigate("/");
        }
    }, {
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setChallenge(response.data);
            console.log(response.data);
        }
    })

    if(getChallenge.isLoading) {
        return <></>
    }

    return (
        <BaseLayout>
            <h1 css={challengeTitle}>{challenge.challengeName}</h1>
            <div css={categoryDetail}>
                <div css={categoryBox}>
                    <div>Category : <b>{challenge.categoryName}</b></div>
                </div>
                <div>작성자: <b>{challenge.name}</b> 기간: {challenge.startDate} ~ {challenge.endDate}</div>
            </div>
            <div css={line}></div>
            <div css={contentContainer} dangerouslySetInnerHTML={{ __html: challenge.introduction}}></div>
        </BaseLayout>
    );
}

export default ChallengeDetails;