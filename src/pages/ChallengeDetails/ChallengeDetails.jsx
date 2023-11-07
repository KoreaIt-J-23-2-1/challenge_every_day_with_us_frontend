import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { instance } from '../../api/config/instanse';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import {AiOutlineLike, AiTwotoneLike} from 'react-icons/ai';
/** @jsxImportSource @emotion/react */

const likeOption = css`
    margin-left: 20px;
`;

const SLikeButton = (isLike) => css`
    position: sticky;
    top: 150px;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    background-color: ${isLike ? "#7bbdff" : "#fff"};
    cursor: pointer;
`;

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

const categoryLeftBox = css`
    & b {
        font-size: 16px;
        margin-left: 5px;
    }
`;

const categoryRightBox = css`
    display: flex;
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
    const principal = queryClient.getQueryState("getPrincipal");
    const [isLike, setIsLike] = useState(false);

    const { challengeId } = useParams();
    const [ challenge, setChallenge ] = useState({});

    const getChallenge = useQuery(["getChallenge"], async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            return await instance.get(`/challenge/${challengeId}`, option);

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

    const getLikeState = useQuery(["getLikeState"], async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        try {
            return await instance.get(`/challenge/${challengeId}/like`, option);
        }catch(error) {

        }
    }, {
        refetchOnWindowFocus: false,
        retry: 0
    })

    if(getChallenge.isLoading) {
        return <></>
    }

    

    const handleLikebuttonClick = async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        const userId = principal.data.data.userId;

        const requestData = {
            userId: userId
        };

        try {
            console.log(!!getLikeState?.data?.data)
            if (!!getLikeState?.data?.data) {
                await instance.delete(`/challenge/${challengeId}/like`, {
                    ...option,
                    data: requestData
                });
            } else {
                await instance.post(`/challenge/${challengeId}/like`, option,{
                    userId: principal.data.data.userId
                });
            }
            getLikeState.refetch();
            getChallenge.refetch();
            setIsLike(!isLike);
        }catch(error) {
            console.error(error);
        }
        
    }

    return (
        <BaseLayout>
            {queryClient.data}
            <h1 css={challengeTitle}>{challenge.challengeName}</h1>
            <div css={categoryDetail}>
                <div css={categoryLeftBox}>
                    <div>Category : <b>{challenge.categoryName}</b></div>
                </div>
                <div css={categoryRightBox}>
                    <div>작성자: <b>{challenge.name}</b> 기간: {challenge.startDate} ~ {challenge.endDate}</div>
                    <div css={likeOption}>
                        {!getLikeState.isLoading && 
                            <button 
                                css={SLikeButton(isLike)} 
                                onClick={handleLikebuttonClick}
                            >
                                <div>
                                    {isLike ? <AiTwotoneLike/> : <AiOutlineLike/>}
                                </div>
                            </button>
                        }
                    </div>
                </div>
            </div>
            <div css={line}></div>
            <div css={contentContainer} dangerouslySetInnerHTML={{ __html: challenge.introduction}}></div>
        </BaseLayout>
    );
}

export default ChallengeDetails;