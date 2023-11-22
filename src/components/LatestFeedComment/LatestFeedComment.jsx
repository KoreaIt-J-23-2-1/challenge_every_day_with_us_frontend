import React from 'react';
import * as S from './Style';

function LatestFeedComment({ feed, latestComments }) {

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
}

export default LatestFeedComment;