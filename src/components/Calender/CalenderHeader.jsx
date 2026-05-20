import styles from './Calender.module.css';

// 달력 월 이동
function CalenderHeader({ year, month, onPrev, onNext }) {
  return (
    <div className={styles.header}>
      <button onClick={onPrev}>{'<'}</button>
      <span>{year}년 {month + 1}월</span>
      <button onClick={onNext}>{'>'}</button>
    </div>
  );
}

export default CalenderHeader;
