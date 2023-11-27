import React, { useEffect, useMemo, useState } from 'react';
import * as S from './MainStyle';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import Header from '../../components/Header/Header';
import img03 from '../../img/운동.png';
import img04 from '../../img/일상.png';
import img05 from '../../img/재태크.png';
import img06 from '../../img/취미.png';
import img07 from '../../img/취미2.png';
import img08 from '../../img/학습.png';
import img09 from '../../img/일기.png';
import img10 from '../../img/기타.png';
import InfoSideBar from '../../components/InfoSideBar/InfoSideBar';
import LogoutState from '../../components/InfoSideBar/LogoutState';
import {useQuery, useQueryClient } from 'react-query';
import MypageDetailSideBar from '../../components/MypageDetailSideBar/MypageDetailSideBar';
import { instance } from '../../api/config/instance';
import MainCalendar from '../../components/MainCalendar/MainCalendar'
import { PiPlusSquareLight } from "react-icons/pi";
import Chart from '../../components/Chart/Chart';

/** @jsxImportSource @emotion/react */

function RealMain(props) {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [img03, img04, img05, img06, img07, img08, img09, img10];
    const queyrClient = useQueryClient().getQueryState("getPrincipal");
    const principal = queyrClient?.data?.data;
    const [ myChallenge, setMyChallenge ] = useState([]);
    const [ chart, setChart ] = useState(<></>);
    const navigate = useNavigate();
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    } 

    const getNoticeList = useQuery(["getNoticeList"], async () => {
        return await instance.get(`/api/notices/${1}?pageSize=4`)
    }, {
        retry: 0,
        refetchOnWindowFocus: false
    });

    const getMyChallenges = useQuery(["getMyChallenges"], async () => {
        try {
        return await instance.get("/api/account/mychallenges", option);
        } catch(error) {
            throw new Error(error)
        }
        }, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setMyChallenge(response.data);
        }
    });

    const getPopularChallenge = useQuery(["getPopularChallenge"], async () => {
        return await instance.get("/api/challenges/popular?year=&month=&date=");
    }, {
        retry: 0,
        refetchOnWindowFocus: false
    });

    const getBestFeed = useQuery(["getBestFeed"], async () => {
        return await instance.get("/api/feed/best");
    }, {
        retry: 0,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 1300); 

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setChart(<Chart />);
    }, [])

    const handleChallengeClick = () => {

    }
    
    const stampCalendarClick = () => {
        navigate("/stamp")
    }

    const handleChallengeCreateClike = () => {
        navigate("/challenge/category");
    }

    return (
        <div css={S.MainBase}>    
            <Header />
            
            <div css={S.MainBox}>

                <div css={S.part1}>
                    <div css={S.box01}>
                            {principal ? <InfoSideBar/> : <LogoutState/>}
                    </div>
                    <div css={S.part5}>
                        <div css={S.LabelBox}>
                            <label>가장 인기있는 챌린지</label>
                            <div css={S.box02}>
                                <div css={S.BestChallenge} onClick={() => handleChallengeClick(navigate(`/challenge/${getPopularChallenge?.data?.data?.challengeId}`))}>
                                    <div>챌린지 이름: <b>{getPopularChallenge?.data?.data?.challengeName}</b></div>
                                    <div>참여인원: <b>{getPopularChallenge?.data?.data?.challenger}명</b></div>
                                    <div>기간: <b>{getPopularChallenge?.data?.data?.startDate} ~ {getPopularChallenge?.data?.data?.endDate}</b></div>
                                    <div css={S.Content}>
                                        <b>챌린지 소개: <p>{getPopularChallenge?.data?.data?.introduction}</p></b>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div css={S.LabelBox}>
                            <label><b>가장 인기있는 피드</b></label>
                            <div css={S.box02}>
                                <div css={S.BestFeed} onClick={() => handleChallengeClick(navigate("/challenge/feed"))}>
                                    <div css={S.FeedHeader}>
                                        <div css={S.userInfo}>
                                            <img css={S.InfoImg} src={getBestFeed?.data?.data?.profileUrl} alt="" />
                                            <b>{getBestFeed?.data?.data?.nickname}</b>  
                                        </div>
                                        <div css={S.ChInfo}>
                                            <div>
                                                <p>[{getBestFeed?.data?.data?.categoryName}]</p>
                                                <b>{getBestFeed?.data?.data?.challengeName}</b>
                                            </div>
                                        </div>
                                    </div>   
                                    <div css={S.SFeedBody}>
                                        <a>{getTimeDifference(getBestFeed?.data?.data?.dateTime)}</a>
                                        {getBestFeed?.data?.data?.img && <img css={S.FeedImg} src={getBestFeed?.data?.data?.img} alt="" />}
                                        <div css={S.FeedContentBox(!!getBestFeed?.data?.data?.img)} imgexists={(!!getBestFeed?.data?.data?.img).toString()}></div>  
                                        <div css={S.FeedContent}>{getBestFeed?.data?.data?.feedContent}</div>
                                    </div>  
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div css={S.part2}>
                            <div css={S.LabelBox2}>
                                <label><b>참여중인 챌린지 리스트</b></label>
                                <div css={S.box03}>
                                    <div css={S.ListBox}>
                                        {myChallenge?.map((myChallenge, index) => (
                                            <li key={index}  onClick={() => handleChallengeClick(navigate(`/challenge/${myChallenge.challengeId}`))}>
                                                {myChallenge.challengeName}
                                            </li>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div css={S.box031} onClick={() => handleChallengeClick(navigate("/challenge/category"))}>
                                <b>챌린지생성</b> <PiPlusSquareLight onClick={handleChallengeCreateClike}/>
                            </div>
                            <div css={S.CategoryImgBox}>
                                <img src={images[currentImage]} alt="Main Image" css={S.CategoryImg} />
                            </div> 
                        </div>
                        <div css={S.part3}>
                            <div css={S.box04}>
                                {principal?.isAdmin === 1 ?
                                    chart
                                :
                                <div css={S.MiniContent} onClick={() => {stampCalendarClick()}}>
                                    <MainCalendar />
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div css={S.part4}>
                    <div css={S.CategoryImgBox}>
                        <img src={images[currentImage]} alt="Main Image" css={S.CategoryImg} />
                    </div> 
                    <div css={S.box05}>
                        <div css={S.LogoImg1}></div>
                    </div>
                    <div css={S.box06}>
                        <h4>공지사항</h4>
                        <table css={S.NoticeTb}>
                            <tbody>
                                {!getNoticeList.isLoading && getNoticeList?.data?.data?.map(notice => {
                                    return (
                                        <tr css={S.Notice} key={notice.noticeId} onClick={() => { navigate(`/notice/${notice.noticeId}`) }}>
                                            <td css={S.noticeTitle}>{notice.noticeTitle}</td>
                                            <td>{notice.nickname}</td>
                                            <td>{notice.noticeDate}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>


                
            

            </div>

        </div>
    );
}

export default RealMain;

function getTimeDifference(feedDateTime) {
    const currentDateTime = new Date();
    const feedDate = new Date(feedDateTime);

    const timeDifferenceInSeconds = Math.floor((currentDateTime - feedDate) / 1000);

    if (timeDifferenceInSeconds < 60) {
        return `${timeDifferenceInSeconds}초 전`;
    } else if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutes}분 전`;
    } else if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hours}시간 전`;
    } else {
        const days = Math.floor(timeDifferenceInSeconds / 86400);
        return `${days}일 전`;
    }
}