import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import Header     from './components/Header/Header'
import MainPage   from './pages/MainPage'
import LoginPage  from './pages/LoginPage'
import CoursePage from './pages/CoursePage'

export default function App() {
  // 현재 경로가 /login이면 Header를 숨긴다
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  return (
    <AuthProvider>
      {!isLogin && <Header />}
      <Routes>
        <Route path="/"               element={<MainPage />}   />
        <Route path="/login"          element={<LoginPage />}  />
        <Route path="/course/:courseId" element={<CoursePage />} />
      </Routes>
    </AuthProvider>
  )
}
