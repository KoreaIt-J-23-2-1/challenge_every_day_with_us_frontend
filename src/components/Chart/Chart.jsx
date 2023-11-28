import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { ResponsiveLine } from '@nivo/line';
import { useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';

function Chart(props) {
    const [chartData, setChartData] = useState([]);
    const [xLabel, setXLabel] = useState([]);
    const queyrClient = useQueryClient().getQueryState("getPrincipal");
    const principal = queyrClient?.data?.data;
    const location = useLocation();
    const isMainPage = location.pathname === '/main';
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    const getChartData = useQuery(["getChartData"], async () => {
        try {
            // 요청을 날리는건 5번을 날려도 서버에서 
            const dailyChallengesResponse = await instance.get('/api/admin/challengers/count', option);
            const dailyMembersResponse = await instance.get('/api/admin/members/count', option);
            const dailyFeedResponse = await instance.get('/api/admin/feed/count', option);
            const dailyChallengeCompletedResponse = await instance.get('/api/admin/challenges/completed/count', option);
            const dailyChallengeDeletedResponse = await instance.get('/api/admin/challenges/deleted/count', option);
    
            let xDatas = [];

            if (
                dailyChallengesResponse.data &&
                dailyMembersResponse.data &&
                dailyFeedResponse.data&&
                dailyChallengeCompletedResponse.data&&
                dailyChallengeDeletedResponse.data
                ) {

                dailyChallengesResponse.data.forEach(data => xDatas.push(data.date));
                dailyMembersResponse.data.forEach(data => xDatas.push(data.date));
                dailyFeedResponse.data.forEach(data => xDatas.push(data.date));
                dailyChallengeCompletedResponse.data.forEach(data => xDatas.push(data.date));
                dailyChallengeDeletedResponse.data.forEach(data => xDatas.push(data.date));
                
                const removedDuplicatYData = new Set(xDatas);

                xDatas = [...removedDuplicatYData]
                xDatas.sort((a, b) => {
                    const aDate = new Date(a).getTime();
                    const bDate = new Date(b).getTime();
                    return aDate > bDate ? 1 : -1;
                });

                setXLabel(xDatas);

                setChartData(prevData => [
                    ...prevData,
                    {
                        id: "목록",
                        data: xDatas.map(data => ({
                            x: data
                        }))
                    },
                    {
                        id: "총 회원 수",
                        data: dailyMembersResponse.data.map(data => ({
                            x: data.date,
                            y: data.count
                        })).sort((a, b) => {
                            const aDate = new Date(a.x).getTime();
                            const bDate = new Date(b.x).getTime();
                            return aDate > bDate ? 1 : -1;
                        }),
                    },
                    {
                        id: "작성된 피드 수",
                        data: dailyFeedResponse.data.map(data => ({
                            x: data.date,
                            y: data.count
                        })).sort((a, b) => {
                            const aDate = new Date(a.x).getTime();
                            const bDate = new Date(b.x).getTime();
                            return aDate > bDate ? 1 : -1;
                        }),
                    },
                    {
                        id: "종료된 챌린지 수",
                        data: dailyChallengeCompletedResponse.data.map(data => ({
                            x: data.date,
                            y: data.count
                        })).sort((a, b) => {
                            const aDate = new Date(a.x).getTime();
                            const bDate = new Date(b.x).getTime();
                            return aDate > bDate ? 1 : -1;
                        }),
                    },
                    {
                        id: "삭제된 챌린지 수",
                        data: dailyChallengeDeletedResponse.data.map(data => ({
                            x: data.date,
                            y: data.count
                        })).sort((a, b) => {
                            const aDate = new Date(a.x).getTime();
                            const bDate = new Date(b.x).getTime();
                            return aDate > bDate ? 1 : -1;
                        }),
                    },
                    {
                        id: "총 챌린지 수",
                        data: dailyChallengesResponse.data.map(data => ({
                            x: data.date,
                            y: data.count
                        })).sort((a, b) => {
                            const aDate = new Date(a.x).getTime();
                            const bDate = new Date(b.x).getTime();
                            return aDate > bDate ? 1 : -1;
                        }),
                    },
                ]);

                return null;
            }
        } catch (error) {
            console.error(error);
        }
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
        enabled:principal?.isAdmin === 1,
        onSuccess: (response) => {
            console.log("실행?")
        }
    });

    console.log(chartData)

    const MyResponsiveLine = ({ data }) => {
        const legends = data
        .filter(item => item.id !== "")  // Filter out items with empty id
        .map(item => ({
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
        }));

        return (
            <ResponsiveLine
                data={data}
                height={300}
                width={1000}
                margin={{ top: 20, right: 180, bottom: 100, left: 80 }}
                xScale={{ type: 'point', format: '%Y-%m-%d', precision: 'day' }}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 20,
                }}
                yFormat=" >-.2f"
                gridYValues={[0, 5, 10, 15, 20, 25, 30]}
                axisTop={null}
                axisRight={null}
                axisBottom={{
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


    //메인화면 통계
    const MainResponsiveLine = ({ data }) => {
        return (
            <ResponsiveLine
                data={data}
                height={400}
                width={900}
                margin={{ top: 40, right: 200, bottom: 50, left: 50 }}
                xScale={{ type: 'point', format: '%Y-%m-%d', precision: 'day' }}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 20,
                }}
                yFormat=" >-.2f"
                gridYValues={[0, 5, 10, 15, 20, 25, 30]}
                axisTop={null}
                axisRight={null}
                x
                axisBottom={{
                    tickValues: xLabel,
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
                        symbolBorderColor: 'rgba(0, 0, 0, 0)',
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

    console.log(isMainPage)

    return (
        <>
            {
                isMainPage ? <MainResponsiveLine data={chartData} /> : <MyResponsiveLine data={chartData} />
            }
        </>
    );
}

export default Chart;