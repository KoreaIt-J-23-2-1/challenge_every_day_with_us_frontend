import React from 'react';
import { css } from '@emotion/react';
import { useQuery } from 'react-query';
import { instance } from '../../api/config/instance';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { useNavigate } from 'react-router-dom';
/** @jsxImportSource @emotion/react */

const SLayout = css`
    background-color: #dbdbdb;
`;

const SItemContainer = css`
    border: 1px solid black;
`;

function StoreMyOrder(props) {
    const navigate = useNavigate();

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    const getPrincipal = useQuery(["getPrincipal"], async () => {
        try{
            return await instance.get("/api/account/principal", option);

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
            const principal = await instance.get("/api/account/principal", option);
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
            <h1>{!getPrincipal.isLoading && getPrincipal.data.data.nickname} 님의 구매 기록</h1>
            <div css={SLayout}>
                {!getMyOrders.isLoading &&
                    getMyOrders?.data?.data.map(order => {
                        return <div css={SItemContainer} key={order.orderId}>
                                <div>주문 고유번호 : {order.orderId}</div>
                                <div>상품 번호 : {order.itemId}</div>
                                <div>상품 이름 : {order.itemName}</div>
                                <div>가격 : {order.itemPrice}</div>
                            </div>
                })}
            </div>

            <button onClick={() => { navigate("/main") }}>메인으로</button>
        </BaseLayout>
    );
}

export default StoreMyOrder;