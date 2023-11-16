import React from 'react';
import { css } from '@emotion/react';
import Header from '../Header/Header';
/** @jsxImportSource @emotion/react */

// const Layout = css`
//     display: flex;
    // flex-direction: column;
//     align-items: center;
//     margin: 0px auto ;
//     height: 90vh;
//     width: 70%;
//     min-width: max-content;
//     border-radius: 10px;
//     box-shadow: 5px 5px 10px 1px #c0c0c0;
//     overflow: hidden;
//     /* background:#ffffffb0; */
// `;

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