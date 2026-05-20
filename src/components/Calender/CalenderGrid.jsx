import styles from './Calender.module.css';
import { DAY_LIST } from '../../data/calendar';



// 요일 헤더와 날짜 그리드를 렌더링
function CalenderGrid({ weeks, month }) {
  return (
    <>
      {/* 요일 헤더 */}

      <div className={styles.dayList}>
        {DAY_LIST.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      {/* 날짜 그리드 */}

      {weeks.map((week, i) => (
        <div key={i} className={styles.week}>
          {week.map((date, j) => (
            <span
              key={j}
              className={date.getMonth() !== month ? styles.otherMonth : ''}
            >
              {date.getDate()}
            </span>
          ))}
        </div>
      ))}

    </>
  );
}

export default CalenderGrid;
