import { diffDays } from '../data/date'
import styles from './CoursePage.module.css'

// 과제 탭: 마감일까지 남은 일수(D-Day)와 제출 상태를 항목마다 표시
export default function AssignmentList({ assignments }) {
  return (
    <ul className={styles.list}>
      {assignments.map(a => {
        const n = diffDays(a.due)
        const submitted = a.status === 'submitted'
        const badgeText = submitted  ? '제출완료'
          : n < 0   ? `D+${Math.abs(n)}`
          : n === 0 ? 'D-DAY'
          : `D-${n}`
        const badgeCls = submitted  ? styles.badgeSubmitted
          : n < 0   ? styles.badgePast
          : n === 0 ? styles.badgeToday
          : n <= 3  ? styles.badgeUrgent
          : styles.badgeNormal

        return (
          <li key={a.id} className={`${styles.listItem} ${submitted ? styles.submitted : ''}`}>
            <span className={`${styles.ddayBadge} ${badgeCls}`}>{badgeText}</span>
            <span className={styles.itemTitle}>{a.title}</span>
            <span className={styles.itemDate}>마감 {a.due}</span>
            {!submitted && (
              <button className={styles.submitBtn}>제출하기</button>
            )}
          </li>
        )
      })}
    </ul>
  )
}
