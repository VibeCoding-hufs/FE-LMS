import Calender from '../components/Calender/Calender'
import Footer from '../components/Footer/Footer'
import SubjectList from '../components/SubjectList/SubjectList'
import ScheduleBox from '../components/ScheduleBox/ScheduleBox'
import styles from './MainPage.module.css'




// 메인 페이지: 수강 과목 목록, 캘린더, 전체 일정을 보여주는 홈 화면
export default function MainPage() {
  return (
    <>
      <div className={styles.wrap}>
        {/* 왼쪽 메인 영역 */}
        <main className={styles.main}>
          <Calender />
          <SubjectList />
        </main>

        {/* 오른쪽 사이드바: 전체 과목 진행 일정 */}
        <div className={styles.sidebar}>
          <ScheduleBox />
        </div>
      </div>
      <Footer />
    </>
  )
}
