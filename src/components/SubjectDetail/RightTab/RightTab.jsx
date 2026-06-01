import { useState } from 'react'
import styles from './RightTab.module.css'



function RightTab({ course }) {
  // 체크된 항목 id 목록
  const [checked, setChecked] = useState([])

  // 클릭한 id가 checked에 있으면 제거, 없으면 추가
  function toggle(id) {
    const newChecked = []
    let found = false
    for (let i = 0; i < checked.length; i++) {
      if (checked[i] === id) {
        found = true
      } else {
        newChecked.push(checked[i])
      }
    }
    if (!found) newChecked.push(id)
    setChecked(newChecked)
  }

  const assignments = course.assignments || []

  return (
    <div className={styles.container}>
      <div className={styles.header}>진행 일정</div>
      <ul className={styles.list}>

        {assignments.length === 0 && (
          <li className={styles.empty}>진행 중인 일정이 없습니다.</li>
        )}

        {assignments.map((assignment) => {
          // 체크됐는지 확인
          let isChecked = false
          for (let i = 0; i < checked.length; i++) {
            if (checked[i] === assignment.id) {
              isChecked = true
            }
          }

          return (
            <li
              key={assignment.id}
              className={isChecked ? styles.itemDone : styles.item}
            >
              {/* 체크박스 */}
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={isChecked}
                onChange={() => toggle(assignment.id)}
              />

              {/* 과제명 */}
              <span className={styles.title}>{assignment.title}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RightTab
