import React from 'react';
import * as S from './FeedCommentSeeStyle';
/** @jsxImportSource @emotion/react */

function LatestFeedComment({ feed, latestComments }) {

    return (
        latestComments[feed.feedId] ? (
            <div css={S.SCommentContainer} key={latestComments[feed.feedId]?.commentId}>
                <div css={S.part1}>
                    <b css={S.CommentName}>{latestComments[feed.feedId]?.userNickname}</b>
                    <div css={S.Comment}>{latestComments[feed.feedId]?.commentContent}</div>
                </div>
                <div css={S.part2}>
                    <div css={S.CommentTime}>{latestComments[feed.feedId]?.commentDatetime}</div>
                </div>
            </div>
        ) : 
        <div css={S.font}>
            아직 댓글이 없습니다.
        </div>
    )
}

export default LatestFeedComment;