import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer/Footer'
import styles from './AssignmentDetailPage.module.css'
import LeftTab from '../components/SubjectDetail/LeftTab/LeftTab'

// 날짜 포맷: "2024-10-01T09:00:00" → "2024년 10월 01일"
function formatDate(dateStr) {
  const [year, month, day] = dateStr.slice(0, 10).split('-')
  return `${year}년 ${month}월 ${day}일`
}

export default function AssignmentDetailPage() {
  // courseId, assignmentId 모두 URL에서 가져오는 숫자형 ID
  const { courseId, assignmentId } = useParams()
  const navigate = useNavigate()

  const [assignment, setAssignment] = useState(null)
  const [loading, setLoading] = useState(true)

  // LeftTab 클릭 시 CoursePage로 이동
  function handleTabChange(tab) {
    navigate(`/courses/${courseId}`, { state: { activeTab: tab } })
  }

  useEffect(() => {
    // 로그인 안 했으면 데모 계정(userId=1) 사용
    const userId = localStorage.getItem('userID') || '1'

    // 과제 상세 API: /{userId}/courses/{courseId}/assignments/{assignmentId}/
    axios.get(`https://kikoky.duckdns.org/${userId}/courses/${courseId}/assignments/${assignmentId}/`)
      .then((res) => {
        setAssignment(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('과제 상세 불러오기 실패:', err)
        setLoading(false)
      })
  }, [courseId, assignmentId])

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.body}>

          {/* 왼쪽: 탭 메뉴 */}
          <div className={styles.left}>
            <LeftTab activeTab="과제" onTabChange={handleTabChange} />
          </div>

          {/* 가운데: 과제 상세 */}
          <main className={styles.main}>

            <Link to={`/courses/${courseId}/assignments`} className={styles.back}>← 과제 목록</Link>

            {loading && (
              <div className={styles.box}>
                <p className={styles.loadingText}>불러오는 중...</p>
              </div>
            )}

            {!loading && assignment && (
              <div className={styles.box}>
                <div className={styles.header}>
                  <h2 className={styles.title}>{assignment.title}</h2>
                  {/* 마감일이 있으면 표시 */}
                  {assignment.due_date && (
                    <span className={styles.due}>마감 {formatDate(assignment.due_date)}</span>
                  )}
                </div>

                <hr className={styles.divider} />

                {/* 과제 설명 본문 */}
                <div className={styles.content}>
                  {assignment.description
                    ? assignment.description.split('\n').map((line, i) => (
                        <p key={i} className={styles.paragraph}>{line}</p>
                      ))
                    : <p className={styles.paragraph}>내용이 없습니다.</p>
                  }
                </div>
              </div>
            )}

            {!loading && !assignment && (
              <div className={styles.box}>
                <p className={styles.loadingText}>존재하지 않는 과제입니다.</p>
              </div>
            )}

          </main>

          <div className={styles.spacer} />

        </div>
      </div>
      <Footer />
    </>
  )
}
