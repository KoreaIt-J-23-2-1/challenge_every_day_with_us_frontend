import React, { useState } from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import {BsBell, BsBellFill,BsCalendarCheck} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import LetterSideBar from '../LetterSideBar/LetterSideBar';


const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 5px solid #dbdbdb;
    width: 100%;
    height: 80px;
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

const btnBox = css`
    display: flex;
    justify-content: flex-end;
`;

const LetterSideBarCss = css`
    right: -400px;
    overflow: hidden;
    display: flex;
    position: absolute;
    background-color: white;
    border-left: 2px solid #dbdbdb;
    width: 400px;
    height: 100%;
    transition: right 0.5s ease-in;
`;


function Header() {
    const navigate = useNavigate();
    const [isRead, setIsRead] = useState(false);
    const [isLetterSideBarOpen, setLetterSideBarOpen] = useState(false);
    

    const handleStampOpen = () => {
        navigate("/stamp");
    }

    const handleLetterOpen = () => {
        setLetterSideBarOpen(!isLetterSideBarOpen);        
    }

    return (
        <>
            <div css={Layout}>                
                <div css={btnBox}>
                    <div css={Icon} onClick={handleStampOpen}><BsCalendarCheck/></div>
                    <div css={Icon} onClick={handleLetterOpen}>{isRead ? <BsBellFill /> : <BsBell/>}</div>
                </div>
            </div>
            <div css={[LetterSideBarCss, isLetterSideBarOpen && { right: 0 }]}>
                <LetterSideBar />
            </div>
        </>
    );
}

export default Header;