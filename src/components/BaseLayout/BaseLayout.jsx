import React from 'react';
import { css } from '@emotion/react';
import Header from '../Header/Header';
/** @jsxImportSource @emotion/react */

const Layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px auto ;
    height: 90vh;
    width: 70%;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 1px #c0c0c0;
    /* background:#ffffffb0; */
`;



function BaseLayout({children}) {
    return (
        <>
            <Header/>
            <div css={Layout}>
                {children}
            </div>
        </>
    );
}

export default BaseLayout;