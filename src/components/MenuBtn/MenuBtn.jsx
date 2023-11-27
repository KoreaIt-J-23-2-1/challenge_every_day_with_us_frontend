import React, { useState } from 'react';
import * as S from './MenuBtnStyle';
import MenuModal from '../MenuModal/MenuModal';
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
            <MenuModal isActive={isActive} />
        </>
    );
}

export default MenuBtn;
