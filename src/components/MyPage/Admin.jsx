import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { instance } from '../../api/config/instance';
import { useQuery, useQueryClient } from 'react-query';
import * as S from './AdminStyle';
import AdminModal from '../AdminModal/AdminModal';
import ReactSelect from 'react-select';
import { MdDeleteOutline } from "react-icons/md";
import { IoStopCircleOutline } from "react-icons/io5";
import { ResponsiveLine } from '@nivo/line'

function Admin() {
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState?.data?.data;
    const [ page, setPage ] = useState(1);
    const [ selectedChallenge, setSelectedChallenge ] = useState(null);
    const [ isModalOpen, setModalOpen ] = useState(false);
    const [ challengeList, setChallengeList ] = useState([]);
    const [ isChallengeListRefetch, setIsChallengeListRefetch ] = useState(false);
    const [ chartData, setChartData ] = useState([]);
    const lastChallengeRef = useRef();
    const [ sort, setSort ] = useState('latest');
    const [ dateDifference, setDateDifference ] = useState(null);

    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    const options = [
        {value: "전체", label: "전체"},
        {value: "챌린지제목", label: "챌린지제목"},
        {value: "카테고리이름", label: "카테고리이름"}
    ];

    const search = {
        optionName: options[0].label,
        searchValue: ""
    }

    const [ searchParams, setSearchParams ] = useState(search);

    const getChallengeList = useQuery(["getChallengeList"], async () => {
        const option = {
            params: { ...searchParams, sort }
        }

        return await instance.get(`/api/challenges/${page}`, option);
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: isChallengeListRefetch,
        onSuccess: (response) => {
            setChallengeList([
                ...challengeList
            ].concat(response.data));
            setIsChallengeListRefetch(false);
            setPage(page + 1);
        }
    });

    const getChartData = useQuery(["getChartData"], async () => {
        try {
            const dailyChallengesResponse = await instance.get('/api/admin/challengers/count', option);
            const dailyMembersResponse = await instance.get('/api/admin/members/count', option);
            const dailyFeedResponse = await instance.get('/api/admin/feed/count', option);
            const dailyChallengeCompletedResponse = await instance.get('/api/admin/challenges/completed/count', option);
            const dailyChallengeDeletedResponse = await instance.get('/api/admin/challenges/deleted/count', option);
    
            if (
                dailyChallengesResponse.data &&
                dailyMembersResponse.data &&
                dailyFeedResponse.data&&
                dailyChallengeCompletedResponse.data&&
                dailyChallengeDeletedResponse.data
            ) {
                setChartData(prevData => [
                    ...prevData,
                    {
                        id: "총 챌린지 수",
                        data: dailyChallengesResponse.data.map(data => ({
                            x: data.date,
                            y: data.count
                        })),
                    },
                    {
                        id: "총 피드 수",
                        data: dailyFeedResponse.data.map(data => ({
                            x: data.date,
                            y: data.count
                        })),
                    },
                    {
                        id: "삭제된 챌린지 수",
                        data: dailyChallengeDeletedResponse.data.map(data => ({
                            x: data.date,
                            y: data.count
                        })),
                    },
                    {
                        id: "종료된 챌린지 수",
                        data: dailyChallengeCompletedResponse.data.map(data => ({
                            x: data.date,
                            y: data.count
                        })),
                    },
                    {
                        id: "총 회원 수",
                        data: dailyMembersResponse.data.map(data => ({
                            x: data.date,
                            y: data.count
                        })),
                    },
                ]);
            }
        } catch (error) {
            console.error(error);
        }
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
        }
    });

    useEffect(() => {
        if(page === 1) {
            setChallengeList([]);
            getChallengeList.refetch();
        }
    }, [page])

    useEffect(() => {
        setPage(1);
        setChallengeList([]);
    }, [sort])

    useEffect(() => {
        const observerService = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setIsChallengeListRefetch(true);
                }
            });
        }

        const observer = new IntersectionObserver(observerService, {threshold: 0.1});
        observer.observe(lastChallengeRef.current);
    }, []);

    const handleChallengeClick = (challenge) => {
        setSelectedChallenge(challenge);
        setModalOpen(true);
    };

    const handleChallengeStopClick = async (challenge) => {
        setSelectedChallenge(challenge);

        setSelectedChallenge(prevChallenge => {
            const challengeId = prevChallenge
            const stop = window.confirm(`${challengeId}번 챌린지를 정말 중단 시키겠습니까?`);
            
            if(stop){
                const response = instance.put(`/api/challenge/stop/${challengeId}`)
                if(response){
                    alert("중단 되었습니다.");
                    setPage(1);
                }else {
                    alert("error")
                }
            }
        });    
    };

    const handleChallengeDeleteClick = (challenge) => {
        setSelectedChallenge(challenge);

        setSelectedChallenge(prevChallenge => {
            const challengeId = prevChallenge
            const stop = window.confirm(`${challengeId}번 챌린지를 삭제 시키겠습니까?`);
            
            if(stop){
                const response = instance.put(`/api/challenge/hidden/${challengeId}`)
                if(response){
                    alert("삭제 되었습니다.");
                    setPage(1);
                }else {
                    alert("error")
                }
            }
        });    
    };
    
    const handleCloseModal = () => {
        setSelectedChallenge(null);
        setModalOpen(false);
    };

    const handleSearchButtonClick = () => {
        setPage(1);
    }

    const calculateDaysElapsed = (startDate) => {
        const today = new Date();
        const start = new Date(startDate);
        const timeDifference = today.getTime() - start.getTime();
        const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24) + 1) + 1;
        return daysElapsed;
    };

    const handleSearchInputChange = (e) => {
        setSearchParams({
            ...searchParams,
            searchValue: e.target.value
        })
    }

    const handleSearchOptionSelect = (option) => {
        setSearchParams({
            ...searchParams,
            optionName: option.label
        })
    }

    const handleCheckboxChange = async (event) => {
        setSort(event.target.value);
        setPage(1);
    };

    const MyResponsiveLine = ({ data }) => {
        const sortedData = data.map(item => ({
            id: item.id,
            data: item.data.sort((a, b) => new Date(a.x) - new Date(b.x))
        }));

        console.log(sortedData)
        return (
            <ResponsiveLine
                data={sortedData}
                height={200}
                margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 10,
                }}
                yFormat=" >-.2f"
                gridYValues={[0, 5, 10, 15, 20, 25, 30]}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                pointSize={5}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        )
    }

    console.log(getChallengeList)

    return (
        <div css={S.Layout}>
            <div css={S.UserBox}>
                <div css={S.ImgLayout}>
                    <div css={S.ImgBoxImg}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/challengewithus-1ffef.appspot.com/o/files%2Ffree-icon-crown-931979.png?alt=media&token=f801604e-ee4d-4465-bbcb-9eacb448adab" alt="" />
                    </div>
                    <div css={S.ProfileImgBox}>
                        <img src={principal.profileUrl} alt="" />
                    </div>
                </div>
                <div css={S.ProfileBox}>
                    <div css={S.ProfileText}>
                        <p>
                            {principal.nickname}
                        </p>
                    </div>
                </div>
            </div>
                <div css={S.Alignment}>
                    <div>
                        <input type="radio" name="radioGroup" id="radio1" onChange={handleCheckboxChange} value="latest" defaultChecked={true}/>
                        <label htmlFor="radio1">최신순</label>
                        <input type="radio" name="radioGroup" id="radio2" onChange={handleCheckboxChange} value="oldest"/>
                        <label htmlFor="radio2">오래된순</label>
                        <input type="radio" name="radioGroup" id="radio3" onChange={handleCheckboxChange} value="popular"/>
                        <label htmlFor="radio3">인기순</label>
                        <input type="radio" name="radioGroup" id="radio4" onChange={handleCheckboxChange} value="participants"/>
                        <label htmlFor="radio4">참여자많은순</label>
                        <input type="radio" name="radioGroup" id="radio5" onChange={handleCheckboxChange} value="hidden"/>
                        <label htmlFor="radio5">삭제된 챌린지</label>
                        <input type="radio" name="radioGroup" id="radio6" onChange={handleCheckboxChange} value="stop"/>
                        <label htmlFor="radio6">중단된 챌린지</label>
                    </div>
                    <div css={S.searchContainer}>
                        <ReactSelect options={options} defaultValue={options[0]} onChange={handleSearchOptionSelect}/>
                        <input type="text" onChange={handleSearchInputChange} />
                        <button onClick={handleSearchButtonClick}>검색</button>
                    </div>
                </div>
            <ul css={S.SChallengeList}>
                <div css={S.SChallengeListHeader}>
                    <li>
                        <div>ChallengeName</div>
                        <div>Category</div>
                        <div>Founder</div>
                        <div>Day</div>
                        <div>Like</div>
                    </li>
                </div>
                <div css={S.SChallengeListBody}>
                    {challengeList?.map((myChallenge) => (
                        <li key={myChallenge.challengeId}>
                            <div onClick={() => handleChallengeClick(myChallenge.challengeId)}>{myChallenge.challengeName}</div>
                            <div onClick={() => handleChallengeClick(myChallenge.challengeId)}>{myChallenge.categoryName}</div>
                            <div onClick={() => handleChallengeClick(myChallenge.challengeId)}>{myChallenge.name}</div>
                            <div onClick={() => handleChallengeClick(myChallenge.challengeId)}>{calculateDaysElapsed(myChallenge.startDate)}일차</div>
                            <div onClick={() => handleChallengeClick(myChallenge.challengeId)}>{myChallenge.likeCount}</div>
                            <button css={S.StopButton} onClick={() => handleChallengeStopClick(myChallenge.challengeId)}><IoStopCircleOutline /></button>
                            <button css={S.Deletebutton} onClick={() => handleChallengeDeleteClick(myChallenge.challengeId)}><MdDeleteOutline /></button>
                        </li>
                    ))}
                    <li ref={lastChallengeRef}></li>
                </div>
            </ul>
            {isModalOpen && (
                <div css={S.ModalOverlay}>
                    <div css={S.ModalContent}>
                        <AdminModal onClose={handleCloseModal} challengeDetails={selectedChallenge} />
                    </div>
                </div>
            )}
            <div css={S.Chart}>
                <h2>Challenge Chart</h2>
                <MyResponsiveLine data={chartData} />
            </div>
        </div>
    );
}

export default Admin;

