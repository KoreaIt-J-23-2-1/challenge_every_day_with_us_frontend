import React from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */

const Header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100%;
    margin: 20px 0px;
    border-bottom: 2px solid #dbdbdb;
    
    & b {
        width: 100%;
    }
`;

function TitleComponent(props) {
    return (
        <div css={Header}>
            <b>{props.title}</b>
        </div>
    );
}

export default TitleComponent;


//  <TitleComponent title="타이틀 적기" />