import { Link } from 'react-router-dom'
import styles from './Timetable.module.css'

export default function TimetableClass({ subject, start, end, room, color, top, height, courseId }) {
  return (
    <Link
      to={`/course/${courseId}`}
      className={`${styles.classBlock} ${styles[`color${color}`] ?? styles.color1}`}
      style={{ top: `${top}px`, height: `${height}px` }}
      title={subject}
    >
      <strong>{subject}</strong>
      <span className={styles.time}>{start}–{end}</span>
      {height >= 50 && <span className={styles.room}>{room}</span>}
    </Link>
  )
}
