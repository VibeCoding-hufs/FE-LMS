import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { COURSES } from '../data/courses'
import Footer from '../components/Footer/Footer'
import styles from './CoursePage.module.css'
import NoticeList from './NoticeList'
import MaterialList from './MaterialList'
import AssignmentList from './AssignmentList'
import AttendanceView from './AttendanceView'
import SyllabusView from './SyllabusView'

// 탭 이름 목록: 탭 이름 자체를 활성 상태 값으로 사용
const TABS = ['공지사항', '강의자료', '과제', '출석현황', '강의계획서']

/* ── 과목 헤더 색상 ── */
const COLOR_HEX = { 1: '#3C8794', 2: '#7b68c8', 3: '#e87b3b', 4: '#3b9e6b', 5: '#cc5555' }

/* ── 메인 페이지 컴포넌트 ─────────────────────────── */
export default function CoursePage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(TABS[0])

  const course = COURSES[courseId]

  if (!course) {
    return (
      <>
        <div className={styles.notFound}>
          <p>과목을 찾을 수 없습니다.</p>
          <button onClick={() => navigate('/')}>메인으로 돌아가기</button>
        </div>
        <Footer />
      </>
    )
  }

  const accentColor = COLOR_HEX[course.color] ?? COLOR_HEX[1]

  return (
    <>
      <div className={styles.page}>

        {/* 브레드크럼 */}
        <div className={styles.breadcrumb}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            ← 뒤로가기
          </button>
          <span className={styles.breadSep}>/</span>
          <span className={styles.breadCurrent}>{course.subject}</span>
        </div>

        {/* 과목 헤더 카드 */}
        <div className={styles.courseHeader} style={{ borderTopColor: accentColor }}>
          <div className={styles.courseTop}>
            <div className={styles.courseTitleArea}>
              <span className={styles.courseTag} style={{ background: accentColor }}>
                {course.department}
              </span>
              <h1 className={styles.courseTitle}>{course.subject}</h1>
            </div>
            <div className={styles.courseMetaGrid}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>담당교수</span>
                <span className={styles.metaValue}>{course.professor}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>학점</span>
                <span className={styles.metaValue}>{course.credits}학점</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>강의실</span>
                <span className={styles.metaValue}>{course.room}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>강의시간</span>
                <span className={styles.metaValue}>{course.schedule}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 사이드바 + 콘텐츠 */}
        <div className={styles.body}>

          {/* 왼쪽 사이드바 탭 내비게이션 */}
          <nav className={styles.sidebar}>
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                style={activeTab === tab ? { borderLeftColor: accentColor, color: accentColor } : {}}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {tab === '과제' && (
                  <span className={styles.tabBadge}>
                    {course.assignments.filter(a => a.status === 'pending').length}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* 오른쪽 탭 콘텐츠 */}
          <div className={styles.tabContent}>
            {activeTab === '공지사항'  && <NoticeList      notices={course.notices}         />}
            {activeTab === '강의자료'  && <MaterialList    materials={course.materials}     />}
            {activeTab === '과제'      && <AssignmentList  assignments={course.assignments} />}
            {activeTab === '출석현황'  && <AttendanceView  attendance={course.attendance}   />}
            {activeTab === '강의계획서' && <SyllabusView    course={course}                  />}
          </div>

        </div>

      </div>
      <Footer />
    </>
  )
}
