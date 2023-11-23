import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MyPage from '../../pages/MyPage/MyPage';
import MyPageDetails from '../../pages/MyPage/MyPageDetails/MyPageDetails';
import { useQueryClient } from 'react-query';
import { Navigate } from 'react-router-dom/dist/umd/react-router-dom.development';

function AccountRoute(props) {
    return (
        <Routes>
            <Route path="mypage" element={ <MyPage /> } />
            <Route path="mypage/detail" element={ <MyPageDetails /> } />
        </Routes>
    );
}

export default AccountRoute;