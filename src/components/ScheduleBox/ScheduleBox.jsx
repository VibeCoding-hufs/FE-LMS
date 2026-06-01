import { useState } from 'react'
import styles from './ScheduleBox.module.css'
import { COURSES } from '../../data/courses'

// 남은 날수 계산
function getDday(dueDate) {
  const today = new Date()
  const due = new Date(dueDate)
  const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'D-Day'
  if (diff < 0) return `D+${Math.abs(diff)}`
  return `D-${diff}`
}



function ScheduleBox() {


  const [checked, setChecked] = useState([])


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
    if (!found) {
      newChecked.push(id) 
      
    }
    setChecked(newChecked)
  }


  const allItems = []
  const courseList = Object.values(COURSES)
  for (let i = 0; i < courseList.length; i++) {
    const course = courseList[i]
    for (let j = 0; j < course.assignments.length; j++) {
      const a = course.assignments[j]
      // 아직 제출 안 한 항목만 추가
      if (a.status === 'pending') {
        allItems.push({
          id: course.id + '-' + a.id,
          subject: course.subject,
          title: a.title,
          due: a.due,
        })
      }
    }
  }



  
  return (
    <div className={styles.container}>
      <div className={styles.header}>진행 일정</div>
      <ul className={styles.list}>
        {allItems.length === 0 && (
          <li className={styles.empty}>진행 중인 일정이 없습니다.</li>
        )}
        {allItems.map((item) => {
          // 이 항목이 체크됐는지 확인
          let isChecked = false
          for (let i = 0; i < checked.length; i++) {
            if (checked[i] === item.id) {
              isChecked = true
            }
          }

          return (
            <li
              key={item.id}
              className={isChecked ? styles.itemDone : styles.item}
            >
              {/* 체크박스 */}
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={isChecked}
                onChange={() => toggle(item.id)}
              />
              {/* 과목명 + 과제명 */}
              <div className={styles.info}>
                <span className={styles.subject}>{item.subject}</span>
                <span className={styles.title}>{item.title}</span>
              </div>
              {/* D-day */}
              <span className={styles.dday}>{getDday(item.due)}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ScheduleBox
