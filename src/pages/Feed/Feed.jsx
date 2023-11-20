import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import BaseLayout from '../../components/BaseLayout/BaseLayout';

function Feed(props) {
    const principalState = useQueryClient().getQueryState("getPrincipal");
    const principal = principalState?.data?.data;
    const [ isChallengeFeedRefetch, setIsChallengeFeedRefetch ] = useState(false);
    const [ feedList, setFeedList ] = useState([]);
    const [ page, setPage ] = useState(1);
    const lastChallengeRef = useRef();
    const [ isLikeList, setIsLikeList ] = useState({});
    const [ commentInputList, setCommentInputList ] = useState();
    const [ commentModifyInputList, setCommentModifyInputList ] = useState();
    const [ commentShowMode, setCommentShowMode ] = useState({});
    const [ latestComments, setLatestComments ] = useState({});
    const [ comments, setComments ] = useState({});
    const [ sort, setSort ] = useState('latest');
    const [ isCommentModifiableList, setIsCommentModifiableList ] = useState({});

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
            },
            ...option
        });
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: isChallengeFeedRefetch,
        onSuccess: (response) => {
            setFeedList(response.data);
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

    const commentListComponent = (feed) => {
        return comments[feed.feedId].length !== 0 ? 
            <>
                {comments[feed.feedId].map((comment) => {
                    return !isCommentModifiableList?.[comment.commentId] ?
                    <div css={S.SCommentContainer} key={comment.commentId}>
                        <b>{comment.userNickname}</b>
                        <div>{comment.commentContent}</div>
                        <div>{comment.commentDatetime}</div>
                        {comment.userId === principal.userId && 
                            <div>
                                <button onClick={() => {handleDeleteCommentButtonClick(feed.feedId, comment.commentId)}}>삭제</button>
                                <button onClick={() => {
                                    setIsCommentModifiableList({
                                        ...isCommentModifiableList,
                                        [comment.commentId]: 1});
                                    setCommentModifyInputList({
                                        ...commentModifyInputList,
                                        [`commentModifyInput${comment.commentId}`]: comment.commentContent
                                    })
                                }}>수정</button>
                            </div>
                        }
                    </div> :
                    <div css={S.SCommentContainer} key={comment.commentId}>
                        <b>{comment.userNickname}</b>
                        <input type="text" name={`commentModifyInput${comment.commentId}`} defaultValue={comment.commentContent} value={commentModifyInputList?.[comment.commentId]} onChange={handleCommentModifyInput}/>
                        <div>{comment.commentDatetime}</div>
                        <div>
                            <button onClick={() => {handleModifyCommentSubmit(feed.feedId, comment.commentId)}}>수정 적용</button>
                            <button onClick={() => {
                                setIsCommentModifiableList({
                                    ...isCommentModifiableList,
                                    [comment.commentId]: 0})
                            }}>수정 취소</button>
                        </div>
                    </div>
                })}
            </>
            :
            <div>
                아직 댓글이 없습니다.
            </div>
    };

    const latestCommentComponent = (feed) => {
        return (
            latestComments[feed.feedId] ? (
                <div css={S.SCommentContainer} key={latestComments[feed.feedId]?.commentId}>
                    <b>{latestComments[feed.feedId]?.userNickname}</b>
                    <div>{latestComments[feed.feedId]?.commentContent}</div>
                    <div>{latestComments[feed.feedId]?.commentDatetime}</div>
                </div>
            ) : 
            <div>
                아직 댓글이 없습니다.
            </div>
        )
    };

    const handleDeleteCommentButtonClick = async (feedId, commentId) => {
        instance.delete(`/api/feed/${feedId}/comment/${commentId}`, option)
        .then((response) => {
            alert("댓글 삭제 성공");
            getFeedList.refetch();

        }).catch((error) => {
            console.error(error);
            alert("댓글 삭제 실패");

        });
    };
    
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
    
    const handleCommentModifyInput = (e) => {
        setCommentModifyInputList({
            ...commentModifyInputList,
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

    const handleModifyCommentSubmit = async (feedId, commentId) => {
        try {
            await instance.put(`/api/feed/${feedId}/comment/${commentId}`, {commentContent: commentModifyInputList[`commentModifyInput${commentId}`]}, option);
            getFeedList.refetch();
            setIsCommentModifiableList({
            ...isCommentModifiableList,
            [commentId]: 0});
            alert("댓글이 수정되었습니다.");

        }catch(error) {
            console.error(error);
            alert("댓글 수정 실패");
        }
    }

    const handleCheckboxChange = async (event) => {
        setSort(event.target.value);
        setPage(1);
    };

    return (
        <BaseLayout>
            <div css={S.SLayout}>
                <div css={S.SHeaderLayout}>
                    <div>피드</div>
                    <div>이미지드갈예정</div>
                    <button>활동</button>
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
                                <div css={S.SFeedHeader}>
                                    <div>
                                        <img src={feed.profileUrl} alt="" />
                                        <b>{feed.nickname}</b>
                                    </div>
                                    <button onClick={() => {handleReportClick(feed.feedId, feed.challengeId)}}>신고</button>
                                </div>
                                <div css={S.SFeedBody}>
                                    <div>
                                        <p>[{feed.categoryName}]</p>
                                        <div><b>{feed.challengeName}</b> Challenge</div>
                                    </div>
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
                                            <div>좋아요 {feed.likeCount}개</div>
                                            {principal &&
                                                <div onClick={() => {handleLikebuttonClick(feed.feedId);}}>
                                                    {
                                                        isLikeList?.[feed.feedId] === 1 ? <AiTwotoneLike/> : <AiOutlineLike/>
                                                    }
                                                </div>
                                            }
                                            {commentShowMode[feed.feedId] ? 
                                                <button onClick={() => {setCommentShowMode({...commentShowMode, [feed.feedId]: false})}}>댓글 접기</button>
                                                : <button onClick={() => {setCommentShowMode({...commentShowMode, [feed.feedId]: true})}}>댓글 펼치기</button>
                                            }
                                        </div>
                                        {principal && 
                                            <div css={S.SFeedBottomBody}>
                                                <div css={S.SFeedBottomProfileImgContainer}>
                                                    <input css={S.SFeedBottomProfileImg} type="image" src={principal.profileUrl}/>
                                                </div>
                                                <p>
                                                    {principal.nickname}
                                                </p>
                                                <div>
                                                    <input type="text" name={`commentInput${feed.feedId}`} onChange={handleCommentInput}/>
                                                    <button onClick={() => {handleCommentSubmit(feed.feedId)}}>댓글달기</button>
                                                </div>
                                            </div>
                                        }
                                        <div css={S.SFeedBottomFooter}>
                                            {
                                                commentShowMode[feed.feedId] ? commentListComponent(feed) : latestCommentComponent(feed)
                                            }                                  
                                        </div>
                                    </div>
                            </div>
                        </div>
                    ))}
                    <div ref={lastChallengeRef}></div>
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