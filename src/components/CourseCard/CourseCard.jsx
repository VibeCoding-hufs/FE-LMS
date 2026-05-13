import { Link } from 'react-router-dom'
import styles from './CourseCard.module.css'

const COLOR_MAP = {
  1: '#3C8794',
  2: '#7b68c8',
  3: '#e87b3b',
  4: '#3b9e6b',
  5: '#cc5555',
}

export default function CourseCard({ course }) {
  const accentColor = COLOR_MAP[course.color] ?? COLOR_MAP[1]

  return (
    <Link to={`/course/${course.id}`} className={styles.card}>
      <span className={styles.accent} style={{ background: accentColor }} />
      <div className={styles.body}>
        <strong className={styles.subject}>{course.subject}</strong>
        <span className={styles.meta}>
          {course.professor} · {course.schedule}
        </span>
        <span className={styles.room}>{course.room}</span>
      </div>
      <span className={styles.credits}>{course.credits}학점</span>
      <span className={styles.arrow}>›</span>
    </Link>
  )
}
