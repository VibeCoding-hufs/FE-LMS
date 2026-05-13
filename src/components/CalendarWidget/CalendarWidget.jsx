import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../Card/Card'
import styles from './CalendarWidget.module.css'

// 요일 헤더와 과목 색상 상수
const DAY_HEADERS = ['일', '월', '화', '수', '목', '금', '토']
const COURSE_COLORS = { 1: '#3C8794', 2: '#7b68c8', 3: '#e87b3b', 4: '#3b9e6b', 5: '#cc5555' }
const ASSIGNMENT_TAB_INDEX = 2

// 연·월·일을 받아 YYYY-MM-DD 형식의 문자열로 변환
function toDateStr(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

// 달력 그리드(7×N 배열)를 생성하는 함수 (이전달/현재달/다음달 날짜 포함)
function buildGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const lastDate = new Date(year, month + 1, 0).getDate()
  const prevLast = new Date(year, month, 0).getDate()
  const cells = []

  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ num: prevLast - i, type: 'prev' })

  for (let d = 1; d <= lastDate; d++)
    cells.push({ num: d, type: 'current' })

  let next = 1
  while (cells.length % 7 !== 0)
    cells.push({ num: next++, type: 'next' })

  return cells
}

function ListIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <line x1="8"    y1="6"  x2="21"   y2="6"  />
      <line x1="8"    y1="12" x2="21"   y2="12" />
      <line x1="8"    y1="18" x2="21"   y2="18" />
      <line x1="3"    y1="6"  x2="3.01" y2="6"  />
      <line x1="3"    y1="12" x2="3.01" y2="12" />
      <line x1="3"    y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

/* 날짜 클릭 시 나타나는 과제 패널 */
function AssignmentPanel({ date, assignments, onClose }) {
  const navigate = useNavigate()

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelDate}>{date} 과제</span>
        <button className={styles.panelClose} onClick={onClose} aria-label="닫기">✕</button>
      </div>
      <ul className={styles.panelList}>
        {assignments.map((a, i) => (
          <li
            key={`${a.courseId}-${a.id ?? i}`}
            className={styles.panelItem}
            onClick={() => navigate(`/course/${a.courseId}?tab=${ASSIGNMENT_TAB_INDEX}`)}
          >
            <span
              className={styles.panelAccent}
              style={{ background: COURSE_COLORS[a.color] ?? COURSE_COLORS[1] }}
            />
            <div className={styles.panelInfo}>
              <span className={styles.panelCourse}>{a.courseSubject}</span>
              <span className={styles.panelTitle}>{a.title}</span>
            </div>
            <span className={`${styles.panelBadge} ${
              a.status === 'submitted' ? styles.badgeSubmitted : styles.badgePending
            }`}>
              {a.status === 'submitted' ? '제출완료' : '미제출'}
            </span>
            <span className={styles.panelArrow}>›</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* 달력 위젯 본체 */
export default function CalendarWidget({ assignmentsByDate = {} }) {
  // 현재 표시 중인 연도와 월 상태
  const now = new Date()
  const [year,  setYear]  = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)

  // 이전 달로 이동 (1월에서 이전으로 가면 전년도 12월)
  function prevMonth() {
    setSelectedDate(null)
    setMonth(m => {
      if (m === 0) { setYear(y => y - 1); return 11 }
      return m - 1
    })
  }

  // 다음 달로 이동 (12월에서 다음으로 가면 다음 연도 1월)
  function nextMonth() {
    setSelectedDate(null)
    setMonth(m => {
      if (m === 11) { setYear(y => y + 1); return 0 }
      return m + 1
    })
  }

  const cells = buildGrid(year, month)
  const rows = []
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7))

  function isToday(cell) {
    return cell.type === 'current'
      && cell.num  === now.getDate()
      && month     === now.getMonth()
      && year      === now.getFullYear()
  }

  function baseCellClass(cell, ci) {
    return [
      ci === 0                 && styles.sun,
      ci === 6                 && styles.sat,
      cell.type !== 'current'  && styles.other,
      isToday(cell)            && styles.today,
    ].filter(Boolean).join(' ')
  }

  function handleCellClick(cell) {
    if (cell.type !== 'current') return
    const dateStr = toDateStr(year, month, cell.num)
    if (!assignmentsByDate[dateStr]?.length) return
    setSelectedDate(prev => prev === dateStr ? null : dateStr)
  }

  const selectedAssignments = selectedDate ? (assignmentsByDate[selectedDate] ?? []) : []

  const action = (
    <button className={styles.iconBtn} aria-label="목록 보기">
      <ListIcon />
    </button>
  )

  return (
    <>
      <Card title="일정" action={action}>
        <div className={styles.nav}>
          <button className={styles.arrow} onClick={prevMonth} aria-label="이전달이동">‹</button>
          <span className={styles.label}>{year}년 {month + 1}월</span>
          <button className={styles.arrow} onClick={nextMonth} aria-label="다음달이동">›</button>
        </div>
        <table className={styles.table} aria-label={`${year}년 ${month + 1}월 달력`}>
          <thead>
            <tr>
              {DAY_HEADERS.map((d, i) => (
                <th key={d} className={i === 0 ? styles.sun : i === 6 ? styles.sat : ''}>
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => {
                  const dateStr         = cell.type === 'current' ? toDateStr(year, month, cell.num) : null
                  const cellAssignments = dateStr ? (assignmentsByDate[dateStr] ?? []) : []
                  const isSelected      = dateStr !== null && dateStr === selectedDate
                  const hasAssignments  = cellAssignments.length > 0

                  const tdClass = [
                    baseCellClass(cell, ci),
                    isSelected     && styles.selected,
                    hasAssignments && styles.clickable,
                  ].filter(Boolean).join(' ')

                  return (
                    <td key={ci} className={tdClass} onClick={() => handleCellClick(cell)}>
                      <span>{cell.num}</span>
                      {hasAssignments && (
                        <div className={styles.dots}>
                          {cellAssignments.slice(0, 3).map((a, di) => (
                            <span
                              key={di}
                              className={`${styles.dot} ${
                                a.status === 'submitted' ? styles.dotSubmitted : styles.dotPending
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {selectedDate && selectedAssignments.length > 0 && (
        <AssignmentPanel
          date={selectedDate}
          assignments={selectedAssignments}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </>
  )
}
