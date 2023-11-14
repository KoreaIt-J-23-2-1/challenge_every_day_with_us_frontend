import { css } from "@emotion/react";

export const SModify = css`
    font-family: "proxima-nova", sans-serif;
    font-weight: 500;
    font-size: 13px;
    text-transform: uppercase!important;
    letter-spacing: 2px;
    color: #49c6dd;
    cursor: hand;
    text-align: center;
    text-transform: capitalize;
    border: 1px solid #49c6dd;
    border-radius: 20px;
    position: relative;
    overflow: hidden!important;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    background: transparent!important;
    z-index:10;

    &:hover {
        border: 1px solid #49c6dd;
        color: #ffffff!important;
    }

    &:before {
        content: '';
        width: 0%;
        height: 100%;
        display: block;
        background: #49c6dd;
        position: absolute;
        -ms-transform: skewX(-20deg);
        -webkit-transform: skewX(-20deg); 
        transform: skewX(-20deg);   
        left: -10%;
        opacity: 1;
        top: 0;
        z-index: -12;
        -moz-transition: all .7s cubic-bezier(0.77, 0, 0.175, 1);
        -o-transition: all .7s cubic-bezier(0.77, 0, 0.175, 1);
        -webkit-transition: all .7s cubic-bezier(0.77, 0, 0.175, 1);
        transition: all .7s cubic-bezier(0.77, 0, 0.175, 1);
        box-shadow:2px 0px 14px rgba(0,0,0,.6);
    }

    &:after {
        content: '';
        width: 0%;
        height: 100%;
        display: block;
        background: #ffffff;
        position: absolute;
        -ms-transform: skewX(-20deg);
        -webkit-transform: skewX(-20deg); 
        transform: skewX(-20deg);   
        left: -10%;
        opacity: 0;
        top: 0;
        z-index: -15;
        -webkit-transition: all .94s cubic-bezier(.2,.95,.57,.99);
        -moz-transition: all .4s cubic-bezier(.2,.95,.57,.99);
        -o-transition: all .4s cubic-bezier(.2,.95,.57,.99);
        transition: all .4s cubic-bezier(.2,.95,.57,.99);
        box-shadow: 2px 0px 14px rgba(0,0,0,.6);   
    }
    &:hover::before { opacity:1;width: 116%; }
    &:hover::after { opacity:1;width: 116%; }
`;

export const SCancel = css`
    font-family: "proxima-nova", sans-serif;
    font-weight: 500;
    font-size: 13px;
    text-transform: uppercase!important;
    letter-spacing: 2px;
    color: #03c75a;
    cursor: hand;
    text-align: center;
    text-transform: capitalize;
    border: 1px solid #03c75a;
    border-radius:50px;
    position: relative;
    overflow: hidden!important;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    background: transparent!important;
    z-index:10;

    &:hover {
        border: 1px solid #03c75a;
        color: #ffffff!important;
    }

    &:before {
        content: '';
        width: 0%;
        height: 100%;
        display: block;
        background: #03c75a;
        position: absolute;
        -ms-transform: skewX(-20deg);
        -webkit-transform: skewX(-20deg); 
        transform: skewX(-20deg);   
        left: -10%;
        opacity: 1;
        top: 0;
        z-index: -12;
        -moz-transition: all .7s cubic-bezier(0.77, 0, 0.175, 1);
        -o-transition: all .7s cubic-bezier(0.77, 0, 0.175, 1);
        -webkit-transition: all .7s cubic-bezier(0.77, 0, 0.175, 1);
        transition: all .7s cubic-bezier(0.77, 0, 0.175, 1);
        box-shadow:2px 0px 14px rgba(0,0,0,.6);
    }

    &:after {
        content: '';
        width: 0%;
        height: 100%;
        display: block;
        background: #ffffff;
        position: absolute;
        -ms-transform: skewX(-20deg);
        -webkit-transform: skewX(-20deg); 
        transform: skewX(-20deg);   
        left: -10%;
        opacity: 0;
        top: 0;
        z-index: -15;
        -webkit-transition: all .94s cubic-bezier(.2,.95,.57,.99);
        -moz-transition: all .4s cubic-bezier(.2,.95,.57,.99);
        -o-transition: all .4s cubic-bezier(.2,.95,.57,.99);
        transition: all .4s cubic-bezier(.2,.95,.57,.99);
        box-shadow: 2px 0px 14px rgba(0,0,0,.6);   
    }
    &:hover::before { opacity:1;width: 116%; }
    &:hover::after { opacity:1;width: 116%; }
`;

export const SWithdrawn = css`
    font-family: "proxima-nova", sans-serif;
    font-weight: 500;
    font-size: 13px;
    text-transform: uppercase!important;
    letter-spacing: 2px;
    color: #DE3180;
    cursor: hand;
    text-align: center;
    text-transform: capitalize;
    border: 1px solid #DE3180;
    border-radius:50px;
    position: relative;
    overflow: hidden!important;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    background: transparent!important;
    z-index:10;

    &:hover {
        border: 1px solid #DE3180;
        color: #ffffff!important;
    }

    &:before {
        content: '';
        width: 0%;
        height: 100%;
        display: block;
        background: #DE3180;
        position: absolute;
        -ms-transform: skewX(-20deg);
        -webkit-transform: skewX(-20deg); 
        transform: skewX(-20deg);   
        left: -10%;
        opacity: 1;
        top: 0;
        z-index: -12;
        -moz-transition: all .7s cubic-bezier(0.77, 0, 0.175, 1);
        -o-transition: all .7s cubic-bezier(0.77, 0, 0.175, 1);
        -webkit-transition: all .7s cubic-bezier(0.77, 0, 0.175, 1);
        transition: all .7s cubic-bezier(0.77, 0, 0.175, 1);
        box-shadow:2px 0px 14px rgba(0,0,0,.6);
    }

    &:after {
        content: '';
        width: 0%;
        height: 100%;
        display: block;
        background: #ffffff;
        position: absolute;
        -ms-transform: skewX(-20deg);
        -webkit-transform: skewX(-20deg); 
        transform: skewX(-20deg);   
        left: -10%;
        opacity: 0;
        top: 0;
        z-index: -15;
        -webkit-transition: all .94s cubic-bezier(.2,.95,.57,.99);
        -moz-transition: all .4s cubic-bezier(.2,.95,.57,.99);
        -o-transition: all .4s cubic-bezier(.2,.95,.57,.99);
        transition: all .4s cubic-bezier(.2,.95,.57,.99);
        box-shadow: 2px 0px 14px rgba(0,0,0,.6);   
    }
    &:hover::before { opacity:1;width: 116%; }
    &:hover::after { opacity:1;width: 116%; }
`;