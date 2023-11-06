import React from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */

const Layout = css`
    display: flex;
    flex-direction: column;
    margin: 50px;
`;


function BaseLayout({children}) {
    return (
        <div css={Layout}>
            {children}
        </div>
    );
}

export default BaseLayout;