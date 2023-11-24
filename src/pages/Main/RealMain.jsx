import React, { useEffect, useState } from 'react';
import * as S from './Style';
import { css } from '@emotion/react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useQueryClient } from 'react-query';
import {TbSeeding} from 'react-icons/tb';

/** @jsxImportSource @emotion/react */

function RealMain(props) {

    const navigate = useNavigate();
    
    return (
        <>    
            <BaseLayout>
                <div css={S.MainBase}>
                    <div css={S.LogoImg}></div>
                    <div css={S.MenuBox}>
                        <div><TbSeeding /></div>   
                        <div><TbSeeding /></div>   
                        <div><TbSeeding /></div>   
                        <div><TbSeeding /></div>   
                        <div><TbSeeding /></div>   
                    </div>
                </div>


                {/* 
                    로고 띄우고 새싹모양으로 햄버거 메뉴 만들지,,,
                    아니면 중앙에 인기순 챌린지 4개 정도 이미지 넣어서 
                    홍보용 느낌으로 보여줄지....
                    어렵넹
                    
                    메인.... 중요한가............................................
                
                */}
            </BaseLayout>
        </>
    );
}

export default RealMain;