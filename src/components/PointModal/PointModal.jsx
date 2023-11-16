import React, { useEffect, useRef } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as S from "./Style";
import { instance } from '../../api/config/instance';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

const SStoreContainer = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 20px 20px;
`;

function PointStore({ onClose }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const modalRef = useRef();

    useEffect(() => {
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(iamport);
        };
    }, [])

    const handleCloseModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleCloseModal);
        return () => {
            document.removeEventListener('mousedown', handleCloseModal);
        };
    }, [handleCloseModal]);
    
    const productData = [
        { name: "1000 Point", price: 10000, points: 1000, option: 500 },
        { name: "2000 Point", price: 20000, points: 2000, option: 500 },
        { name: "3000 Point", price: 30000, points: 3000, option: 1000 },
        { name: "5000 Point", price: 50000, points: 5000, option: 2000 },
        { name: "7500 Point", price: 75000, points: 7500, option: 3000 },
        { name: "10000 Point", price: 100000, points: 10000, option: 5000 }
    ];
    
    const handlePaymentSubmit = (product) => {
        const principal = queryClient.getQueryState("getPrincipal");
        if (!window.IMP) {
            return;
        }
        const { IMP } = window;
        IMP.init("imp55744845");
        
        const paymentData = {
            pg: "kakaopay",
            pay_method: "kakaopay",
            merchant_uid: `mid_${new Date().getTime()}`,
            amount: product.price,
            name: product.name,
            buyer_name: principal?.data?.data?.name,
            buyer_email: principal?.data?.data?.email,
        };
        
        IMP.request_pay(paymentData, (response) => {
            console.log(principal);
            const { success, error_msg } = response;
            if (success) {
                const orderData = {
                    point: product.points,
                    userId: principal.data.data.userId
                };
                const option = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                };
                instance.post("/api/point", orderData, option).then((response) => {
                    alert(`포인트 충전이 완료되었습니다. +${product.points} Point 지급됨`);
                    queryClient.refetchQueries(["getProducts"]);
                    navigate("/account/mypage");
                });
            } else {
                alert(error_msg);
            }
        });
    }


    return (
        <div ref={modalRef}>
            <h1>포인트 충전하기</h1>
            <div css={SStoreContainer}>
                {productData.map((product) => (
                    <button
                        key={product.name}
                        css={S.SPointBtn}
                        onClick={() => handlePaymentSubmit(product)}>
                        {product.name}
                        <p>충전 시 <br/>+ {product.option} 추가지급!</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
    

export default PointStore;