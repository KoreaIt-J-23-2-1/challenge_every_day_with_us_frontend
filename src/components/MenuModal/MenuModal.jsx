import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './MenuModalStyle';
import { useNavigate } from 'react-router-dom';



function MenuModal(props) {
    const navigate = useNavigate(); 

    
    return (
        <div css={S.Background}>
            <div css={S.MenuHeader}>
                <h3></h3>
                <div css={S.MyBox}>
                    <button onClick={() => { navigate("/auth/signin") }}>로그인</button>
                    <button onClick={() => { navigate("/account/mypage") }}>마이페이지</button>
                    <button onClick={() => { navigate("/account/mypage/detail") }}>내정보수정</button>
                </div>
            </div>

            <div>
                <div css={S.BtnBox}>
                    <button onClick={() => { navigate("/notice/page/1") }}>공지</button>
                    <button onClick={() => { navigate("/store/items") }}>상점</button>


                </div>
                <div css={S.BtnBox}>
                    <button onClick={() => { navigate("/challenge/category") }}>챌린지카테고리</button>
                    <button onClick={() => { navigate("/challenges") }}>챌린지리스트조회</button>
                    <button onClick={() => { navigate("/challenge/feed") }}>Feed</button>
                </div>
                <div css={S.BtnBox}>
                    <button>룰루랄라</button>
                    <button>닐니리야</button>
                    <button>추가할것</button>
                </div>
                {/* <button onClick={() => { navigate(`/store/${userId}/orders`) }}>상점 물품 구매 목록 조회</button> */}
            </div>
        </div>
    );
}

export default MenuModal;