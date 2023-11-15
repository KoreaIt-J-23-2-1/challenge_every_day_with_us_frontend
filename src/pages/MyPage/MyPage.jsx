import React from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import Admin from '../../components/MyPage/Admin';
import User from '../../components/MyPage/User';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';

function MyPage() {
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;
    const getPrincipal = useQuery(["getPrincipal"], async () => {
        try {
            const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
            }
        return await instance.get("/api/account/principal", option);
        } catch(error) {
            throw new Error(error)
        }
        }, {
        retry: 0,
        refetchInterval: 1000 * 60 * 10,
        refetchOnWindowFocus: false
        });

    return (
        <BaseLayout>
            {principal.isAdmin === 1 ? <Admin /> : <User />}
        </BaseLayout>
    );
}

export default MyPage;