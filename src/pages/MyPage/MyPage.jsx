import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom/dist';
import { instance } from '../../api/config/instanse';

const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ImgBox = css`
    border: 5px solid #dbdbdb;
    width: 50px;
    height: 50px;
    border-radius: 50%;
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

function MyPage(props) {
    const navigete = useNavigate();
    const [ isModalOpen, setModalOpen ] = useState(false);
    const [ isStoreModalOpen, setIsStoreModalOpen ] = useState(false);
    const [ password, setPassword ] = useState("");
    const [ intro, setIntro ] = useState("");
    const { userId } = useParams();

    const openModal = () => {
    setModalOpen(true);
    };

    const closeModal = () => {
    setModalOpen(false);
    };

    const openStoreModal = () => {
        setIsStoreModalOpen(true);
    };

    const closeStoreModal = () => {
        setIsStoreModalOpen(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleIntroChange = (e) => {
        setIntro(e.target.value);
        console.log(intro);
    };

    const handleSubmit = () => {
        navigete("/account/mypage/details")
    };

    const handleCancelClick = () => {
        closeModal();
    };

    const handleIntroSubmit = () => {
        instance.get(`/api/account/${userId}`)
            .then(response => {
                const introData = response.data.intro;

                if (introData) {
                    return instance.put(`/api/account/${userId}`, { intro });
                } else {
                    return instance.post(`/api/account/${userId}`, { intro });
                }
            })
            .catch(error => {
                console.error(error);
            });
    };
    

    const handleStoreCancelClick = () => {
        closeStoreModal();
    };

    return (
    <div css={Layout}>
        <div css={UserBox}>
            <img css={ImgBox} src="" alt="" />
            <p>등급: </p>
            <p>포인트: </p>
            <p>닉네임: </p>
            <div css={IntroBox}>
                <h4>자기 소개</h4>
                <textarea id="introText" rows="3" cols="40" maxLength={50} onChange={handleIntroChange}></textarea>
                <button onClick={handleIntroSubmit}>저장</button>
                <button>취소</button>
            </div>
        </div>
        <div>
            <p>참여중인 챌린지List </p>
        </div>
        <div css={BtBox}>
            <button onClick={openStoreModal}>상점</button>
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
                <h4>상점</h4>
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