import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import styles from './Header.module.css'

function LoginIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
      <polyline points="10 17 15 12 10 7"/>
      <line x1="15" y1="12" x2="3" y2="12"/>
    </svg>
  )
}

export default function Header() {
  const navigate = useNavigate()
  // AuthContext에서 로그인 사용자 정보와 로그아웃 함수를 꺼내 사용
  const { user, logout } = useContext(AuthContext)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.lang}>
          <select aria-label="언어 선택">
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className={styles.logo} onClick={() => navigate('/')} role="button" tabIndex={0}>
          <span className={styles.symbol}>HUFS</span>
          <div className={styles.text}>
            <strong>한국외국어대학교</strong>
            <span>e-Class (LMS/TMS)</span>
          </div>
        </div>
        {user ? (
          <div className={styles.userArea}>
            <span className={styles.userName}>{user.studentId} 님</span>
            <button className={styles.logoutBtn} onClick={() => { logout(); navigate('/') }}>
              로그아웃
            </button>
          </div>
        ) : (
          <button className={styles.loginBtn} onClick={() => navigate('/login')}>
            <LoginIcon />
            로그인
          </button>
        )}
      </div>
    </header>
  )
}
