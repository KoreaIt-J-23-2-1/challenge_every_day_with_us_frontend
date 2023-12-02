import React from 'react';
/** @jsxImportSource @emotion/react */
import img1 from '../../img/운동.png';
import img2 from '../../img/일상.png';
import img3 from '../../img/재태크.png';
import img4 from '../../img/학습.png';
import img5 from '../../img/취미.png';
import img6 from '../../img/일기.png';
import img7 from '../../img/기타.png';

import img01 from '../../img/a운동.png';
import img02 from '../../img/a산책.png';
import img03 from '../../img/a재태크.png';
import img04 from '../../img/a학습.png';
import img05 from '../../img/a취미.png';
import img06 from '../../img/a일기.png';
import img07 from '../../img/a기타01.png';
import img08 from '../../img/a기타02.png';

import { Link, useNavigate } from 'react-router-dom';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import * as S from './CategoryPageStyle';


function CategoryPage(props) {
    const navigate = useNavigate();

    const handleClick = (categoryValue) => {
        setTimeout(() => {
            navigate(`/challenge/create/${categoryValue}`);
        }, 1000);
    };

    // const categoryData = [
    //     { name: "운동", value: "운동", image: img1 },
    //     { name: "생활습관", value: "생활습관", image: img2 },
    //     { name: "재테크", value: "재테크", image: img3 },
    //     { name: "학습", value: "학습", image: img4 },
    //     { name: "취미", value: "취미", image: img5 },
    //     { name: "일기", value: "일기", image: img6 },
    //     { name: "기타", value: "기타", image: img7 }
    // ];
    const categoryData = [
        { name: "운동", value: "운동", image: img01 },
        { name: "생활습관", value: "생활습관", image: img02 },
        { name: "재테크", value: "재테크", image: img03 },
        { name: "학습", value: "학습", image: img04 },
        { name: "취미", value: "취미", image: img05 },
        { name: "일기", value: "일기", image: img06 },
        { name: "기타", value: "기타", image: img08 }
    ];

    return (
        <BaseLayout>
            <div css={S.Header}>
                <b>생성할 챌린지의 카테고리를 골라주세요 ! </b>
            </div>
            <div css={S.CategoryBox}>
                {categoryData.map((category) => (
                    <button css={S.SProductContainer} key={category.name}
                        onClick={() => handleClick(category.value)}>
                        <Link to={`/challenge/create/${category.value}`}>
                            <div css={S.imgBox(category.image)}></div>
                            <p css={S.imgName}>{category.name}</p>
                        </Link>
                    </button>
                ))}
            </div>
        </BaseLayout>
    );    
}

export default CategoryPage;