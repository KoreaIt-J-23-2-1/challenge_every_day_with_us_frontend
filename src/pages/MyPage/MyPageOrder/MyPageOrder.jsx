import React from 'react';
import BaseLayout from '../../../components/BaseLayout/BaseLayout';
import MypageDetailSideBar from '../../../components/MypageDetailSideBar/MypageDetailSideBar';
import { useQuery } from 'react-query';
import { instance } from '../../../api/config/instance';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function MyPageOrder(props) {
    const navigate = useNavigate();

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    const getPrincipal = useQuery(["getPrincipal"], async () => {
        try{
            return await instance.get("/api/auth/principal", option);

        }catch(error) {
            // throw new Error(error);
        }
        }, {
            retry: 0,
            refetchInterval: 1000 * 60 * 10,
            refetchOnWindowFocus: false
        }
    );

    const getMyOrders = useQuery(["getMyOrders"], async () => {
        try{
            const principal = await instance.get("/api/auth/principal", option);
            return await instance.get(`/api/store/purchases/${principal.data.userId}`, option);

        }catch(error) {
            throw new Error(error);

        }
        },
        {
            retry: 0,
            refetchInterval: 1000 * 60 * 10,
            refetchOnWindowFocus: false
        }
    );

    return (
        <BaseLayout>
            <MypageDetailSideBar>
                <div css={S.SLayout}>
                    <div css={S.SOrderHeader}>
                        <h3>{!getPrincipal.isLoading && getPrincipal.data.data.nickname} 님의 구매목록</h3>
                    </div>
                    <div css={S.SBaseLayout}>
                        {!getMyOrders.isLoading &&
                            getMyOrders?.data?.data.map(order => {
                                return <div css={S.SItemContainer} key={order.orderId}>
                                        <div css={S.SItemHeader}>주문번호 : {order.orderId}</div>
                                        <div css={S.SItemDetail}>상품번호 : {order.itemId}</div>
                                        <div css={S.SItemDetail}>상품이름 : {order.itemName}</div>
                                        <div css={S.SItemPrice}>가격 : {order.itemPrice}</div>
                                        <div css={S.SItemDetail}>주문일시 : {order.orderTime}</div>
                                    </div>
                        })}
                    </div>
                </div>
            </MypageDetailSideBar>
        </BaseLayout>
    );
}

export default MyPageOrder;