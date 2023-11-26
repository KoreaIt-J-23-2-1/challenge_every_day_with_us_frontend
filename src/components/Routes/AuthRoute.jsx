import React from 'react';
import { useQueryClient } from 'react-query';
import { Navigate } from 'react-router-dom';

function AuthRoute({ element }) {
    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState(["getPrincipal"])?.data?.data;

    if(!principal) {
        alert("로그인 후 사용하세요.");
        return <Navigate to={"/auth/signin"} />
    }

    return element;
}

export default AuthRoute;