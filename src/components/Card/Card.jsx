import styles from './Card.module.css'

export default function Card({ title, action, children }) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <span>{title}</span>
        {action && <div className={styles.action}>{action}</div>}
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  )
}
