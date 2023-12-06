import React, { useEffect, useRef } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from "./FeedStyle";


function BestFeedModal({ onClose, getBestFeed}) {
    const modalRef = useRef();

    const handleCloseModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleCloseModal);
        return () => {
            document.removeEventListener('mousedown', handleCloseModal);
        };
    }, [handleCloseModal]);

    return (
        <div ref={modalRef} css={S.box02}>
            <div css={S.BestFeed}>
                <div css={S.FeedHeader}>
                    <div css={S.userInfo}>
                        <img css={S.InfoImg} src={getBestFeed?.data?.data?.profileUrl} alt="" />
                        <b>{getBestFeed?.data?.data?.nickname}</b>  
                    </div>
                    <div css={S.ChInfo}>
                        <div>
                            <p>[{getBestFeed?.data?.data?.categoryName}]</p>
                            <b>{getBestFeed?.data?.data?.challengeName}</b>
                        </div>
                    </div>
                </div>   
                <div css={S.FeedBody}>
                    {getBestFeed?.data?.data?.stopWatch !== 0 ? (
                        <div css={S.TimeBox}>
                            <b>진행 시간 : {convertSecondsToTime(getBestFeed?.data?.data?.stopWatch)}</b>
                            <a>{getTimeDifference(getBestFeed?.data?.data?.dateTime)}</a>
                        </div>
                    ) : (<a>{getTimeDifference(getBestFeed?.data?.data?.dateTime)}</a>)}
                    {getBestFeed?.data?.data?.img && <img css={S.SFeedImg} src={getBestFeed?.data?.data?.img} alt="" />}
                    <div css={S.SFeedContentBox(!!getBestFeed?.data?.data?.img)} imgexists={(!!getBestFeed?.data?.data?.img).toString()}></div>  
                    <div css={S.SFeedContent}>{getBestFeed?.data?.data?.feedContent}</div>
                </div>  
            </div>
        </div>
    );
}
    

export default BestFeedModal;

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