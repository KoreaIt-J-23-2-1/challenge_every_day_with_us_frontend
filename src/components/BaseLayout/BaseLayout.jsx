import React from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */

const Layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 40px ;
    height: 90vh;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 0px #c0c0c0;
    /* background:#ffffffb0; */
`;



function BaseLayout({children}) {
    return (
        <div css={Layout}>
            {children}
        </div>
    );
}

export default BaseLayout;