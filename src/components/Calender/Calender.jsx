import { useState } from 'react';
import styles from './Calender.module.css';
import { groupDatesByWeek } from '../../data/calendar';
import CalenderHeader from './CalenderHeader';
import CalenderGrid from './CalenderGrid';

//얘가 메인 캘린더임


function Calender() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();


  // 이달의 첫날 기준으로 달력 시작 계산
  const firstDayOfMonth = new Date(year, month, 1); //연월일
  const startDay = new Date(firstDayOfMonth);

  startDay.setDate(1 - firstDayOfMonth.getDay());

  
  // 막날 기준 끝 계산
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const endDay = new Date(lastDayOfMonth);

  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));


  const weeks = groupDatesByWeek(startDay, endDay);




  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));




  return (
    <div className={styles.calender}>

      <CalenderHeader
        year={year}
        month={month}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />

      <CalenderGrid weeks={weeks} month={month} />

    </div>
  );
}

export default Calender;
