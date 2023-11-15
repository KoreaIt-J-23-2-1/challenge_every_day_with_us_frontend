import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';

function Feed(props) {
    const principalState = useQueryClient().getQueryState("getPrincipal");
    const principal = principalState.data.data;
    const [ isChallengeFeedRefetch, setIsChallengeFeedRefetch ] = useState(false);
    const [ feedList, setFeedList ] = useState([]);
    const [ page, setPage ] = useState(1);
    const lastChallengeRef = useRef();
    const [ commentInputList, setCommentInputList ] = useState();
    const [ latestComments, setLatestComments ] = useState({});
    
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

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    const getFeedList = useQuery(["getFeedList"], async () => {
        return await instance.get(`/api/challenge/certification/feed/${page}`, option);
    }, {
        refetchOnWindowFocus: false,
        enabled: isChallengeFeedRefetch,
        onSuccess: (response) => {
            setFeedList([...feedList].concat(response.data));
            setIsChallengeFeedRefetch(false);
            setPage(page + 1);
        }
    });
    

    const handleReportClick = async (feedId, feedChallengeId) => {
        const data = {
            feedId: feedId,
            challengeId: feedChallengeId,
            content: `${feedId}번의 피드의 신고가 들어왔으니 확인바랍니다.`
        };
        await instance.post("/api/challenge/report", data, option)
    }

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
            console.log(commentInputList[`commentInput${feedId}`]);
        }catch(error) {
            console.error(error);
        }
    };

    const getLatestComment = (feedId) => {
        instance.get(`/api/feed/${feedId}/comment/latest`, option)
        .then((response) => {
            setLatestComments({
                ...latestComments,
                [feedId]: response.data
            });
        })
    }

    return (
        <div css={S.SLayout}>
            <div css={S.SHeaderLayout}>
                <div>피드</div>
                <div>이미지드갈예정</div>
                <button>활동</button>
            </div>
            <div css={S.SAlignment}>
                <button>인기</button>
                <button>실시간</button>
            </div>
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

                            {principalState && 
                                <div css={S.SFeedBottomLayout}>
                                    <div css={S.SFeedBottomHeader}>
                                        <button>좋아요</button>
                                        <button onClick={async () => {const result = await instance.get(`/api/feed/${feed.feedId}/comments`, option); console.log(result)}}>댓글 펼치기</button>
                                    </div>
                                    <div css={S.SFeedBottomBody}>
                                        <div css={S.SFeedBottomProfileImgContainer}>
                                            <input css={S.SFeedBottomProfileImg} type="image" src={principal.profileUrl}/>
                                        </div>
                                        <p>{principal.nickname}</p>
                                        <div><input type="text" name={`commentInput${feed.feedId}`} onChange={handleCommentInput}/><button onClick={() => {handleCommentSubmit(feed.feedId)}}>댓글달기</button></div>
                                    </div>
                                    <div css={S.SFeedBottomFooter}>
                                        {
                                            (() => {
                                                getLatestComment(feed.feedId);
                                                return latestComments[feed.feedId] ? (
                                                    <>
                                                        <div>번호: {latestComments[feed.feedId]?.commentId}</div>
                                                        <div>작성자: {latestComments[feed.feedId]?.userNickname}</div>
                                                        <div>내용: {latestComments[feed.feedId]?.commentContent}</div>
                                                        <div>작성 시각: {latestComments[feed.feedId]?.commentDatetime}</div>
                                                    </>
                                                ) : 
                                                <div>
                                                    댓글이 없습니다.
                                                </div>;
                                            })()
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                ))}
                <div ref={lastChallengeRef}></div>
        </div>
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