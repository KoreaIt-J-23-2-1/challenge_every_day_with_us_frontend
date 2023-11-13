import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { instance } from '../../api/config/instance';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import {AiOutlineLike, AiTwotoneLike} from 'react-icons/ai';
/** @jsxImportSource @emotion/react */

const Layout = css`
    display: flex;
    flex-direction: column;
`;

const HeaderLayout = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 150px;
    margin: 0px 30px;

    & b {
        font-size: 30px;
    }

    & p {
        margin: 0px;
        margin-top: 20px;
    }
`;

const Box = css`
    display: flex;
    justify-content: center;
    align-items: center;

`;

const DeleteButton = css`
    width: 50px;
    height: 30px;
    border: 1px solid #eee;
    background-color: transparent;
    border-radius: 10px;
    cursor: pointer;
    
    &:active {
        background-color: #eee;
    }
`;

const Writer = css`
    font-size: 14px;

    & b {
        margin-left: 5px;
        font-size: 20px;
    }
`;

const BodyLayout = css`
    display: flex;
    justify-content: space-between;
    margin: 0px 30px;
    
    & img {
        
    }
`;

const BodyFeedLayout = css`
    display: flex;
    flex-grow: 1;
    height: 700px;
    border: 2px solid #dbdbdb;
    border-radius: 10px;
`;

const BodyRightBox = css`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;

const ParticipationButton = css`
    margin-top: 20px;
    width: 400px;
    height: 40px;
    background-color: transparent;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    cursor: pointer;

    &:active {
        background-color: #eee;
    }
`;

const textBox = css`
    width: 400px;
    height: 100px;
    border: 2px solid #dbdbdb;
    margin: 20px 0px;
`;

const SLikeButton = (isLike) => css`
    position: sticky;
    margin: 0px 40px;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: ${isLike ? "#7bbdff" : "#fff"};
    cursor: pointer;
`;

const line = css`
    margin: 10px 20px;
    border-bottom: 2px solid #dbdbdb;
`;

const ListBox = css`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    height: 425px;
    overflow: auto;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    
    & scrollable-container {
        height: 100%;
    }

    & b {
        margin: 5px;
    }

    & p {
        margin: 5px;
    }
`;

const ListContainer = css`
    display: flex;
    align-items: center;

    & p {
        margin: 5px;
    }

    & button {
        
    }
`;

const DeleteChallengerButton = css`
    width: 50px;
    height: 20px;
    background-color: transparent;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    cursor: pointer;

    &:active {
        background-color: #eee;
    }
`;

