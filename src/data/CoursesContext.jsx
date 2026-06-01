import { createContext } from 'react'

// 서버에서 받아온 수강 과목 목록을 앱 전체에서 공유하는 Context
// 기본값은 빈 배열 (아직 API 응답 전 상태)
export const CoursesContext = createContext([])
