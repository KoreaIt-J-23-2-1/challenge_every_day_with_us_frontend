import React from 'react';
import { css } from '@emotion/react';
import Header from '../Header/Header';
/** @jsxImportSource @emotion/react */


export const Layout = css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: content-box;
    margin: 10px auto ;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 1350px;
    height: 830px;
`;

const border = css`
    width: 1050px;
    height: 100%;
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