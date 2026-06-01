import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer/Footer'
import styles from './NoticeDetailPage.module.css'
import LeftTab from '../components/SubjectDetail/LeftTab/LeftTab'

// 날짜 포맷: "2024-10-01T09:00:00" → "2024년 10월 01일"
function formatDate(dateStr) {
  const [year, month, day] = dateStr.slice(0, 10).split('-')
  return `${year}년 ${month}월 ${day}일`
}

export default function NoticeDetailPage() {
  // courseId, noticeId 모두 URL에서 가져오는 숫자형 ID
  const { courseId, noticeId } = useParams()
  const navigate = useNavigate()

  const [notice, setNotice] = useState(null)
  const [loading, setLoading] = useState(true)

  // LeftTab 클릭 시 CoursePage로 이동
  function handleTabChange(tab) {
    navigate(`/courses/${courseId}`, { state: { activeTab: tab } })
  }

  useEffect(() => {
    // 로그인 안 했으면 데모 계정(userId=1) 사용
    const userId = localStorage.getItem('userID') || '1'

    // 공지 상세 API: /{userId}/courses/{courseId}/notices/{noticeId}/
    axios.get(`https://kikoky.duckdns.org/${userId}/courses/${courseId}/notices/${noticeId}/`)
      .then((res) => {
        setNotice(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('공지 상세 불러오기 실패:', err)
        setLoading(false)
      })
  }, [courseId, noticeId])

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.body}>

          {/* 왼쪽: 탭 메뉴 */}
          <div className={styles.left}>
            <LeftTab activeTab="공지" onTabChange={handleTabChange} />
          </div>

          {/* 가운데: 공지 상세 */}
          <main className={styles.main}>

            <Link to={`/courses/${courseId}/notices`} className={styles.back}>← 공지사항 목록</Link>

            {loading && (
              <div className={styles.box}>
                <p className={styles.loadingText}>불러오는 중...</p>
              </div>
            )}

            {!loading && notice && (
              <div className={styles.box}>
                <div className={styles.header}>
                  <h2 className={styles.title}>{notice.title}</h2>
                  <span className={styles.date}>{formatDate(notice.created_at)}</span>
                </div>

                <hr className={styles.divider} />

                {/* description이 없으면 안내 문구 표시 */}
                <div className={styles.content}>
                  {notice.description
                    ? notice.description.split('\n').map((line, i) => (
                        <p key={i} className={styles.paragraph}>{line}</p>
                      ))
                    : <p className={styles.paragraph}>내용이 없습니다.</p>
                  }
                </div>
              </div>
            )}

            {!loading && !notice && (
              <div className={styles.box}>
                <p className={styles.loadingText}>존재하지 않는 공지입니다.</p>
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
