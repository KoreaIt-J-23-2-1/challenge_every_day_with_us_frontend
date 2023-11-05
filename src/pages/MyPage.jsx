import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import instanse, { instance } from '../api/config/instanse';
import { response } from 'express';
import { QueryClient, useQuery } from 'react-query';

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
    const [ password, setPassword ] = useState("");
    const [ intro, setIntro ] = useState("");
    const { userId } = useParams();
    const principalState = QueryClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;
    const getPrincipal = useQuery(["getPrincipal"], async () => {
    try {
        const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
        }
        return await instance.get("/account/principal", option);

    } catch(error) {
        throw new Error(error)
    }
    }, {
    retry: 0,
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: false
    });

    useEffect(() => {
        setIntro(principal.profileUrl);
    }, [])

    if(getPrincipal.isLoading){
        return <></>
    }

    const openModal = () => {
        setModalOpen(true);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        console.log(e.target.value);
    };

    const handleIntroChange = (e) => {
        setIntro(e.target.value);
        console.log(e.target.value);
    };

    const handleSubmit = () => {
        navigete("/account/mypage/detail")
    };

    const handleCancelClick = () => {
        setModalOpen(false);
    };

    const handleIntroSubmit = () => {
        instanse.get("/api/account")
        .then(response => {
            if(!response.data) {
                instanse.post(`/api/account/${userId}`)
            }else {
                instanse.put(`/api/account/${userId}`)
            }
        })
    }

    return (
    <div css={Layout}>
        <div css={UserBox}>
            <img css={ImgBox} src="" alt="" />
            <p>등급: </p>
            <p>포인트: </p>
            <p>닉네임: </p>
            <div css={IntroBox}>
                <h4>자기 소개</h4>
                <textarea id="introText" rows={3} cols={40} maxLength={50} value={intro} onChange={handleIntroChange} ></textarea>
                <button css={handleIntroSubmit}>저장</button>
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
    </div>
    );
}

export default MyPage;