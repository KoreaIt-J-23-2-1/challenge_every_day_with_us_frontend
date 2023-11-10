import React, { useState } from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import {BsBell, BsBellFill,BsCalendarCheck} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import LetterSideBar from '../LetterSideBar/LetterSideBar';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';


const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 5px solid #dbdbdb;
    width: 100%;
    height: 80px;
`;
const btnBox = css`
    position: relative;
    display: flex;
    justify-content: flex-end;
`;

const headerTitleBox = css`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 70%;
    border: 1px solid #dbdbdb;
    border-radius: 50px;
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
    
    return (
        <>
            <div css={Layout}>
                <div css={headerTitleBox}>rse</div>
                <div css={btnBox}>
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