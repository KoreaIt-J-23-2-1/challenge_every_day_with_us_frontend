import React, { useState } from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import {BsBell, BsBellFill,BsCalendarCheck} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import LetterSideBar from '../LetterSideBar/LetterSideBar';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import logoimg from '../../img/로고이미지2.png';



const Layout = css`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 80px;
`;
// const HeaderBox = css`
//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: flex-end;
// `;

const HeaderBox = css`
    position: fixed;
    top: 0;
    width: 99%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: white;
    z-index: 100;
    padding: 10px;
    box-shadow: 0 10px 10px -5px #dbdbdbdb;
    
`;

const headerTitleBox = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px auto;
    height: 60px;
    width: 70%;
    border: 1px solid #dbdbdb;
    border-radius: 50px;
`;

const logoBtn = css`
    cursor: pointer;
    margin: 0px 10px;
    width: 60px;
    height: 60px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;
const Icon = css`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px;
    padding: 2px;
    height: 60px;
    width: 60px;
    font-size: 40px;
`;

const LetterCountBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
    bottom: 15px;
    border-radius: 50%;
    padding: 3px;
    width: 13px;
    height: 13px;
    color: red;
    background-color: #ffe292;
`;


const LetterSideBarCss = css`
    z-index: 10;
    right: -400px;
    overflow: hidden;
    display: flex;
    position: fixed;
    background-color: white;
    border-left: 2px solid #dbdbdb;
    width: 400px;
    height: 90vh;
    transition: right 0.5s ease-in;
`;


function Header() {
    const navigate = useNavigate();
    const [isRead, setIsRead] = useState(false);
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
            <div css={Layout}>
                <div css={HeaderBox}>                    
                    <div css={logoBtn} onClick={GoStartPage} ><img src={logoimg} alt="로고 이미지"/></div>
                    <div css={headerTitleBox}>PAGENAME</div>
                    <div css={Icon} onClick={handleStampOpen}><BsCalendarCheck/></div>
                    {(!getLettersCount.isLoading && principal ) && (
                        <>
                            <div css={Icon} onClick={handleLetterOpen}>{isRead ? <BsBellFill /> : <BsBell/>}</div>
                            <div css={LetterCountBox}>{getLettersCount.data}</div>
                        </>
                        )
                    }
                </div>
            </div>
            <div css={[LetterSideBarCss, isLetterSideBarOpen && { right: 0 }]}>
                <LetterSideBar />
            </div>
        </>
    );
}

export default Header;