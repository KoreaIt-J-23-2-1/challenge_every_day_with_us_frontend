import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';

function Feed(props) {
    const principalState = useQueryClient().getQueryState("getPrincipal");
    const [ isChallengeFeedRefetch, setIsChallengeFeedRefetch ] = useState(false);
    const [ feedList, setFeedList ] = useState([]);
    const [ page, setPage ] = useState(1);
    const lastChallengeRef = useRef();
    
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
                                <div><p>{principalState.data.data.nickname}</p>댓글</div>
                            </div>
                        </div>
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

function convertSecondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${hours > 0 ? hours + '시간 ' : ''}${minutes > 0 ? minutes + '분 ' : ''}${remainingSeconds}초`;
    return formattedTime.trim();
}