import styles from './SyllabusView.module.css'

// 강의계획서 탭: 강의 기본 정보, 주차별 계획, 점수 배분, 출결·과제 정책을 표시
export default function SyllabusView({ course }) {
  const { subject, professor, room, schedule, credits, department, syllabus } = course
  const { professorEmail, weeklyPlan, scoring, attendancePolicy, assignmentPolicy } = syllabus

  return (
    <div className={styles.wrap}>

      {/* ── 강의 기본 정보 ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>강의 기본 정보</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>강의명</span>
            <span className={styles.infoValue}>{subject}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>강의실</span>
            <span className={styles.infoValue}>{room}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>강의시간</span>
            <span className={styles.infoValue}>{schedule}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>학점</span>
            <span className={styles.infoValue}>{credits}학점</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>개설 대학</span>
            <span className={styles.infoValue}>{department}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>담당 교수</span>
            <span className={styles.infoValue}>{professor}</span>
          </div>
          <div className={`${styles.infoItem} ${styles.fullWidth}`}>
            <span className={styles.infoLabel}>교수 이메일</span>
            <a className={styles.emailLink} href={`mailto:${professorEmail}`}>{professorEmail}</a>
          </div>
        </div>
      </section>

      {/* ── 점수 배분 ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>점수 배분</h2>
        <div className={styles.scoringList}>
          {scoring.map(s => (
            <div key={s.item} className={styles.scoringItem}>
              <span className={styles.scoringLabel}>{s.item}</span>
              {/* 퍼센트 너비로 막대 그래프 시각화 */}
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${s.percent}%` }} />
              </div>
              <span className={styles.scoringPercent}>{s.percent}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 출결 관리 ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>출결 관리</h2>
        <div className={styles.policyBox}>
          <div className={styles.policyRow}>
            <span className={styles.policyKey}>최대 결석 허용</span>
            <span className={styles.policyVal}>{attendancePolicy.maxAbsent}회</span>
          </div>
          <div className={styles.policyRow}>
            <span className={styles.policyKey}>지각 → 결석 환산</span>
            <span className={styles.policyVal}>지각 {attendancePolicy.lateToAbsent}회 = 결석 1회</span>
          </div>
          <p className={styles.policyNote}>{attendancePolicy.note}</p>
        </div>
      </section>

      {/* ── 과제 정책 ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>과제</h2>
        <p className={styles.policyText}>{assignmentPolicy}</p>
      </section>

      {/* ── 주차별 강의 진행 계획 ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>주차별 강의 계획</h2>
        <ol className={styles.weeklyList}>
          {weeklyPlan.map(w => (
            <li key={w.week} className={styles.weeklyItem}>
              <span className={styles.weekBadge}>{w.week}주</span>
              <span className={styles.weekTopic}>{w.topic}</span>
            </li>
          ))}
        </ol>
      </section>

    </div>
  )
}
