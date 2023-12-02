import React, { useState } from 'react';
import * as S from './FeedCommentListStyle';
import { useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { css } from '@emotion/react';
import { showAlert } from '../../styles/common';
/** @jsxImportSource @emotion/react */

function FeedCommentList({ feed, comments }) {
    const queryClient = useQueryClient();
    const principalState = useQueryClient().getQueryState("getPrincipal");
    const principal = principalState?.data?.data;
    const [ isCommentModifiableList, setIsCommentModifiableList ] = useState({});
    const [ commentModifyInputList, setCommentModifyInputList ] = useState({});
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    };

    const handleModifyCommentSubmit = async (feedId, commentId) => {
        try {
            await instance.put(`/api/feed/${feedId}/comment/${commentId}`, { commentContent: commentModifyInputList[`commentModifyInput${commentId}`] }, option);
            queryClient.refetchQueries(["getFeedList"]);
            setIsCommentModifiableList({
                ...isCommentModifiableList,
                [commentId]: 0
            });
            showAlert("댓글이 수정되었습니다.", "success");

        } catch (error) {
            console.error(error);
            showAlert("댓글 수정 실패", "error");
        }
    };

    const handleCommentModifyInput = (e) => {
        setCommentModifyInputList({
            ...commentModifyInputList,
            [e.target.name]: e.target.value
        });
    };

    const handleDeleteCommentButtonClick = async (feedId, commentId) => {
        instance.delete(`/api/feed/${feedId}/comment/${commentId}`, option)
            .then((response) => {
                showAlert("댓글 삭제 성공", "success");
                queryClient.refetchQueries(["getFeedList"]);

            }).catch((error) => {
                console.error(error);
                showAlert("댓글 삭제 실패", "error");

            });
    };

    return comments[feed.feedId].length !== 0 ?
        <>
            {comments[feed.feedId].map((comment) => {
                return !isCommentModifiableList?.[comment.commentId] ?

                    <div css={S.SCommentContainer} key={comment.commentId}>
                        <div css={S.part1}>
                            <b css={S.CommentName}>{comment.userNickname}</b>
                            <div css={S.Comment}>{comment.commentContent}</div>
                        </div>
                        <div css={S.part2}>
                            <div css={S.CommentTime}>{comment.commentDatetime}</div>
                            {/* comment 쿼리문에서 enabled를 principal이 없을때는 동작하지 않도록 설정해두면 좋을듯! */}
                            {principal && comment.userId === principal.userId &&
                                <div>
                                    <button css={S.FixBtn} onClick={() => { handleDeleteCommentButtonClick(feed.feedId, comment.commentId) }}>삭제</button>
                                    <button css={S.FixBtn} onClick={() => {
                                        setIsCommentModifiableList({
                                            ...isCommentModifiableList,
                                            [comment.commentId]: 1
                                        });
                                        setCommentModifyInputList({
                                            ...commentModifyInputList,
                                            [`commentModifyInput${comment.commentId}`]: comment.commentContent
                                        });
                                    }}>수정</button>
                                </div>
                            }
                        </div>
                    </div> :
                    <div css={S.SCommentContainer} key={comment.commentId}>
                        <div  css={S.part1}>
                            <b css={S.CommentName}>{comment.userNickname}</b>
                            <input css={S.InputComment}  onChange={handleCommentModifyInput}
                                type="text" name={`commentModifyInput${comment.commentId}`}
                                defaultValue={comment.commentContent} value={commentModifyInputList?.[comment.commentId]} />
                        </div>
                        <div css={S.part2}> 
                            <div css={S.CommentTime}>{comment.commentDatetime}</div>
                            <div >
                                <button css={S.FixBtn} onClick={() => { handleModifyCommentSubmit(feed.feedId, comment.commentId) }}>수정 적용</button>
                                <button css={S.FixBtn} onClick={() => {
                                    setIsCommentModifiableList({
                                        ...isCommentModifiableList,
                                        [comment.commentId]: 0
                                    });
                                }}>수정 취소</button>
                            </div>
                        </div>
                    </div>
            })}
        </>
        :
        <div css={S.font}>
            아직 댓글이 없습니다.
        </div>
};

export default FeedCommentList;
