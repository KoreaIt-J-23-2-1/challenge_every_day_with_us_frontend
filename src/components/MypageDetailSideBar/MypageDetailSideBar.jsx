import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as S from "./Style";
import { instance } from '../../api/config/instance';
import PointModal from '../../components/PointModal/PointModal';
import { showAlert, showConfirmation } from '../../styles/common';

function MypageDetailSideBar({ setUploadFiles, children }) {
    const navigate = useNavigate();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState?.data?.data; 
    const profileFileRef = useRef();
    const [ profileImgSrc, setProfileImgSrc ] = useState("");
    const [ intro, setIntro ] = useState("");
    const [ isModalOpen, setModalOpen ] = useState(false);

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    useEffect(() => {
        setProfileImgSrc(principal?.profileUrl);
    }, [])

    const handleProfileUploadClick = () => {
        if(showConfirmation("프로필 변경", "프로필 사진을 변경하시겠습니까?", "question")) {
            profileFileRef.current.click();
        }
    }

    const handleProfileChange = (e) => {
        setUploadFiles(e.target.files);
        const files = e.target.files;

        if(!files.length) {
            setUploadFiles([]);
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setProfileImgSrc(e.target.result);
        }

        reader.readAsDataURL(files[0])
    }

    const handleIntroChange = (e) => {
        setIntro(e.target.value);
    };

    const handleIntroSubmit = () => {
        try {
            const requestConfig = {
                intro: intro,
            };
            const response = instance.put('/api/account/intro', requestConfig, option);
            if(response){
                showAlert("수정완료", "success");
            }
        }catch(error) {
            console.error(error);
        }
    };

    const handlePurchasePointClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div css={S.layout}>
            <div css={S.sideBox}>
                <div css={S.imgContainer}>
                    <div css={S.imgBox} onClick={handleProfileUploadClick}>
                        <img src={profileImgSrc} alt="" />
                    </div>
                    <input css={S.file} type="file" onChange={handleProfileChange} ref={profileFileRef}/>
                </div>
                <div css={S.profile}>
                    <b>{principal?.nickname}</b>
                    <p>{principal?.email}</p>
                    <p>{principal?.membership}</p>
                    <p>{principal?.point}<b>포인트</b></p>
                    <div css={S.IntroBox}>
                        <h5>자기 소개</h5>
                        <textarea id="introText" rows="3" cols="40" maxLength={50} defaultValue={principal?.intro} onChange={handleIntroChange}></textarea>
                        <div>
                            <button onClick={handleIntroSubmit}>저장</button>
                            <button>취소</button>
                        </div>
                    </div>
                </div>
                <div css={S.line}></div>
                <div css={S.leftHeader}>
                    <ul css={S.leftMenu}>
                        <li onClick={() => navigate("/user")}>참여 현황</li>
                        <li onClick={() => navigate("/account/mypage/detail")}>내 정보수정</li>
                        <li onClick={() => navigate("/store/:userId/orders")}>상점물품 구매내역</li>
                        <li onClick={() => {handlePurchasePointClick()}}>포인트 충전</li>
                    </ul>
                </div>
            </div>
            {isModalOpen && (
                <div css={S.modalOverlay}>
                    <div css={S.modalContent}>
                        <PointModal onClose={handleCloseModal} />
                    </div>
                </div>
            )}
            {children}
        </div>
    );
}

export default MypageDetailSideBar;