function ChallengeDetails(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState("getPrincipal");
    const [ isLike, setIsLike ] = useState(false);
    const { challengeId } = useParams();
    const [ challenge, setChallenge ] = useState({});
    const [ challengers, setChallengers ] = useState({});
    const [ dateDifference, setDateDifference ] = useState(null);
    const [ todayDifference, setTodayDifference ] = useState(null);
    const [ isJoined, setIsJoined ] = useState("");
    const [ button, setButton ] = useState(false);

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    const checkUserJoinStatus = useQuery(["checkUserJoinStatus"], async () => {
        try {
            const joinResponse = await instance.get(`/api/challenge/join/${challengeId}`, option);
            if (!joinResponse.data) {
                const atmospherResponse = await instance.get(`/api/challenge/atmospher/${challengeId}`, option);
                if (atmospherResponse.data) {
                    setIsJoined("대기중");
                } else {
                    setIsJoined("챌린지 신청 하기");
                }
            } else {
                setIsJoined("챌린지 인증하기");
            }
            return isJoined;
        } catch (error) {
            console.log(error);
        }
    }, {
        retry: 0,
        refetchOnWindowFocus: false
    });

    const getChallenge = useQuery(["getChallenge"], async () => {
        try {
            return await instance.get(`/api/challenge/${challengeId}`, option);
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
    })

    const getChallengers = useQuery(["getChallengers"], async () => {
        try {
            const challengersResponse = await instance.get(`/api/challengers/${challengeId}`, option);
            return challengersResponse.data;
        }catch(error) {
            console.log(error);
            throw new Error("Error fetching challengers");
        }
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: data => {
            if (data) {
                setChallengers(data);
            }
        }
    })

    const getLikeState = useQuery(["getLikeState"], async () => {
        try {
            return await instance.get(`/api/challenge/${challengeId}/like`, option);
        }catch(error) {
            console.erroe(error);
        }
    }, {
        refetchOnWindowFocus: false,
        retry: 0
    })

    useEffect(() => {
        const startDate = new Date(challenge.startDate);
        const endDate = new Date(challenge.endDate);
        const today = new Date();
        const timeDifference = endDate - startDate;
        const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const todayTimeDifference = today - startDate;
        const todayDifference = Math.floor(todayTimeDifference / (1000 * 60 * 60 * 24));

        setDateDifference(dayDifference);
        setTodayDifference(todayDifference)
    }, [challenge.startDate, challenge.endDate]);

    if(getChallenge.isLoading) {
        return <></>
    }

    if(getChallengers.isLoading) {
        return<></>
    }


    const handleLikebuttonClick = async () => {
        console.log(principal)
        const userId = principal.data.data.userId;
        const result = {
            userId: userId
        }
        try {
            const response = await instance.get(`/api/challenge/${challengeId}/userlike`, {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                },
                params: {
                    userId: userId
                }
            });
            if (response.data) {
                await instance.delete(`/api/challenge/${challengeId}/like`, {
                    ...option,
                    data: result
                });
            } else {
                await instance.post(`/api/challenge/${challengeId}/like`, result, option);
            }
            getLikeState.refetch();
            getChallenge.refetch();
            setIsLike(!isLike);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteClick = async () => {
        if(principal.data.data.name === challenge.name){
            await instance.delete(`/api/challenge/${challengeId}`, option)
            alert("삭제완료!");
            navigate("/");
        }else {
            alert("작성자만 삭제할 수 있습니다.");
        }
        getLikeState.refetch();
        getChallenge.refetch();
    }

    const requestData = {
        senderUserId: principal.data.data.userId,
        receiverUserId: challenge.userId,
        title: "챌린지 승인 요청",
        content: `${challenge.challengeName} 챌린지의 승인 요청이 들어왔습니다.`,
        targetUrl: principal.data.data.profileUrl
    };
    
    const handleParticipationButton = () => {
        if(isJoined === "챌린지 인증하기") {
            navigate(`/challenge/certification/${challengeId}`)
        }else if(isJoined === "대기중") {
            setButton(true);
        }else {
            if(challenge.isApplicable === "0"){
                const response = instance.post(`/api/challenge/join/${challengeId}`, {}, option);
                if(response) {
                    alert("챌린지 참여가 가능합니다!")
                }
            }else {
                const response = instance.post(`/api/challenge/join/${challengeId}`, {}, option);
                if(response) {
                    alert("신청완료! 승인까지 1~2일이 소요됩니다.");
                    instance.post("/api/challenge/atmosphere/letter", requestData, option);
                }
            }
            checkUserJoinStatus.refetch();
        }
    }

    const isOwner = (userId, challengerId) => {
        return userId === challengerId;
    };

    const handleDeleteChallenger = async (userId) => {
        console.log(userId)
        if(userId !== challenge.userId) {
            instance.delete(`/api/challenger/${challengeId}`, {...option, params: {"userId": userId}});
            await queryClient.refetchQueries(["getChallengers"]);
            alert("삭제완료!");
        } else {

        }
        getChallengers.refetch();
    };

    console.log(challenge)
    console.log(challengers)
    console.log("isOwner")
    console.log(isOwner())


    return (
        <div css={Layout}>
            <div css={HeaderLayout}>
                <div>
                    <b>[{challenge.categoryName}]</b>
                    {dateDifference !== null && (
                        <p>{dateDifference+1}일 중 {todayDifference+1}일차</p>
                    )}
                </div>
                {queryClient.data}
                <h1>{challenge.challengeName}</h1>
                <div>
                    <div css={Box}>
                        <div css={Writer}>작성자: <b>{challenge.name}</b> </div>
                        <div>
                            {!getLikeState.isLoading &&
                                <button css={SLikeButton(getLikeState?.data?.data)} disabled={!principal?.data?.data} onClick={handleLikebuttonClick}>
                                    <div>{isLike ? <AiTwotoneLike/> : <AiOutlineLike/>}</div>
                                    <div>{challenge.challengeLikeCount}</div>
                                </button>
                            }
                        </div>
                        <button css={DeleteButton} onClick={handleDeleteClick}>삭제</button>
                    </div>
                </div>
            </div>
            <div css={line}></div>
            <div css={BodyLayout}>
                <div css={BodyFeedLayout}>
                    챌린지별 피드 띄우기
                </div>
                <div css={BodyRightBox}>
                    <p>기간: {challenge.startDate} ~ {!challenge.endDate ? "마감 없음": challenge.endDate}</p>

                    <div css={textBox} dangerouslySetInnerHTML={{ __html: challenge.introduction}}></div>
                    <b>참여인원</b>
                    <button css={ParticipationButton} onClick={handleParticipationButton} disabled={button}>
                        {isJoined}
                    </button>

                    
                    <div css={ListBox}>
                        <b>참여인원</b>
                        {Object.values(challengers).map((item, index) => (
                            <div key={index} css={ListContainer}>
                                <p>{item.nickname}</p>
                                {(item.userId !== challenge.userId && isOwner(principal.data.data.userId, challenge.userId))  && <button css={DeleteChallengerButton} onClick={() => handleDeleteChallenger(item.userId)}>삭제</button>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChallengeDetails;