import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ImgBox = css`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #dbdbdb;
`;

function MyPageDetails(props) {
    const navegate = useNavigate();

    const handleCancelClick = () => {
        navegate("/account/mypage");
    }

    const handleIsWithdrawn = () => {
        if(window.confirm("정말 탈퇴하시겠습니까?")) {
            if(window.confirm("진짜로 떠나시겠습니까?")) {
                // delete 요청날림
            }
        }
    }

    return (
        <div css={Layout}>
            <div>
                <div css={ImgBox}>
                    <img src="" alt="" />
                </div>
                <div>
                    <input type="text" placeholder='이름'/>
                </div>
                <div>
                    <input type="text" placeholder='변경 비밀번호'/>
                </div>
                <div>
                    <input type="text" placeholder='비밀번호 재입력'/>
                </div>
                <div>
                    <input type="text" placeholder='닉네임'/>
                </div>
                <div>
                    <input type="text" placeholder='이메일'/>
                </div>
                <div>
                    <input type="text" placeholder='전화번호'/>
                </div>
                <button>정보변경</button>
                <button onClick={handleCancelClick}>취소</button>
                <button onClick={handleIsWithdrawn}>회원탈퇴</button>
            </div>
        </div>
    );
}

export default MyPageDetails;