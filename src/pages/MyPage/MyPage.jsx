import React from 'react';
import Admin from '../../components/MyPage/Admin/Admin';
import User from '../../components/MyPage/User/User';
import { useQueryClient } from 'react-query';
import UserModal from '../../components/MyPage/User/UserModal';

function MyPage() {
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState?.data?.data;

    return (
        <>
            {principal?.isAdmin === 1 ? <Admin /> : <User />}
        </>
    );
}

export default MyPage;