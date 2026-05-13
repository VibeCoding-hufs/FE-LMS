import { useState } from 'react'
import { todayISO } from '../../data/date'
import styles from './DdayTodo.module.css'

export default function AddTodoForm({ onAdd, onCancel }) {
  const today = todayISO()
  const [title, setTitle] = useState('')
  const [date,  setDate]  = useState(today)

  function handleSubmit(e) {
    e.preventDefault()
    if (title.trim() && date) onAdd(title.trim(), date)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="할일 제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        autoFocus
      />
      <input
        type="date"
        value={date}
        min={today}
        onChange={e => setDate(e.target.value)}
        required
      />
      <div className={styles.formBtns}>
        <button type="submit"  className={styles.confirm}>추가</button>
        <button type="button"  className={styles.cancel}  onClick={onCancel}>취소</button>
      </div>
    </form>
  )
}
