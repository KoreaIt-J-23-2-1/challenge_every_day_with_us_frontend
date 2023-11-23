import React, { useState } from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import * as S from './HeaderStyle';
import {BsBell, BsBellFill,BsCalendarCheck, BsFillGiftFill} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import LetterSideBar from '../LetterSideBar/LetterSideBar';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import MenuBtn from '../MenuBtn/MenuBtn';
import { IoMdArrowRoundBack } from 'react-icons/io';


function Header() {
    const navigate = useNavigate();
    const [getLetter, setGetLetter] = useState(false);
    const [isLetterSideBarOpen, setLetterSideBarOpen] = useState(false);

    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState("getPrincipal");
    const principal = principalState.data;

    const handleStampOpen = () => {
        navigate("/stamp");
    }

    const handleLetterOpen = () => {
        setLetterSideBarOpen(!isLetterSideBarOpen);        
    }

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    };

    const getLettersCount = useQuery(["getLettersCount"], async () => {
        try {
            const response = await instance.get(`/api/letters/count`, option);
            return response.data;
        }catch (error) {
            console.error(error);
        }
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!principal
    });

    const getUnreadLettersCount = useQuery(["getUnreadLettersCount"], async () => {
        try {
            const response = await instance.get(`/api/letters/count/unread`, option);
            return response.data;
        }catch (error) {
            console.error(error);
        }
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!principal
    });

    const GoStartPage = () => {
        window.location.replace("/");
    }


    const GoStorePage = () => {
        if(!principal) {
            alert("로그인을 먼저 진행해주세요");
            return;
        }
        navigate("/store/items");
    }
    
    const handlebackClick = () => {
        navigate(-1);
    }
    
    return (
        <>
            <div css={S.Layout}>
                <div css={S.HeaderBox}>
                    {/* 왼쪽버튼 */}
                    <div css={S.BtnBackground} onClick={handlebackClick}>
                        <IoMdArrowRoundBack css={S.BackBtn}/>
                    </div>

                    {/* 로고 */}
                    <div css={S.LogoBox}>
                        <div css={S.LogoBtn} onClick={GoStartPage}>
                    </div>
                        
                    </div>

                    {/* 오른쪽버튼 */}
                    <div css={S.RightIconBox}> 
                    {(!getLettersCount.isLoading && principal ) && (
                            <>
                        <div css={S.BtnBackground} onClick={GoStorePage} ><BsFillGiftFill css={S.Icon} /></div>
                        
                        <div css={S.BtnBackground} onClick={handleStampOpen}><BsCalendarCheck css={S.Icon} /></div>
                                <div css={S.BtnBackground} onClick={handleLetterOpen}  >
                                    {getUnreadLettersCount.data !== 0 ? <BsBellFill  css={S.Icon}/> : <BsBell  css={S.Icon}/>}
                                </div>
                                {!getUnreadLettersCount.isLoading && getUnreadLettersCount.data === 0 ? <></> : <div css={S.LetterCountBox}>{getUnreadLettersCount.data}</div>}
                            </>
                            )
                        }
                        
                        <div css={S.BtnBackground}><MenuBtn/></div>
                    </div>
                </div>
            </div>


            <div css={[S.LetterSideBarCss, isLetterSideBarOpen && { right: 0 }]}>
                <LetterSideBar />
            </div>
        </>

    );
}

export default Header;