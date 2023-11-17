import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as S from './Style';

function StampPage(props) {
    const [value, onChange] = useState(new Date());
    const [checkedDates, setCheckedDates] = useState([]);

    const handleCheckIn = () => {
        setCheckedDates(value);
    };

    useEffect(() => {
        const savedCheckedDates = JSON.parse(localStorage.getItem('checkedDates'));
        if (savedCheckedDates) {
            setCheckedDates(savedCheckedDates);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('checkedDates', JSON.stringify(checkedDates));
    }, [checkedDates]);

    return (
        <div>
            <div>
                <div>
                    Today: 
                </div>
                {moment(value).format('YYYY년 MM월 DD일')}
            </div>
            <div css={S.calendarContainer}>
                <Calendar
                    onChange={onChange}
                    value={value}
                    formatDay={(local, date) => moment(date).format('DD')}
                    tileClassName={({ date }) => {
                        if (moment(date).isSame(checkedDates, 'day')) {
                            return 'checked-circle';
                        }
                    }}
                />
            </div>
            <button onClick={handleCheckIn}>출석체크</button>
            <div>
                {checkedDates && (
                    <p>출석체크 날짜: {moment(checkedDates).format('YYYY년 MM월 DD일')}</p>
                )}
            </div>
        </div>
    );
}

export default StampPage;
