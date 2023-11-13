import React, { useState } from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import * as S from './HeaderStyle';
import {BsBell, BsBellFill,BsCalendarCheck} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import LetterSideBar from '../LetterSideBar/LetterSideBar';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import logoimg1 from '../../img/로고이미지3.png';
import logoimg2 from '../../img/로고이미지2.png';


function Header() {
    const navigate = useNavigate();
    const [getLetter, setGetLetter] = useState(false);
    const [onLogo, setOnLogo] = useState(false);
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
    
    return (
        <>
            <div css={S.Layout}>
                <div css={S.HeaderBox}>     
                    
                    <div css={S.LogoBtn} onClick={GoStartPage}
                        onMouseOver={() => setOnLogo(true)} onMouseOut={() => setOnLogo(false)}>
                        <img src={onLogo ? logoimg1 : logoimg2} alt="로고 이미지" />
                    </div>
                    <div css={S.HeaderTitleBox}></div>
                    <div css={S.Icon} onClick={handleStampOpen}><BsCalendarCheck/></div>
                    {(!getLettersCount.isLoading && principal ) && (
                        <>
                            <div css={S.Icon} onClick={handleLetterOpen} >
                                {getLetter ? <BsBellFill /> : <BsBell />}
                            </div>
                            <div css={S.LetterCountBox}>{getLettersCount.data}</div>
                        </>
                        )
                    }
                </div>
            </div>
            <div css={[S.LetterSideBarCss, isLetterSideBarOpen && { right: 0 }]}>
                <LetterSideBar />
            </div>
        </>

    );
}

export default Header;