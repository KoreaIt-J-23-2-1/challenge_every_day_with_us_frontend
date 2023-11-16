import React from 'react';
import { css } from '@emotion/react';
import Header from '../Header/Header';
/** @jsxImportSource @emotion/react */


export const Layout = css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 950px;
    width: 80%;
    height: 90vh;
    margin: 0px auto ;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    color: white;
    text-align: center;
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