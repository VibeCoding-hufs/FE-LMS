import Card from '../Card/Card'
import CourseCard from '../CourseCard/CourseCard'
import styles from './EnrolledCourses.module.css'

// courses 배열을 받아 카드 그리드로 렌더링하는 컴포넌트
export default function EnrolledCourses({ courses }) {
  if (!courses || courses.length === 0) {
    return <Card title="내 수강 과목"><p className={styles.state}>수강 중인 과목이 없습니다.</p></Card>
  }

  return (
    <Card title="내 수강 과목">
      <ul className={styles.grid}>
        {courses.map(course => (
          <li key={course.id}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </Card>
  )
}
