import { diffDays } from '../../data/date'
import styles from './DdayTodo.module.css'

function getBadge(dateStr, done) {
  if (done) return { text: '완료', cls: styles.badgePast }
  const n = diffDays(dateStr)
  if (n < 0)   return { text: `D+${Math.abs(n)}`, cls: styles.badgePast   }
  if (n === 0)  return { text: 'D-DAY',            cls: styles.badgeToday  }
  if (n <= 3)   return { text: `D-${n}`,            cls: styles.badgeUrgent }
  return               { text: `D-${n}`,            cls: ''                 }
}

export default function DdayItem({ todo, onToggle }) {
  const { text, cls } = getBadge(todo.date, todo.done)

  return (
    <li className={`${styles.item} ${todo.done ? styles.done : ''}`}>
      <span className={`${styles.badge} ${cls}`}>{text}</span>
      <div className={styles.info}>
        <span className={styles.title}>{todo.title}</span>
        <span className={styles.date}>{todo.date}</span>
      </div>
      <input
        type="checkbox"
        className={styles.check}
        checked={todo.done}
        onChange={onToggle}
        aria-label="완료"
      />
    </li>
  )
}
