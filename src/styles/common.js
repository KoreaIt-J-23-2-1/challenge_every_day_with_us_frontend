import { css } from "@emotion/react"
import backgroundImg from '../img/배경.jpg'
import Swal from "sweetalert2";
import swal from "sweetalert";

export const Common = css`
    *{
        box-sizing: border-box;
        font-family: 'NanumSquareNeo-Variable';
        color: #090909;
        
    }

    @font-face {
        font-family: "NanumSquareNeo-Variable";
        font-weight: normal;
        src: url("/fonts/NanumSquareNeo-Variable.ttf");
    }

    @font-face {
    font-family: 'KIMM_700';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/KIMM_Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    }

    @font-face {
        font-family: 'KIMM_300';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/KIMM_Bold.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
    font-family: 'IBMPlexSansKR-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
    html{
        background-color: #fafafa;
        /* background-image: url(${backgroundImg}); */
        background-size: cover; 
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        color: #000;
    }

`;

export const showAlert = (text, icon) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.style.height = '70px'
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    Toast.fire({
        title: text,
        icon,
    });
};

export const showConfirmation = async (title, text, icon ) => {
    const result = await Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonColor: "#E8A789",
        cancelButtonColor: "#E9D3C9",
        confirmButtonText: "동의",
        cancelButtonText: "취소",
        width: 500,
    });

    return result.isConfirmed;
};

// #E8A789 #E9D3C9 #F7F0F0 #f2f2f2 #fafafa
// #F7F4F0

