import React from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import Admin from '../../components/MyPage/Admin';
import User from '../../components/MyPage/User';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';

function MyPage() {
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState?.data?.data;

    return (
        <BaseLayout>
            {principal?.isAdmin === 1 ? <Admin /> : <User />}
        </BaseLayout>
    );
}

export default MyPage;