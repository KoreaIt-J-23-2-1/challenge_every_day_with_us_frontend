import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import { instance } from '../../api/config/instanse';
import { useQueryClient } from 'react-query';

const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ImgBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #dbdbdb;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;

    & img {
        max-width: 100%;
        max-height: 100%;
        width: 50px;
        height: 50px;
    }
`;


const UserBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const IntroBox = css`
    display: flex;
    flex-direction: column;
`;

const BtBox = css`
    display: flex;
    justify-content: center;
`;

const UserCheckBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    width: 300px;
    height: 300px;
    border: 5px solid #dbdbdb;
`;

const ProfileText = css`
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;

    & div {
        margin: 0px 10px;
        font-size: 20px;
        font-weight: 600;
    }
`;

const ProfileBox = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

function MyPage(props) {
    const navigete = useNavigate();
    const [ isModalOpen, setModalOpen ] = useState(false);
    const [ isStoreModalOpen, setIsStoreModalOpen ] = useState(false);
    const [ password, setPassword ] = useState();
    const [ intro, setIntro ] = useState("");
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;

    const openModal = () => {
    setModalOpen(true);
    };

    const closeModal = () => {
    setModalOpen(false);
    };

    const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    };

    const handleIntroChange = (e) => {
        setIntro(e.target.value);
        };

    const handleSubmit = () => {
        navigete("/account/mypage/detail")
    };

    const handleCancelClick = () => {
        closeModal();
    }


    const handleStoreCancelClick = () => {
        closeModal();
    };

    console.log(principal);

    const handleIntroSubmit = () => {
        const option = {
            params: {
                nickname: principal.nickname,
                intro: intro
            }
        }
        instance.get("/api/account/intro", option)
            .then(response => {
                const introData = response.data.intro;
                if (introData !== null) {
                    instance.put("/api/account/intro", {
                        nickname: principal.nickname,
                        intro: intro
                    });
                } else {
                    return instance.post("/api/account/intro", {
                        nickname: principal.nickname,
                        intro: intro
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
    <div css={Layout}>
        <div css={UserBox}>
            <div css={ImgBox}>
                <img src={principal.profileUrl} alt="" />
            </div>
            <div css={ProfileBox}>
                <p css={ProfileText}>등급: 
                    <div>{principal.membership}</div>
                </p>
                <p css={ProfileText}>포인트: 
                    <div>
                        {principal.point}
                    </div>
                    point
                </p>
                <p css={ProfileText}>닉네임: 
                    <div>
                        {principal.nickname}
                    </div>
                </p>
            </div>
            <div css={IntroBox}>
                <h4>자기 소개</h4>
                <textarea id="introText" rows="3" cols="40" maxLength={50} defaultValue={principal.intro} onChange={handleIntroChange}></textarea>
                <button onClick={handleIntroSubmit}>저장</button>
                <button>취소</button>
            </div>
        </div>
        <div>
            <p>참여중인 챌린지List </p>
        </div>
        <div css={BtBox}>
            <button>상점</button>
            <button onClick={openModal}>정보변경</button>
        </div>
        {isModalOpen && (
            <div css={UserCheckBox}>
                <h4>본인 확인</h4>
                <input type="password" placeholder="비밀번호" onChange={handlePasswordChange} />
                <div>
                    <button onClick={handleSubmit}>확인</button>
                    <button onClick={handleCancelClick}>취소</button>
                </div>
            </div>
        )}
        {isStoreModalOpen && (
            <div css={UserCheckBox}>
                <h4>상점1</h4>
                <div>
                    <button onClick={() => {navigete("/point");}}>포인트충전</button>
                    <button >상점 물품들 조회</button>
                    <button onClick={handleStoreCancelClick}>취소</button>
                </div>
            </div>
        )}
    </div>
    );
}

export default MyPage;