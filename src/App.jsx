import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { CoursesContext } from './data/CoursesContext'
import Header             from './components/Header/Header'
import MainPage           from './pages/MainPage'
import LoginPage          from './pages/LoginPage'
import SignupPage         from './pages/SignupPage'
import CoursePage         from './pages/CoursePage'
import NoticeListPage     from './pages/NoticeListPage'
import NoticeDetailPage   from './pages/NoticeDetailPage'
import AssignmentListPage   from './pages/AssignmentListPage'
import AssignmentDetailPage from './pages/AssignmentDetailPage'



export default function App() {
  // 서버에서 받아온 수강 과목 목록을 상태로 관리 (변경 시 자동 리렌더)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    // 로그인 안 했으면 데모 계정(userId=1) 사용
    const userId = localStorage.getItem('userID') || '1'

    // 수강 과목 목록 API 호출 → courses 상태에 저장
    axios.get(`https://kikoky.duckdns.org/${userId}/courses/`)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : (res.data.courses || [])
        setCourses(list)
      })
      .catch((err) => {
        console.error('수강 과목 목록 불러오기 실패:', err)
      })
  }, [])

  return (
    // CoursesContext.Provider로 감싸면 하위 컴포넌트 어디서든 courses를 읽을 수 있음
    <CoursesContext.Provider value={courses}>
      <Header />
      <Routes>
        <Route path="/"                                          element={<MainPage />}              />
        <Route path="/login"                                     element={<LoginPage />}             />
        <Route path="/signup"                                    element={<SignupPage />}            />
        <Route path="/courses/:courseId"                         element={<CoursePage />}            />
        <Route path="/courses/:courseId/notices"                 element={<NoticeListPage />}        />
        <Route path="/courses/:courseId/notices/:noticeId"       element={<NoticeDetailPage />}      />
        <Route path="/courses/:courseId/assignments"             element={<AssignmentListPage />}    />
        <Route path="/courses/:courseId/assignments/:assignmentId" element={<AssignmentDetailPage />} />
      </Routes>
    </CoursesContext.Provider>
  )
}
