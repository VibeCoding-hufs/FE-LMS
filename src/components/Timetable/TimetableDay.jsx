import TimetableClass from './TimetableClass'
import styles from './Timetable.module.css'

export default function TimetableDay({ label, date, isToday, classes }) {
  return (
    <div className={`${styles.day} ${isToday ? styles.todayCol : ''}`}>
      <div className={styles.dayHeader}>
        {label}
        <span className={styles.dayDate}>{date.getMonth() + 1}/{date.getDate()}</span>
      </div>
      {classes.length === 0
        ? <p className={styles.empty}>-</p>
        : classes.map((cls, i) => <TimetableClass key={i} {...cls} />)
      }
    </div>
  )
}
