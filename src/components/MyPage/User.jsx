import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/config/instance';
import { useQuery, useQueryClient } from 'react-query';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import Store from '../../components/Store/Store';
import * as S from './UserStyle';
import MypageDetailSideBar from '../MypageDetailSideBar/MypageDetailSideBar';

function User() {
    const [ myChallenge, setMyChallenge ] = useState();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    const getMyChallenges = useQuery(["getMyChallenges"], async () => {
        try {
        return await instance.get("/api/account/mychallenges", option);
        } catch(error) {
            throw new Error(error)
        }
        }, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setMyChallenge(response.data);
        }
        });

    return (
        <BaseLayout>
            <MypageDetailSideBar>
                <div css={S.Layout}>
                    <p>참여중인 챌린지 List</p>
                    <ul>
                        {myChallenge?.map((myChallenge, index) => (
                            <li key={index}>{myChallenge.challengeName}</li>
                        ))}
                    </ul>
                </div>
            </MypageDetailSideBar>
        </BaseLayout>
    );
}

export default User;