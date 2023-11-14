// MenuBtn.jsx
import React, { useEffect, useState } from 'react';
import './MenuBtnStyle.css';

function MenuBtn() {
    const [isChecked, setIsChecked] = useState(false);

        useEffect(() => {
            const animate = setInterval(() => {
                setIsChecked(prev => !prev);
            }, 3000);

            return () => clearInterval(animate);
        }, []);

    const handleClick = () => {
        clearInterval(); 
    };

    return (
        <div>
            <label className="menu" onClick={handleClick}>
                <input type="checkbox" checked={isChecked} readOnly />
                <div></div>
                <div></div>
                <div></div>
            </label>
        </div>
    );
}

export default MenuBtn;
