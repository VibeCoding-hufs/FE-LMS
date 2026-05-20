import { Routes, Route } from 'react-router-dom'
import Header     from './components/Header/Header'
import MainPage   from './pages/MainPage'
import LoginPage  from './pages/LoginPage'
import SignupPage  from './pages/SignupPage'
import CoursePage from './pages/CoursePage'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/"                 element={<MainPage />}   /> // 홈 페이지
        <Route path="/login"             element={<LoginPage />}   /> // 로그인 페이지
        <Route path="/signup"            element={<SignupPage />}  /> // 회원가입 페이지
        <Route path="/courses/:courseId" element={<CoursePage />} /> // 과목 상세 페이지
      </Routes>
    </>
  )
}
