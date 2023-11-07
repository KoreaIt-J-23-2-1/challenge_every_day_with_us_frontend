import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import img1 from '../../img/운동.png';
import img2 from '../../img/생활습관.jpeg';
import img3 from '../../img/재테크.jpeg';
import img4 from '../../img/학습.jpeg';
import img5 from '../../img/취미.jpeg';
import img6 from '../../img/일기.jpeg';
import img7 from '../../img/챌어스.jpeg';
import { Link } from 'react-router-dom';

const Layout = css`
    padding: 30px;
`;

const SStoreContainer = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border: 2px solid #dbdbdb;
`;

const SProductContainer = css`
    display: flex;
    align-items: center;
    position: relative;
    margin: 20px;
    width: calc(30% - 10px);
    height: 210px;
    background-color: transparent;
    padding: 0px;
    border-radius: 20px;
    border: 1px solid #eee;
    font-size: 20px;
    font-weight: 600;
    overflow: hidden;
    cursor: pointer;

    & p {
        position: absolute;
        white-space: nowrap;
        margin-left: 10px;
        top: -10px;
        font-size: 25px;
        font-weight: 600;
        color: #dbdbdb;
    }

    & img {
        width: 543px;
        height: 208px;
    }

    & :active {
        transform: scale(1.1);
    }
`;


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
        <div css={Layout}>
            <h2>카테고리 선택</h2>
            <div css={SStoreContainer}>
                {categoryData.map((category) => (
                    <button css={SProductContainer} key={category.name}>
                        <Link to={`/challenge/create/${category.value}`}>
                            <p>{category.name}</p>
                            <img src={category.image} alt={category.name} />
                        </Link>
                    </button>
                ))}
            </div>
        </div>
    );    
}

export default CategoryPage;