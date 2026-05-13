import styles from './CoursePage.module.css'

// 공지사항 탭: 중요 공지는 '중요' 뱃지와 함께 표시
export default function NoticeList({ notices }) {
  return (
    <ul className={styles.list}>
      {notices.map(n => (
        <li key={n.id} className={`${styles.listItem} ${n.important ? styles.important : ''}`}>
          {n.important && <span className={styles.importantBadge}>중요</span>}
          <span className={styles.itemTitle}>{n.title}</span>
          <span className={styles.itemDate}>{n.date}</span>
        </li>
      ))}
    </ul>
  )
}
