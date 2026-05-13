import { createContext, useState } from 'react'

// 로그인 상태를 앱 전체에서 공유하기 위한 Context 객체
export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // 새로고침 후에도 로그인 유지: sessionStorage에서 사용자 정보를 불러옴
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('hufs_user')) ?? null }
    catch { return null }
  })

  function login(studentId) {
    const u = { studentId }
    setUser(u)
    sessionStorage.setItem('hufs_user', JSON.stringify(u))
  }

  function logout() {
    setUser(null)
    sessionStorage.removeItem('hufs_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
