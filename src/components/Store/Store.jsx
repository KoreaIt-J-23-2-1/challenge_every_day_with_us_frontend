import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import PointModal from '../../components/PointModal/PointModal';
import { showAlert } from '../../styles/common';

function Store(props) {
    const navigate = useNavigate();

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }
    const queryClient = useQueryClient();
    const getPrincipal = queryClient.getQueryState(["getPrincipal"]);
    const [ isModalOpen, setModalOpen ] = useState(false);

    const getItems = useQuery(["getItems"], async () => {
        try{
            return await instance.get("/api/store/items", option);

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

    const handlePurchaseButton = async (itemId) => {
        try{

            await instance.post("/api/store/item", {itemId}, option);
            showAlert("구매 성공", "success");
            await queryClient.refetchQueries(["getPrincipal"]);
            navigate("/store/:userId/orders")

        }catch(error) {
            console.error(error);
            showAlert("구매 실패", "error");
        }
    };

    if(getItems.isLoading){
        return <></>
    };

    
    const handlePurchasePointClick = () => {
        setModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <BaseLayout>
            <div css={S.StoreHeader}>
                <div>
                    <h1>상점 물품 조회</h1>
                    <div css={S.UserPoint}>
                        <h3>{getPrincipal.data.data.nickname} 님의 포인트 : {getPrincipal.data.data.point}</h3>
                        <button css={S.SPointPurchaseBtn} onClick={() => {handlePurchasePointClick()}}>포인트 충전</button>
                    </div>
                </div>
            </div>
            <div css={S.SBaseLayout}>
                {!getItems.isLoading &&
                    getItems?.data?.data.map(item => {
                        return  <div css={S.SItemLayout} key={item.itemId}>
                                    <div css={S.SItemImgLayout}>
                                        <div css={S.SItemImgContainer}>
                                            <img css={S.itemImg} src={item.itemImgUrl} alt="상품의 이미지" />
                                        </div>
                                    </div>
                                    <div css={S.SItemContainer}>
                                        <b>{item.itemName}</b>
                                        <p>{item.itemPrice} point</p>
                                        <button css={S.SBuyBtn} onClick={() => {handlePurchaseButton(item.itemId)}}>구매 버튼</button>
                                    </div>
                                </div>
                })}
            </div>
            {isModalOpen && (
                <div css={S.ModalOverlay}>
                    <div css={S.ModalContent}>
                        <PointModal onClose={handleCloseModal} />
                    </div>
                </div>
            )}
        </BaseLayout>
        
    );
}

export default Store;