import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  // Context에서 login 함수를 직접 꺼내 사용
  const { login } = useContext(AuthContext)
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    login(id)
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoArea}>
          <span className={styles.symbol}>HUFS</span>
          <div className={styles.logoText}>
            <strong>한국외국어대학교</strong>
            <span>e-Class (LMS/TMS)</span>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="login-id">학번</label>
            <input
              id="login-id"
              type="text"
              placeholder="학번을 입력하세요"
              value={id}
              onChange={e => setId(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="login-pw">비밀번호</label>
            <input
              id="login-pw"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={pw}
              onChange={e => setPw(e.target.value)}
              required
            />
          </div>

          <label className={styles.remember}>
            <input type="checkbox" /> 로그인 상태 유지
          </label>

          <button type="submit" className={styles.loginBtn}>로그인</button>
        </form>

        <p className={styles.hint}>
          포털 아이디/비밀번호로 로그인하세요
        </p>
      </div>
    </div>
  )
}
