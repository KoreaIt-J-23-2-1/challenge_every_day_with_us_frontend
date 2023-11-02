import React from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */

const Layout = css`
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 800px;

`;

function SignLayout({children}) {
    return (
        <div css={Layout}>
            {children}
        </div>
    );
}

export default SignLayout;