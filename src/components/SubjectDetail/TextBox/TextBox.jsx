import styles from './TextBox.module.css'

//짜바리?
function TextBox({ icon, title, message }) {
  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div className={styles.body}>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  )
}

export default TextBox
