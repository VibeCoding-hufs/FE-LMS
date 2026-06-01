import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer/Footer'
import styles from './AssignmentListPage.module.css'
import LeftTab from '../components/SubjectDetail/LeftTab/LeftTab'

// 날짜 포맷: "2024-10-01T09:00:00" → "10.01"
function formatDate(dateStr) {
  return dateStr.slice(5, 10).replace('-', '.')
}

export default function AssignmentListPage() {
  // courseId는 URL의 숫자형 서버 과목 ID (예: /courses/3/assignments)
  const { courseId } = useParams()
  const navigate = useNavigate()

  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)

  // LeftTab 클릭 시 CoursePage로 이동
  function handleTabChange(tab) {
    navigate(`/courses/${courseId}`, { state: { activeTab: tab } })
  }

  useEffect(() => {
    // 로그인 안 했으면 데모 계정(userId=1) 사용
    const userId = localStorage.getItem('userID') || '1'

    // 과제 목록 API: /{userId}/courses/{courseId}/assignments/
    axios.get(`https://kikoky.duckdns.org/${userId}/courses/${courseId}/assignments/`)
      .then((res) => {
        setAssignments(res.data.assignments || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('과제 목록 불러오기 실패:', err)
        setLoading(false)
      })
  }, [courseId])

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.body}>

          <div className={styles.left}>
            <LeftTab activeTab="과제" onTabChange={handleTabChange} />
          </div>

          <main className={styles.main}>
            <div className={styles.topBar}>
              <Link to={`/courses/${courseId}`} className={styles.back}>← 과제 상세페이지</Link>
              <h2 className={styles.subtitle}>과제 목록</h2>
            </div>

            <div className={styles.box}>
              {loading && <p className={styles.loading}>불러오는 중...</p>}

              {!loading && (
                <ul className={styles.list}>
                  {assignments.length === 0 && (
                    <li className={styles.empty}>과제가 없습니다.</li>
                  )}
                  {assignments.map((assignment) => (
                    <li key={assignment.id} className={styles.item}>
                      <Link to={`/courses/${courseId}/assignments/${assignment.id}`} className={styles.link}>
                        <span className={styles.assignmentTitle}>{assignment.title}</span>
                        {/* due_date 있으면 마감일, 없으면 등록일 표시 */}
                        <span className={styles.date}>{formatDate(assignment.due_date || assignment.created_at)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </main>

          <div className={styles.spacer} />

        </div>
      </div>
      <Footer />
    </>
  )
}
