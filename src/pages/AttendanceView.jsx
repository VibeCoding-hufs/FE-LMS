import styles from './CoursePage.module.css'

// 출석 상태(present/late/absent)를 한국어 텍스트와 CSS 클래스로 매핑
const STATUS_LABEL = { present: '출석', late: '지각', absent: '결석' }
const STATUS_CLS   = { present: styles.present, late: styles.late, absent: styles.absent }

// 출석현황 탭: 출석/지각/결석 통계 카드와 주차별 출석 그리드 표시
export default function AttendanceView({ attendance }) {
  const { present, late, absent, total, records } = attendance
  const rate = Math.round(((present + late * 0.5) / total) * 100)

  return (
    <div className={styles.attendance}>
      <div className={styles.attendanceSummary}>
        {[
          { label: '출석',   value: present,     cls: styles.statPresent },
          { label: '지각',   value: late,         cls: styles.statLate    },
          { label: '결석',   value: absent,       cls: styles.statAbsent  },
          { label: '출석률', value: `${rate}%`,   cls: styles.statRate    },
        ].map(s => (
          <div key={s.label} className={`${styles.statCard} ${s.cls}`}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.attendanceGrid}>
        {records.map(r => (
          <div key={r.week} className={`${styles.attendanceCell} ${STATUS_CLS[r.status]}`}>
            <span className={styles.weekNum}>{r.week}주</span>
            <span className={styles.statusLabel}>{STATUS_LABEL[r.status]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
