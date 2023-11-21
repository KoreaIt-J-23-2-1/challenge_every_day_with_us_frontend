import React from 'react';
import { css } from '@emotion/react';
import Header from '../Header/Header';
/** @jsxImportSource @emotion/react */


export const Layout = css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 80%;
    min-width: 1350px;
    box-sizing: content-box;
    min-height: 850px;
    margin: 0px auto ;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    color: white;
    text-align: center;
`;

const border = css`
    width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


function BaseLayout({children}) {
    return (
        <>
            <Header/>
            <div css={Layout}>
                <div css={border}>
                    {children}
                </div>
            </div>
        </>
    );
}

export default BaseLayout;