import React, { useState } from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import * as S from './HeaderStyle';
import {BsBell, BsBellFill,BsCalendarCheck, BsFillGiftFill} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import LetterSideBar from '../LetterSideBar/LetterSideBar';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import logoimg1 from '../../img/로고이미지3.png';
import logoimg2 from '../../img/로고이미지2.png';
import logoimg3 from '../../img/newLogo01.png';
import logoimg4 from '../../img/newLogo02.png';
import MenuBtn from '../MenuBtn/MenuBtn';
import { IoMdArrowRoundBack } from 'react-icons/io';


function Header() {
    const navigate = useNavigate();
    const [getLetter, setGetLetter] = useState(false);
    const [onLogo, setOnLogo] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isLetterSideBarOpen, setLetterSideBarOpen] = useState(false);
    const queryClient = useQueryClient().getQueryState("getPrincipal");
    const principal = queryClient?.data?.data;

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
        refetchOnWindowFocus: false
    });

    const GoStartPage = () => {
        window.location.replace("/");
    }

    const handleClick = () => {
        setIsActive(isActive);
    };

    const handlebackClick = () => {
        navigate(-1);
    }
    
    return (
        <>
            <div css={S.Layout}>
                <div css={S.HeaderBox}>
                    <div css={S.BtnBackground} onClick={handlebackClick}>
                        <IoMdArrowRoundBack css={S.BackBtn}/>
                    </div>
                    <div css={S.HeaderTitleBox}>
                        {/* <div css={S.LogoBtn} onClick={GoStartPage}
                            onMouseOver={() => setOnLogo(true)} onMouseOut={() => setOnLogo(false)}>
                            <img src={onLogo ? logoimg1 : logoimg2} alt="로고 이미지" />
                        </div> */}
                    </div>
                    <div css={S.RightIconBox}> 
                        <div  css={S.BtnBackground} ><BsFillGiftFill css={S.Icon}/></div>
                        <div css={S.BtnBackground} onClick={handleStampOpen}><BsCalendarCheck css={S.Icon}/></div>
                        {(!getLettersCount.isLoading && principal ) && (
                            <>
                                <div css={S.BtnBackground} onClick={handleLetterOpen}  >
                                    {getLetter ? <BsBellFill  css={S.Icon}/> : <BsBell  css={S.Icon}/>}
                                </div>
                                <div css={S.LetterCountBox}>{getLettersCount.data}</div>
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