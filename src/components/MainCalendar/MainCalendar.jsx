import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { instance } from '../../api/config/instance';
import Calendar from 'react-calendar';
/** @jsxImportSource @emotion/react */
import * as S from './MainCalendarStyle';


function MainCalendar(props) {
    const [ checkedDates, setCheckedDates ] = useState([]);
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    useEffect(() => {
        const fetchCheckedDates = async () => {
            try {
                const response = await instance.get("api/attendance", option);
                const filteredDates = response.data.filter(item => item.userId !== 1 && item.userId !== 2);
                setCheckedDates(filteredDates);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCheckedDates();
    }, []);


    return (
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
    );
}

export default MainCalendar;