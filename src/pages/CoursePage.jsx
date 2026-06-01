import { useState, useEffect, useContext } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer/Footer'
import styles from './CoursePage.module.css'
import LeftTab from '../components/SubjectDetail/LeftTab/LeftTab'
import MiddleTab from '../components/SubjectDetail/MiddleTab/MiddleTab'
import RightTab from '../components/SubjectDetail/RightTab/RightTab'
import { CoursesContext } from '../data/CoursesContext'



export default function CoursePage() {
  const { courseId } = useParams()
  const location = useLocation()

  // App.jsx의 Context에서 전체 과목 목록을 가져와 현재 과목을 찾음
  const courses = useContext(CoursesContext)
  const course = courses.find(c => c.id === Number(courseId)) || null

  // 다른 페이지에서 LeftTab 클릭 시 넘어온 탭 정보 반영
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || null)

  // 서버에서 받아온 공지·과제 목록
  const [serverNotices, setServerNotices] = useState([])
  const [serverAssignments, setServerAssignments] = useState([])

  useEffect(() => {
    // 로그인 안 했으면 데모 계정(userId=1) 사용
    const userId = localStorage.getItem('userID') || '1'

    // 공지 목록: 응답이 배열 직접 반환
    axios.get(`https://kikoky.duckdns.org/${userId}/courses/${courseId}/notices/`)
      .then((res) => {
        setServerNotices(Array.isArray(res.data) ? res.data : res.data.notices || [])
      })
      .catch((err) => console.error('공지 불러오기 실패:', err))

    // 과제 목록: 응답이 { assignments: [...] } 형태
    axios.get(`https://kikoky.duckdns.org/${userId}/courses/${courseId}/assignments/`)
      .then((res) => {
        setServerAssignments(res.data.assignments || [])
      })
      .catch((err) => console.error('과제 불러오기 실패:', err))
  }, [courseId])

  // 과목 목록은 왔지만 해당 ID가 없는 경우
  if (courses.length > 0 && !course) {
    return (
      <div className={styles.wrap}>
        <p>존재하지 않는 과목입니다.</p>
      </div>
    )
  }
//영원히 불러만와~ 불러만 오든지 말든지 알아서하든지 말든지
  // 화면에 넘길 과목 데이터: 이름은 Context, 공지·과제는 서버 API 결과 사용
  const displayCourse = {
    id: courseId,
    subject: course ? course.name : '불러오는 중...',
    notices: serverNotices,
    assignments: serverAssignments,
    materials: [],
  }

  return (
    <>
      <div className={styles.wrap}>
        <main className={styles.main}>
          <h1 className={styles.title}>{displayCourse.subject}</h1>

          <div className={styles.body}>

            <div className={styles.left}>
              <LeftTab activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <div className={styles.middle}>
              <MiddleTab course={displayCourse} activeTab={activeTab} />
            </div>

            <div className={styles.right}>
              <RightTab course={displayCourse} />
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
