import React, { useState } from 'react';
import * as S from './MenuBtnStyle';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */

function MenuBtn() {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };
        
    return (
        <>
            <div css={[S.menuBtn, isActive && S.active]} onClick={handleClick}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div>
                
            </div>
        </>
    );
}

export default MenuBtn;
