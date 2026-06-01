import { Link } from 'react-router-dom'
import styles from './AssignmentBox.module.css'


// 날짜 변환
function formatDate(dateStr) {
  return dateStr.slice(5).replace('-', '.')
}



function AssignmentBox({ assignments, courseId }) {
  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <span>📝</span>
        <span>과제</span>
        <Link to={`/courses/${courseId}/assignments`} className={styles.more}>더보기 →</Link>

      </div>
      <ul className={styles.list}>
        {assignments.map((assignment) => (
          <li key={assignment.id} className={styles.item}>
            <span className={styles.title}>· {assignment.title}</span>
            {/* due_date 있으면 마감일, 없으면 created_at(등록일) 표시 */}
            <span className={styles.pending}>
              {formatDate(assignment.due_date || assignment.due || assignment.created_at || '')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AssignmentBox
