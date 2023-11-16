import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../api/config/instance';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

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
    const [ isChallengeFeedRefetch, setIsChallengeFeedRefetch ] = useState(false);
    const [ feedList, setFeedList ] = useState([]);
    const [ page, setPage ] = useState(1);
    const lastChallengeRef = useRef();

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

    const getFeedList = useQuery(["getFeedList"], async () => {
        return await instance.get(`/api/challenge/certification/feed/${page}/${challengeId}`, option);
    }, {
        refetchOnWindowFocus: false,
        enabled: isChallengeFeedRefetch,
        onSuccess: (response) => {
            setFeedList([...feedList].concat(response.data));
            setIsChallengeFeedRefetch(false);
            setPage(page + 1);
        }
    });

    useEffect(() => {
        const observerService = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setIsChallengeFeedRefetch(true);
                }
            });
        }

        const observer = new IntersectionObserver(observerService, {threshold: 1});
        observer.observe(lastChallengeRef.current);
    }, []);

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

    const handleLikebuttonClick = async () => {
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
        targetUrl: "http://localhost:3000/challenge/1"
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
        if(userId !== challenge.userId) {
            instance.delete(`/api/challenger/${challengeId}`, {
                ...option,
                params: {"userId": userId}
            });
            await queryClient.refetchQueries(["getChallengers"]);
            alert("삭제완료!");
        } else {

        }
        getChallengers.refetch();
    };

    return (
        <div css={S.Layout}>
            <div css={S.HeaderLayout}>
                <div>
                    <b>[{challenge.categoryName}]</b>
                    {dateDifference !== null && (
                        <p>{dateDifference+1}일 중 {todayDifference+1}일차</p>
                    )}
                </div>
                {queryClient.data}
                <h1>{challenge.challengeName}</h1>
                <div>
                    <div css={S.Box}>
                        <div css={S.Writer}>작성자: <b>{challenge.name}</b> </div>
                        <div>
                            {!getLikeState.isLoading &&
                                <button css={S.SLikeButton(getLikeState?.data?.data)} disabled={!principal?.data?.data} onClick={handleLikebuttonClick}>
                                    <div>{isLike ? <AiTwotoneLike/> : <AiOutlineLike/>}</div>
                                    <div>{challenge.challengeLikeCount}</div>
                                </button>
                            }
                        </div>
                        <button css={S.DeleteButton} onClick={handleDeleteClick}>삭제</button>
                    </div>
                </div>
            </div>
            <div css={S.line}></div>
            <div css={S.BodyLayout}>
                <div css={S.BodyFeedLayout}>
                    <div css={S.SLayout}>
                        {feedList.map(feed => (
                            <div key={feed.feedId} css={S.SFeedContainer}>
                                <div css={S.SFeedLayout}>
                                    <div css={S.SFeedHeader}>
                                        <div>
                                            <img src={feed.profileUrl} alt="" />
                                            <b>{feed.nickname}</b>
                                        </div>
                                    </div>
                                    <div css={S.SFeedBody}>
                                        <div>
                                            <p>[{feed.categoryName}]</p>
                                            <div><b>{feed.challengeName}</b> Challenge</div>
                                        </div>
                                        {feed.stopWatch !== 0 ? (
                                            <div>{convertSecondsToTime(feed.stopWatch)}</div>
                                        ) : (null)}
                                        <img src={feed.img} alt="" />
                                    </div>
                                    <div css={S.SText}>
                                        <div>{feed.feedContent}</div>
                                    </div>
                                    <div css={S.SInfo}>
                                        <p>{getTimeDifference(feed.dateTime)}</p>
                                    </div>
                                <div css={S.SFeedBottomLayout}>
                                    <div css={S.SFeedBottomHeader}>
                                        <b>좋아요</b>
                                        <b>댓글</b>
                                    </div>
                                    <div css={S.SFeedBottomBody}>
                                        <div>이미지</div>
                                        <div><p>{principal.data.data.nickname}</p>댓글</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        ))}
                    <div ref={lastChallengeRef}></div>
                    </div>
                </div>
                <div css={S.BodyRightBox}>
                    <p>기간: {challenge.startDate} ~ {!challenge.endDate ? "마감 없음": challenge.endDate}</p>
                    <div css={S.textBox} dangerouslySetInnerHTML={{ __html: challenge.introduction}}></div>
                    <b>참여인원</b>
                    <button css={S.ParticipationButton} onClick={handleParticipationButton} disabled={button}>
                        {isJoined}
                    </button>
                    <div css={S.ListBox}>
                        <b>참여인원</b>
                        {Object.values(challengers).map((item, index) => (
                            <div key={index} css={S.ListContainer}>
                                <p>{item.nickname}</p>
                                {(item.userId !== challenge.userId && isOwner(principal.data.data.userId, challenge.userId))  && <button css={S.DeleteChallengerButton} onClick={() => handleDeleteChallenger(item.userId)}>삭제</button>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChallengeDetails;

function getTimeDifference(feedDateTime) {
    const currentDateTime = new Date();
    const feedDate = new Date(feedDateTime);

    const timeDifferenceInSeconds = Math.floor((currentDateTime - feedDate) / 1000);

    if (timeDifferenceInSeconds < 60) {
        return `${timeDifferenceInSeconds}초 전`;
    } else if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutes}분 전`;
    } else if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hours}시간 전`;
    } else {
        const days = Math.floor(timeDifferenceInSeconds / 86400);
        return `${days}일 전`;
    }
}

function convertSecondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${hours > 0 ? hours + '시간 ' : ''}${minutes > 0 ? minutes + '분 ' : ''}${remainingSeconds}초`;
    return formattedTime.trim();
}