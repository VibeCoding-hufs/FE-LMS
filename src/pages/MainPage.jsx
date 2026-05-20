import Calender from '../components/Calender/Calender'
import Footer from '../components/Footer/Footer'
import SubjectList from '../components/SubjectList/SubjectList'
import styles from './MainPage.module.css'

// 메인 페이지: 수강 과목 목록, 캘린더 등을 보여주는 홈 화면
export default function MainPage() {
  return (
    <>
      <div className={styles.wrap}>
        <main className={styles.main}>
          <Calender />
          <SubjectList/>
        </main>
      </div>
      <Footer />
    </>
  )
}
