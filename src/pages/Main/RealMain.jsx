import React, { useEffect, useState } from 'react';
import * as S from './MainStyle';
import { css } from '@emotion/react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import {TbSeeding} from 'react-icons/tb';
import Header from '../../components/Header/Header';
import img01 from '../../img/상단로고01.png';
import img02 from '../../img/상단로고02.png';
import img03 from '../../img/운동.png';
import img04 from '../../img/일상.png';
import img05 from '../../img/재태크.png';
import img06 from '../../img/취미.png';
import img07 from '../../img/취미2.png';
import img08 from '../../img/학습.png';
import img09 from '../../img/일기.png';
import img10 from '../../img/기타.png';
import MypageDetailSideBar from '../../components/MypageDetailSideBar/MypageDetailSideBar';


/** @jsxImportSource @emotion/react */



function RealMain(props) {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [img03, img04, img05, img06, img07, img08, img09, img10];

    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 1300); 

        return () => clearInterval(intervalId);
    }, [currentImage]);

    const navigate = useNavigate();
    
    return (
        <div css={S.MainBase}>    
            <Header />
            
            <div css={S.MainBox}>

                <div css={S.part1}>
                    <div css={S.box01}>
                        <MypageDetailSideBar/>
                    </div>
                    <div css={S.part5}>
                        <div css={S.box02}>
                            챌린지 제일 인기있는거

                        </div>
                        <div css={S.box02}>
                            피드 제일 인기있는거

                        </div>

                    </div>
                    <div>
                        <div css={S.part2}>
                            <div css={S.box03}>
                                참여중인 챌린지
                            </div>
                            <div css={S.box03}>
                                챌린지생성
                            </div>
                            <div css={S.CategoryImgBox}>
                                <img src={images[currentImage]} alt="Main Image" css={S.CategoryImg} />
                            </div> 
                        </div>
                        <div css={S.part3}>
                            <div css={S.box04}>
                                
                                <b css={S.MiniTitle}>
                                    당신의 도전을 응원합니다 !
                                </b>

                                <div css={S.MiniContent}>
                                </div>

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
                        공지
                    </div>
                </div>


                
            

            </div>

        </div>
    );
}

export default RealMain;


// 로고 띄우고 새싹모양으로 햄버거 메뉴 만들지,,,
// 아니면 중앙에 인기순 챌린지 4개 정도 이미지 넣어서
// 홍보용 느낌으로 보여줄지....
// 어렵넹

// 메인.... 중요한가............................................

/* <BaseLayout>
    <div css={S.MainBase}>
        <div css={S.LogoImg}></div>
        <div css={S.IconBox}>
            <div><TbSeeding /></div>   
        </div>
    </div>
</BaseLayout> */
// <div css={S.box01}></div>