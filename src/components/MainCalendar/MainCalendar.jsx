import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { instance } from '../../api/config/instance';
import Calendar from 'react-calendar';
/** @jsxImportSource @emotion/react */
import * as S from './MainCalendarStyle';
import { useQuery } from 'react-query';


function MainCalendar(props) {

    const [ checkedDates, setCheckedDates ] = useState([]);
    const [ isCheckedIn, setIsCheckedIn ] = useState(false);
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

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