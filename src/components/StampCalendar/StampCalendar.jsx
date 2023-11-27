import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { instance } from '../../api/config/instance';
import Calendar from 'react-calendar';
/** @jsxImportSource @emotion/react */
import * as S from './StampCalendarStyle';
import { useQuery } from 'react-query';


function StampCalendar(props) {

    const [ value, onChange ] = useState(new Date());
    const [ checkedDates, setCheckedDates ] = useState([]);
    const [ isCheckedIn, setIsCheckedIn ] = useState(false);
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    const getCheck = useQuery(["getCheck"], async () => {
        try{
            const response = await instance.get('/api/stamp', option);
            if(response.data) {
                setIsCheckedIn(true);
            }
            return response.data;
        }catch(error) {
            throw new Error(error);
        }
    }, {
        retry: 0,
        refetchOnWindowFocus: false,
    })

    const handleCheckIn = async () => {
        try {
            if(!!getCheck){
                const response = await instance.post('/api/attendance', {
                    attendance: moment(value).format('YYYY-MM-DD'),
                }, option);
                alert("50포인트가 적립되었습니다.")
                if (response.data) {
                    setCheckedDates([...checkedDates, moment(value).toDate()]);
                    window.location.reload();
                } else {
                }
            }else {
                alert("하루에 한번만 출석 가능합니다.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchCheckedDates = async () => {
            try {
                const response = await instance.get("api/attendance", option);
                if (response.status === 200) {
                    setCheckedDates(response.data);
                } else {
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCheckedDates();
    }, []);

    const isDateChecked = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        return checkedDates.some((item) => moment(item.attendance).format('YYYY-MM-DD') === formattedDate);
    };

    return (
        <div css={S.calendarLayout}>
            <div css={S.calendar}>
                <div css={S.calendarHeader}>
                    <div>
                        <b>오늘의 날짜 </b> {moment(value).format('YYYY년 MM월 DD일')}
                    </div>
                    
                </div>
                <div css={S.calendarContainer}>
                    <Calendar
                        defaultView={"month"}
                        formatDay={(local, date) => moment(date).format('DD')}
                        tileClassName={({date}) => {
                                const formattedDate = moment(date).startOf('day').format('YYYY-MM-DD');
                                const matchingDates = checkedDates.filter(item => {
                                        const attendanceDate = moment(item.attendance).startOf('day').format('YYYY-MM-DD');
                                        return attendanceDate === formattedDate;
                                    }
                                );
                                return matchingDates.length > 0 ? "checked-attendance" : "";
                            }
                        }
                    />
                </div>
                <div css={S.checkInButtonContainer}>
                    <div css={S.checkInButton}>
                        <button onClick={handleCheckIn} disabled={isCheckedIn}>
                            {isCheckedIn ? '이미 출석했습니다' : '출석체크'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StampCalendar;