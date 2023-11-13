import React, { useEffect } from 'react';
import logoimg from '../../img/로고이미지1.png';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
/** @jsxImportSource @emotion/react */

const imgbox = css`
    cursor: pointer;
    margin:  100px auto;
    width: 500px;
    height: 500px;
    /* position: relative; */
    display: flex;
    align-items: center;
    justify-content: center;


    &:hover{
        img {
            opacity: 0.5;
        }
    }
`;


function LogoPage(props) {
    const navigate = useNavigate();

    const GoMainPage = () => {
        navigate("/main");
    };

    useEffect(() => {
        const autoGoMainPage = setTimeout(() => {
            navigate("/main");
        }, 2000);
        return () => clearTimeout(autoGoMainPage);
    }, [navigate]);

    return (
        <BaseLayout>
            <div css={imgbox}>
                <img src={logoimg} alt="로고 이미지" onClick={GoMainPage} />
            </div>
            <div >

            </div>
        </BaseLayout>
    );
}
export default LogoPage;
