import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import Header from '../../components/Header/Header';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import PointModal from '../../components/PointModal/PointModal';

const StoreHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 600px;
    }
    & * h1 {
        white-space: nowrap;
        font-size: 30px;
    }

    & * h3 {
        white-space: nowrap;
        font-size: 15px;
    }
`;

const UserPoint = css`
    display: flex;
    justify-content: center;
    align-items: center;
    
    & > h3 > b {
        font-weight: 700;
    }
`;

const SBaseLayout = css`
    overflow-y: auto;
    scroll-behavior: smooth;
    max-height: 800px;
    margin: 20px 30px;
    padding-right: 15px;
`;

const SItemLayout = css`
    display: flex;
    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
`;

const SItemImgLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #dbdbdb;
    padding: 10px;
`;



const SItemImgContainer = css`
    width: 160px;
    height: 120px;
`;

const SItemContainer = css`
    padding: 25px 20px;
    width: 400px;

    & > b {
        font-size: 16px;
        margin-bottom: 20px;
    }

    & > p {
        font-size: 14px;
    }
`;

const itemImg = css`
    width: 100%;
    height: 100%;
`;

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
            alert("구매 성공");
            await queryClient.refetchQueries(["getPrincipal"]);

        }catch(error) {
            console.error(error);
            alert("구매 실패");
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
            <div css={StoreHeader}>
                <div>
                    <h1>상점 물품 조회</h1>
                    <div css={UserPoint}>
                        <h3>{getPrincipal.data.data.nickname} 님의 포인트 : {getPrincipal.data.data.point}</h3>
                        <button css={S.SPointPurchaseBtn} onClick={() => {handlePurchasePointClick()}}>포인트 충전</button>
                    </div>
                </div>
            </div>
            <div css={SBaseLayout}>
                {!getItems.isLoading &&
                    getItems?.data?.data.map(item => {
                        return  <div css={SItemLayout} key={item.itemId}>
                                    <div css={SItemImgLayout}>
                                        <div css={SItemImgContainer}>
                                            <img css={itemImg} src={item.itemImgUrl} alt="상품의 이미지" />
                                        </div>
                                    </div>
                                    <div css={SItemContainer}>
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