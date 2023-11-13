import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MyPage from '../../pages/MyPage/MyPage';
import MyPageDetails from '../../pages/MyPage/MyPageDetails/MyPageDetails';

function AccountRoute(props) {

    return (
        <Routes>
            <Route path="mypage" element={ <MyPage /> } />
            <Route path="mypage/detail" element={ <MyPageDetails /> } />
        </Routes>
    );
}

export default AccountRoute;