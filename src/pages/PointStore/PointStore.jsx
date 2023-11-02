import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const SStoreContainer = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 20px;
    width: 100%;
`;

const SProductContainer = css`
    margin: 10px;
    width: 30%;
    height: 120px;
    cursor: pointer;
`;

function PointStore(props) {
    return (
        <div>
            <h1>포인트 충전하기</h1>
            <div css={SStoreContainer}>
                <button css={SProductContainer}>
                    Point
                </button>
                <button css={SProductContainer}>
                    Point
                </button>
                <button css={SProductContainer}>
                    Point
                </button>
            </div>
        </div>
    );
}

export default PointStore;