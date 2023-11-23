import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { instance } from '../../api/config/instance';

function StampPage(props) {
    const [ value, onChange ] = useState(new Date());
    const [ checkedDates, setCheckedDates ] = useState([]);
    const [ isCheckedIn, setIsCheckedIn ] = useState(false);
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }


    const handleCheckIn = async () => {
        try {
            const response = await instance.post('/api/attendance', {
                attendance: moment(value).format('YYYY-MM-DD'),
            }, option);
            if (response.data.success) {
                setCheckedDates([...checkedDates, moment(value).toDate()]);
                setIsCheckedIn(true);
            } else {
            }
        } catch (error) {
            console.error(error);
        }
    };

    console.log(checkedDates)

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
        <div>
            <div>
                <div>
                    오늘 날짜: 
                </div>
                {moment(value).format('YYYY년 MM월 DD일')}
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
                            return matchingDates.length > 0 ? "checked-circle" : "";
                        }
                    }

                />
            </div>
            <button onClick={handleCheckIn} disabled={isCheckedIn}>
                {isCheckedIn ? '이미 출석했습니다' : '출석체크'}
            </button>
        </div>
    );
}

export default StampPage;