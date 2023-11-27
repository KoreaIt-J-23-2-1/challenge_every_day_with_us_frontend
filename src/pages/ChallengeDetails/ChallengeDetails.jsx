import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */
import * as S from './ChallengeDetailsStyle';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { FcLike } from "react-icons/fc";
import { IoIosHeartEmpty } from "react-icons/io";
import { SiApachespark } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import ProgressBar from '@ramonak/react-progress-bar';
import FeedCommentList from '../../components/FeedCommentList/FeedCommentList';
import FeedCommentSee from '../../components/FeedCommentSee/FeedCommentSee';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import FeedEditModal from '../../components/FeedEditModal/FeedEditModal';

function ChallengeDetails(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState("getPrincipal");
    const [ isLike, setIsLike ] = useState(false);
    const [ isFeedLike, setIsFeedLike ] = useState(false);
    const { challengeId } = useParams();
    const [ commentShowMode, setCommentShowMode ] = useState({});
    const [ comments, setComments ] = useState({});
    const [ latestComments, setLatestComments ] = useState({});
    const [ commentInputList, setCommentInputList ] = useState();
    const [ isLikeList, setIsLikeList ] = useState({});
    const [ challenge, setChallenge ] = useState({});
    const [ challengers, setChallengers ] = useState({});
    const [ dateDifference, setDateDifference ] = useState(null);
    const [ todayDifference, setTodayDifference ] = useState(null);
    const [ isJoined, setIsJoined ] = useState("");
    const [ button, setButton ] = useState(false);
    const [ isChallengeFeedRefetch, setIsChallengeFeedRefetch ] = useState(false);
    const [ feedList, setFeedList ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ feedProgress, setFeedProgress ] = useState(0);
    const lastChallengeRef = useRef();
    const [ selectedFeed, setSelectedFeed ] = useState(0);
    const [ isModalOpen, setModalOpen ] = useState(false);
    const userId = principal.data.data.userId;
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

            const response = await instance.get(`/api/challenge/${challengeId}`, option);
            const challenge = response.data;

            if (challenge.isDeadline === 1) {
                setIsJoined("종료된 챌린지");
                setButton(true);
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

    console.log(challenge);


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
        const response = instance.get(`/api/challenge/${challengeId}/userlike?userId=${userId}`, option);
        response.then((response) => {
            setIsLike(response.data)
        });
    }, [])

    useEffect(() => {
        feedList.forEach(feed => {
            getLatestComment(feed);
            getComments(feed);
            getLikeStates(feed);
        })
    }, [feedList]);

    const getLatestComment = (feed) => {
        instance.get(`/api/feed/${feed.feedId}/comment/latest`, option)
        .then((response) => {
            setLatestComments((latestComments) => ({
                ...latestComments,
                [feed.feedId]: response.data
            }));
        })
    };

    const getComments = async (feed) => {
        const response = await instance.get(`/api/feed/${feed.feedId}/comments`, option);
        setComments((comment) => ({
            ...comment,
            [feed.feedId]: response.data
        }));
    };

    const getLikeStates = async (feed) => {
        const response = await instance.get(`/api/feed/${feed.feedId}/like`, option);
        setIsLikeList((isLikeList) => ({
            ...isLikeList,
            [feed.feedId]: response.data
        }));
    };

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
        const todayDifference = Math.floor(todayTimeDifference / (1000 * 60 * 60 * 24)) + 1;

        setDateDifference(dayDifference);
        setTodayDifference(todayDifference)
    }, [challenge.startDate, challenge.endDate]);

    const handleLikebuttonClick = async () => {
        const result = {
            userId: userId
        }

        try {
            if (isLike) {
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

    const getFeedLikeState = useQuery(["getFeedLikeState"], async (feed) => {
        try {
            return await instance.get(`/api/feed/${challengeId}/like`, option);
        }catch(error) {
            console.erroe(error);
        }
    }, {
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: (response) => {
            setIsFeedLike(response);
        }
    })

    const getProgress = useQuery(["getProgress"], async () => {
        try{
            return await instance.get(`/api/challenge/${challengeId}/progress`)
        }catch(error) {

        }
    }, {
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: (response) => {
            setFeedProgress(response.data)
        }
    })

    const handleFeedLikebuttonClick = async (feedId) => {
        const userId = principal.userId;
        try {
            const isLike = isLikeList[feedId];
            let newState = null;

            if (isLike === 1) {
                await instance.delete(`/api/feed/${feedId}/like`, option);
                newState = 0;
            } else {
                await instance.post(`/api/feed/${feedId}/like`, {}, option);
                newState = 1;
            }
            setFeedList(prevFeedList => {
                return prevFeedList.map(feed => {
                    if (feed.feedId === feedId) {
                        return {
                            ...feed,
                            likeCount: newState === 1 ? feed.likeCount + 1 : feed.likeCount - 1,
                        };
                    }
                    return feed;
                });
            });
            setIsLikeList((prevIsLikeList) => ({
                ...prevIsLikeList,
                [feedId]: newState
            }));
        } catch (error) {
            console.error(error);
        }
    };


    const handleDeleteClick = async () => {
        /* eslint-disable no-restricted-globals */ 
        const userConfirmed = window.confirm("정말로 삭제하시겠습니까?");

        if (userConfirmed) {
            if (principal.data.data.name === challenge.name) {
                await instance.delete(`/api/challenge/${challengeId}`, option);
                alert("삭제완료!");
                navigate("/");
            } else {
                alert("작성자만 삭제할 수 있습니다.");
            }
            getLikeState.refetch();
            getChallenge.refetch();
        } else {
            console.log("삭제가 취소되었습니다.");
        }
    };    


    const requestData = {
        senderUserId: principal.data.data.userId,
        receiverUserId: challenge.userId,
        letterTitle: "챌린지 승인 요청",
        title: "챌린지 승인 요청",
        content: `${challenge.challengeName} 챌린지의 승인 요청이 들어왔습니다.`,
        targetUrl: "http://localhost:3000/challenge/1",
        targetId: challenge.challengeId
    };
    
    const handleParticipationButton = async () => {
        if(isJoined === "챌린지 인증하기") {
            navigate(`/challenge/certification/${challengeId}`)
        }else if(isJoined === "대기중") {
            setButton(true);
        }else {
            if(challenge.isApplicable === "0"){
                const response = await instance.post(`/api/challenge/join/${challengeId}`, {}, option);
                if(response) {
                    alert("챌린지 참여가 가능합니다!")
                }
            }else {
                const response = await instance.post(`/api/challenge/join/${challengeId}`, {}, option);
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

    const handleGoUp = () => {
        window.location.reload();
    }

    const progress = ((feedProgress / (dateDifference + 1)) * 100).toFixed(0);

    const handleCommentInput = (e) => {
        setCommentInputList({
            ...commentInputList,
            [e.target.name]: e.target.value
        })
    };

    const handleCommentSubmit = async (feedId) => {
        try {
            await instance.post(`/api/feed/${feedId}/comment`, {commentContent: commentInputList[`commentInput${feedId}`]}, option);
            alert("댓글 등록 성공! -> " + feedId + "피드");
            getFeedList.refetch();
            setCommentInputList({
                ...commentInputList,
                [`commentInput${feedId}`]: ''
            });
            
        }catch(error) {
            console.error(error);
        }
    };

    const handleFeedEditClick = (feedId) => {
        setSelectedFeed(feedId);
        setModalOpen(true);
    };

    const handleFeedDeleteClick = async (feedId) => {
        try {
            const confirmed = window.confirm("피드를 삭제 시키겠습니까?")
            
            if (confirmed) {
                await instance.delete(`/api/challenge/feed/${feedId}`, option);
                alert("피드가 삭제되었습니다.");
                getFeedList.refetch({ force: true });
            }
        }catch(error) {
            console.error(error);
        }
    };

    const handleReportClick = async (feedId, feedChallengeId) => {
        const data = {
            feedId: feedId,
            title: "신고가 들어왔습니다.",
            challengeId: feedChallengeId,
            content: `${feedId}번의 피드의 신고가 들어왔으니 확인바랍니다.`,
            targetUrl:`http://localhost:3000/challenge/${feedChallengeId}`
        };
        const response = await instance.post("/api/challenge/report", data, option)
            if(response) {
                alert(`${feedId}번의 피드를 신고하였습니다.`);
            }
    };

    const handleFeedEditCloseModal = () => {
        setSelectedFeed(null);
        setModalOpen(false);
        window.location.reload()
        
    };

    return (
        <BaseLayout>
            <div css={S.Layout}>
                {/* 헤더 */}
                <div css={S.HeaderLayout}>
                    <div>
                        <div>[{challenge.categoryName}]</div>
                        {dateDifference !== null && (
                            <div>{dateDifference+1}일 중 <b css={S.Pointfont}>{todayDifference+1}일차 <SiApachespark /></b></div>
                        )}
                    </div>
                    {queryClient.data}
                    <div css={S.ChallTitle} onClick={handleGoUp}>
                        <a><FaStar/></a>{challenge.challengeName}<a><FaStar/></a>
                    </div>

                    <div>
                        <div css={S.Box}>
                            <div css={S.Writer}>작성자: <b>{challenge.nickname}</b> </div>
                            <div>
                                {!getFeedLikeState.isLoading &&
                                    <button css={S.SLikeButton} disabled={!principal?.data?.data} onClick={handleLikebuttonClick}>
                                        <div>{isLike ? <FcLike/> : <IoIosHeartEmpty/>}</div>
                                        <div>{challenge.challengeLikeCount}</div>
                                    </button>
                                }
                            </div>
                            <button css={S.DeleteButton} onClick={handleDeleteClick}>삭제</button>
                        </div>
                    </div>
                </div>

                <div css={S.BodyLayout}>
                    {/* 왼쪽  */}
                    <div css={S.FeedContainer}>
                        {feedList.map(feed => (
                            <div key={feed.feedId} css={S.FeedBox}>

                                <div css={S.FeedHeader}>
                                    <div css={S.userInfo}>
                                        <div>
                                            <img css={S.InfoImg} src={feed.profileUrl} alt="" />
                                            <b>{feed.nickname}</b>
                                        </div>
                                    </div>
                                    <div  css={S.ChInfo}>
                                        {userId === feed.userId ?
                                            <div>
                                                <button css={S.Btn} onClick={() => {handleFeedEditClick(feed.feedId)}}>수정</button>
                                                <button css={S.Btn} onClick={() => {handleFeedDeleteClick(feed.feedId)}}>삭제</button>
                                            </div>
                                        :
                                            <div>
                                                {(userId === 1 || userId === 2 || userId === getChallenge.challengeId) && 
                                                <button css={S.Btn} onClick={() => {handleFeedDeleteClick(feed.feedId)}}>삭제</button>}
                                                <button css={S.Btn} onClick={() => {handleReportClick(feed.feedId, feed.challengeId)}}>신고</button>
                                            </div>
                                        }
                                        <div>
                                            <p>[{feed.categoryName}]</p>
                                            <b>{feed.challengeName}</b>
                                        </div>
                                        <div>
                                            {feed.stopWatch !== 0 ? (
                                                <div>진행 시간 : {convertSecondsToTime(feed.stopWatch)}</div>
                                            ) : (null)}
                                        </div>
                                    </div>
                                </div>

                                <div css={S.SFeedBody}>
                                    {feed.img && <img css={S.FeedImg} src={feed.img} alt="" />}
                                    <div css={S.FeedContentBox(!!feed.img)} imgexists={(!!feed.img).toString()}>
                                        <a><b>{feed.feedId}번 Feed</b>{getTimeDifference(feed.dateTime)}</a>
                                        <div css={S.FeedContent}>{feed.feedContent}</div>
                                    </div>                                 
                                </div>


                                <div css={S.SFeedBottomLayout}>
                                    <div css={S.SFeedBottomHeader}>
                                        
                                        {commentShowMode[feed.feedId] ? 
                                            <button css={S.Btn}  onClick={() => {setCommentShowMode({...commentShowMode, [feed.feedId]: false})}}>댓글 접기</button>
                                            : <button css={S.Btn} onClick={() => {setCommentShowMode({...commentShowMode, [feed.feedId]: true})}}>댓글 더보기</button>
                                        }
                                        
                                        <b css={S.FeedLikeBtn}>
                                            좋아요 {feed.likeCount}개
                                            {principal &&
                                                <div onClick={() => {handleFeedLikebuttonClick(feed.feedId);}}>
                                                    {
                                                        isLikeList?.[feed.feedId] === 1 ? <FcLike/> : <IoIosHeartEmpty/>
                                                    }
                                                </div>
                                            }
                                    
                                        </b>
                                    </div>


                                    {principal && 
                                        <div css={S.SFeedBottomBody}>
                                            <div css={S.WriteCommentBox}>
                                                <input css={S.CommentInputBox} value={commentInputList?.[`commentInput${feed.feedId}`]} type="text" name={`commentInput${feed.feedId}`} onChange={handleCommentInput} onKeyDown={(e) => {if(e.keyCode === 13) {handleCommentSubmit(feed.feedId);}}}/>
                                                <button css={S.Btn} onClick={() => {handleCommentSubmit(feed.feedId)}}>댓글달기</button>
                                            </div>

                                        </div>
                                    }
                                    
                                    <div css={S.CommentBox}>
                                        {
                                            commentShowMode[feed.feedId] ? 
                                            <FeedCommentList feed={feed} comments={comments}/>
                                            : <FeedCommentSee feed={feed} latestComments={latestComments}/>
                                        }
                                    </div>
                                </div>

                                
                            </div>
                        ))}
                        <div ref={lastChallengeRef}></div>

                    </div>

                    {/* 오른쪽 */}
                    <div css={S.BodyRightBox}>
                        <p>기간: {challenge.startDate} ~ {!challenge.endDate ? "마감 없음": challenge.endDate}</p>
                        
                        <button css={S.ParticipationButton} onClick={handleParticipationButton} disabled={button}>
                            {isJoined}
                        </button>
                        <div css={S.ChallInfoBox} dangerouslySetInnerHTML={{ __html: challenge.introduction}}></div>

                        <b> <a css={S.Pointfont}> {challenge.challengeName} </a> 진행율 {progress}%</b>
                        <div css={S.ProgressBarBox}>
                            <ProgressBar css={S.ProgressBar} completed={progress} bgColor='lightpink' height='15px' labelSize='12px' baseBgColor='#eee'/>
                        </div>                        

                        <b>참여인원</b>
                        <div css={S.ListBox}>
                            {Object.values(challengers).map((item, index) => (
                                <div key={index} css={S.ListContainer}>
                                    <div css={S.ImgBox}>
                                        <img src={item.profileUrl} alt="" />
                                    </div>
                                    <a>{item.nickname}</a>

                                    {(item.userId !== challenge.userId &&
                                        isOwner(principal.data.data.userId, challenge.userId)) &&
                                        <button css={S.DeleteChallengerButton}
                                            onClick={() => handleDeleteChallenger(item.userId)}>
                                            삭제</button>}
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                    {isModalOpen && (
                        <div css={S.ModalOverlay}>
                            <div css={S.ModalContent}>
                                <FeedEditModal onClose={handleFeedEditCloseModal} feedDetail={selectedFeed} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </BaseLayout>

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