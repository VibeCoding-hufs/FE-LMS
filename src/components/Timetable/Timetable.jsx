import { TIMETABLE, DAY_KEYS, DAY_LABELS } from '../../data/timetable'
import Card from '../Card/Card'
import TimetableClass from './TimetableClass'
import styles from './Timetable.module.css'

const START_HOUR = 9
const END_HOUR   = 17
const PX_PER_MIN = 1   // 60px per hour

function timeToMin(str) {
  const [h, m] = str.split(':').map(Number)
  return h * 60 + m
}

function getMondayOfThisWeek() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const dow = d.getDay()
  d.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1))
  return d
}

const HOURS    = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i)
const BASE_MIN = START_HOUR * 60
const TOTAL_H  = (END_HOUR - START_HOUR) * 60 * PX_PER_MIN  // 480px

export default function Timetable() {
  const monday   = getMondayOfThisWeek()
  const todayStr = new Date().toDateString()

  const days = DAY_KEYS.map((key, i) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    return {
      key,
      label:   DAY_LABELS[i],
      date,
      isToday: date.toDateString() === todayStr,
      classes: TIMETABLE[key] ?? [],
    }
  })

  return (
    <Card title="이번 주 시간표">
      <div className={styles.timetable}>

        {/* 헤더 행: 요일 */}
        <div className={styles.headerRow}>
          <div className={styles.cornerCell} />
          {days.map(day => (
            <div
              key={day.key}
              className={`${styles.dayHeader} ${day.isToday ? styles.todayHeader : ''}`}
            >
              {day.label}
              <span className={styles.dayDate}>
                {day.date.getMonth() + 1}/{day.date.getDate()}
              </span>
            </div>
          ))}
        </div>

        {/* 그리드 본체 */}
        <div className={styles.gridBody}>
          {/* 시간 눈금 */}
          <div className={styles.timeGutter}>
            {HOURS.map(h => (
              <div key={h} className={styles.hourLabel}>{h}:00</div>
            ))}
          </div>

          {/* 요일별 컬럼 */}
          {days.map(day => (
            <div key={day.key} className={styles.dayCol} style={{ height: TOTAL_H }}>
              {HOURS.map(h => <div key={h} className={styles.hourLine} />)}
              {day.classes.map((cls, i) => {
                const top    = (timeToMin(cls.start) - BASE_MIN) * PX_PER_MIN
                const height = (timeToMin(cls.end) - timeToMin(cls.start)) * PX_PER_MIN
                return <TimetableClass key={i} {...cls} top={top} height={height} />
              })}
            </div>
          ))}
        </div>

      </div>
    </Card>
  )
}
