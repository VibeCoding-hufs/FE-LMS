import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './SubjectList.module.css'
import { CoursesContext } from '../../data/CoursesContext'

function SubjectList() {
  // App.jsx에서 제공한 수강 과목 목록을 가져옴 (서버 API 결과)
  const courses = useContext(CoursesContext)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>수강과목</h2>
      <ul className={styles.list}>

        {/* 아직 로딩 중인 경우 */}
        {courses.length === 0 && (
          <li className={styles.item} style={{ color: '#aaa' }}>불러오는 중...</li>
        )}

        {/* 서버 과목 목록: course.id는 숫자(서버 PK), course.name은 과목명 */}
        {courses.map((course) => (
          <li key={course.id} className={styles.item}>
            <Link to={`/courses/${course.id}`}>{course.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SubjectList
