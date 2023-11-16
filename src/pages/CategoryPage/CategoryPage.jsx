import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import img1 from '../../img/운동.png';
import img2 from '../../img/일상.png';
import img3 from '../../img/재태크.png';
import img4 from '../../img/학습.png';
import img5 from '../../img/취미.png';
import img6 from '../../img/일기.png';
import img7 from '../../img/기타.png';
import { Link } from 'react-router-dom';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import * as S from './CategoryPageStyle';


function CategoryPage(props) {
    const categoryData = [
        { name: "운동", value: "운동", image: img1 },
        { name: "생활습관", value: "생활습관", image: img2 },
        { name: "재테크", value: "재테크", image: img3 },
        { name: "학습", value: "학습", image: img4 },
        { name: "취미", value: "취미", image: img5 },
        { name: "일기", value: "일기", image: img6 },
        { name: "기타", value: "기타", image: img7 }
    ];

    return (
        <BaseLayout>
            <h2>카테고리 선택</h2>
            <div css={S.CategoryBox}>
                {categoryData.map((category) => (
                    <button css={S.SProductContainer} key={category.name}>
                        <Link to={`/challenge/create/${category.value}`}>
                            <p css={S.imgName}>{category.name}</p>
                            <div css={S.imgBox(category.image)}></div>
                        </Link>
                    </button>
                ))}
            </div>
        </BaseLayout>
    );    
}

export default CategoryPage;