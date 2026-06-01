import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer/Footer'
import styles from './NoticeListPage.module.css'
import LeftTab from '../components/SubjectDetail/LeftTab/LeftTab'

// 날짜 포맷: "2024-10-01T09:00:00" → "10.01"
function formatDate(dateStr) {
  return dateStr.slice(5, 10).replace('-', '.')
}

export default function NoticeListPage() {
  // courseId는 URL의 숫자형 서버 과목 ID (예: /courses/3/notices)
  const { courseId } = useParams()
  const navigate = useNavigate()

  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)

  // LeftTab 클릭 시 CoursePage로 이동
  function handleTabChange(tab) {
    navigate(`/courses/${courseId}`, { state: { activeTab: tab } })
  }

  useEffect(() => {
    // 로그인 안 했으면 데모 계정(userId=1) 사용
    const userId = localStorage.getItem('userID') || '1'

    // 공지 목록 API: /{userId}/courses/{courseId}/notices/
    axios.get(`https://kikoky.duckdns.org/${userId}/courses/${courseId}/notices/`)
      .then((res) => {
        // 응답이 배열 직접 반환하는 경우와 {notices:[...]} 두 경우 모두 처리
        setNotices(Array.isArray(res.data) ? res.data : res.data.notices || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('공지 목록 불러오기 실패:', err)
        setLoading(false)
      })
  }, [courseId])

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.body}>

          <div className={styles.left}>
            <LeftTab activeTab="공지" onTabChange={handleTabChange} />
          </div>

          <main className={styles.main}>
            <div className={styles.topBar}>
              <Link to={`/courses/${courseId}`} className={styles.back}>← 과목 상세페이지</Link>
              <h2 className={styles.subtitle}>공지사항 목록</h2>
            </div>

            <div className={styles.box}>
              {loading && <p className={styles.loading}>불러오는 중...</p>}

              {!loading && (
                <ul className={styles.list}>
                  {notices.length === 0 && (
                    <li className={styles.empty}>공지사항이 없습니다.</li>
                  )}
                  {notices.map((notice) => (
                    <li key={notice.id} className={styles.item}>
                      <Link to={`/courses/${courseId}/notices/${notice.id}`} className={styles.link}>
                        <span className={styles.noticeTitle}>{notice.title}</span>
                        <span className={styles.date}>{formatDate(notice.created_at)}</span>
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
