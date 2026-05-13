import { useState, useMemo, useEffect } from 'react'
import { addDays, diffDays } from '../../data/date'
import Card from '../Card/Card'
import DdayItem from './DdayItem'
import AddTodoForm from './AddTodoForm'
import styles from './DdayTodo.module.css'

// localStorage에 저장할 때 사용하는 키 이름
const STORAGE_KEY = 'hufs_todos'

// 앱 최초 실행 시 localStorage에서 할일 목록을 불러오거나 기본 데이터를 반환
function getInitialTodos() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (stored?.length) return stored
  } catch {}
  return [
    { id: 1, title: '영어학개론 레포트 제출', date: addDays(3),  done: false },
    { id: 2, title: '미디어와사회 중간고사',  date: addDays(7),  done: false },
    { id: 3, title: '통번역실습 발표',        date: addDays(14), done: false },
    { id: 4, title: '독일어기초 단어시험',    date: addDays(21), done: false },
  ]
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5"  x2="12" y2="19"/>
      <line x1="5"  y1="12" x2="19" y2="12"/>
    </svg>
  )
}

export default function DdayTodo() {
  // 할일 목록 상태 (초기값은 localStorage 또는 기본 데이터)
  const [todos, setTodos] = useState(getInitialTodos)
  const [showForm, setShowForm] = useState(false)

  // todos가 바뀔 때마다 localStorage에 자동 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // 완료 여부 → 마감일 순으로 정렬된 할일 목록
  const sorted = useMemo(() =>
    [...todos].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1
      return diffDays(a.date) - diffDays(b.date)
    }),
    [todos]
  )

  // 새 할일 추가
  function addTodo(title, date) {
    setTodos(prev => [...prev, { id: Date.now(), title, date, done: false }])
  }

  // 할일 완료/미완료 토글
  function toggleTodo(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function handleAdd(title, date) {
    addTodo(title, date)
    setShowForm(false)
  }

  return (
    <Card title="D-day 할일">
      {sorted.length === 0
        ? <p className={styles.emptyState}>마감일이 있는 할일을 추가해보세요</p>
        : (
          <ul className={styles.list}>
            {sorted.map(t => (
              <DdayItem key={t.id} todo={t} onToggle={() => toggleTodo(t.id)} />
            ))}
          </ul>
        )
      }
      {showForm
        ? <AddTodoForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
        : (
          <button className={styles.addBtn} onClick={() => setShowForm(true)}>
            <PlusIcon /> 할일 추가
          </button>
        )
      }
    </Card>
  )
}
