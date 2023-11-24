import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './FeedStyle';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import FeedEditModal from '../../components/FeedEditModal/FeedEditModal';
import FeedCommentList from '../../components/FeedCommentList/FeedCommentList';
import LatestFeedComment from '../../components/LatestFeedComment/LatestFeedComment';
import { FcLike } from "react-icons/fc";
import { IoIosHeartEmpty } from "react-icons/io";

function Feed(props) {
    const { challengeId } = useParams();
    const navigate = useNavigate();
    const principalState = useQueryClient().getQueryState("getPrincipal");
    const principal = principalState?.data?.data;
    const [ isChallengeFeedRefetch, setIsChallengeFeedRefetch ] = useState(false);
    const [ feedList, setFeedList ] = useState([]);
    const [ page, setPage ] = useState(1);
    const lastChallengeRef = useRef();
    const [ isLikeList, setIsLikeList ] = useState({});
    const [ commentInputList, setCommentInputList ] = useState();
    const [ commentShowMode, setCommentShowMode ] = useState({});
    const [ latestComments, setLatestComments ] = useState({});
    const [ comments, setComments ] = useState({});
    const [ sort, setSort ] = useState('latest');
    const [ selectedFeed, setSelectedFeed ] = useState(0);
    const [ isModalOpen, setModalOpen ] = useState(false);

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

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    };

    const getFeedList = useQuery(["getFeedList"], async () => {
        return await instance.get(`/api/challenge/certification/feed/${page}`, {
            params: {
                sort: sort
            }
        });
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: isChallengeFeedRefetch,
        onSuccess: (response) => {
            setFeedList(feedList.concat(response.data));
            setIsChallengeFeedRefetch(false);
            setPage(page + 1);
        }
    });

    useEffect(() => {
        if(page === 1) {
            setFeedList([]);
            getFeedList.refetch();
        }
    }, [page]);

    useEffect(() => {
        setPage(1);
        setFeedList([]);
    }, [sort]);

    const handleReportClick = async (feedId, feedChallengeId) => {
        const data = {
            feedId: feedId,
            challengeId: feedChallengeId,
            content: `${feedId}번의 피드의 신고가 들어왔으니 확인바랍니다.`
        };
        await instance.post("/api/challenge/report", data, option)
    };

    const handleLikebuttonClick = async (feedId) => {
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
            
        }catch(error) {
            console.error(error);
        }
    };

    const handleCheckboxChange = async (event) => {
        setSort(event.target.value);
        setPage(1);
    };

    const handleFeedEditClick = (feedId) => {
        setSelectedFeed(feedId);
        setModalOpen(true);
    };

    const handleFeedEditCloseModal = () => {
        setSelectedFeed(null);
        setModalOpen(false);
        window.location.reload()
        
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

    return (
        <BaseLayout>
            <div css={S.SLayout}>

                <div css={S.SHeaderLayout}>
                    <b>서로의 도전을 응원해주세요 !</b>
                </div>

                <div css={S.SAlignment}>
                    <input type="radio" name="radioGroup" id="radio1" onChange={handleCheckboxChange} value="latest" defaultChecked={true}/>
                    <label htmlFor="radio1">최신순</label>
                    <input type="radio" name="radioGroup" id="radio2" onChange={handleCheckboxChange} value="oldest"/>
                    <label htmlFor="radio2">오래된순</label>
                    <input type="radio" name="radioGroup" id="radio3" onChange={handleCheckboxChange} value="popular"/>
                    <label htmlFor="radio3">인기순</label>
                </div>

                <div css={S.SScroll}>
                    {feedList.map(feed => (
                        <div key={feed.feedId} css={S.SFeedContainer}>
                            

                            <div css={S.SFeedLayout}>

                                <div css={S.FeedHeader}>
                                    <div css={S.userInfo}>
                                        <img css={S.InfoImg} src={feed.profileUrl} alt="" />
                                        <b>{feed.nickname}</b>  
                                    </div>
                                    <div css={S.ChInfo}>
                                        <div css={S.BtnBox}>
                                            <button css={S.Btn} onClick={() => {handleReportClick(feed.feedId, feed.challengeId)}}>신고</button>
                                            {principal.userId === feed.userId ?
                                                <div>
                                                    <button css={S.Btn} onClick={() => {handleFeedEditClick(feed.feedId)}}>수정</button>
                                                    <button css={S.Btn} onClick={() => {handleFeedDeleteClick(feed.feedId)}}>삭제</button>
                                                </div>
                                            :
                                            <></>
                                            }
                                        </div>
                                                                        
                                        <div>
                                            <p>[{feed.categoryName}]</p>
                                            <b>{feed.challengeName}</b>
                                        </div>
                                    </div>
                                </div>              
                                
                                <div css={S.SFeedBody}>
                                    {feed.img && <img css={S.FeedImg} src={feed.img} alt="" />}
                                    <div css={S.FeedContentBox(!!feed.img)} imgexists={(!!feed.img).toString()}>
                                        <a>{getTimeDifference(feed.dateTime)}</a>
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
                                                <div onClick={() => {handleLikebuttonClick(feed.feedId);}}>
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
                                                {/* <img src={principal.profileUrl}/> */}
                                                <b>{principal.nickname}</b>
                                                <input css={S.CommentInputBox} type="text" name={`commentInput${feed.feedId}`} onChange={handleCommentInput}/>
                                                <button css={S.Btn} onClick={() => {handleCommentSubmit(feed.feedId)}}>댓글달기</button>
                                            </div>
                                        </div>
                                    }

                                    <div css={S.CommentBox}>
                                        {
                                            commentShowMode[feed.feedId] ? 
                                            <FeedCommentList feed={feed} comments={comments}/>
                                            : <LatestFeedComment feed={feed} latestComments={latestComments}/>
                                        }
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={lastChallengeRef}></div>
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

export default Feed;

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