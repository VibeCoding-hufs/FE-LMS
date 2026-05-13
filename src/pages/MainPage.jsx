import CalendarWidget     from '../components/CalendarWidget/CalendarWidget'
import EnrolledCourses    from '../components/EnrolledCourses/EnrolledCourses'
import Timetable          from '../components/Timetable/Timetable'
import DdayTodo           from '../components/DdayTodo/DdayTodo'
import Footer             from '../components/Footer/Footer'
import { COURSES, getAssignmentsByDate } from '../data/courses'
import styles             from './MainPage.module.css'

// COURSES 객체를 배열로 변환하여 수강 과목 목록으로 사용
const courses = Object.values(COURSES)

// 과제를 마감일별로 그룹화하여 달력 위젯에 전달
const assignmentsByDate = getAssignmentsByDate()

export default function MainPage() {
  return (
    <>
      <div className={styles.wrap}>

        <main className={styles.main}>
          <CalendarWidget assignmentsByDate={assignmentsByDate} />
          <EnrolledCourses courses={courses} />
          <Timetable />
        </main>

        <aside className={styles.sidebar}>
          <DdayTodo />
        </aside>

      </div>

      <Footer />
    </>
  )
}
