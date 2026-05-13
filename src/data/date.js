// 날짜 문자열(YYYY-MM-DD)과 오늘의 차이를 일수로 반환 (양수=미래, 음수=과거)
export function diffDays(dateStr) {
  const t = new Date()
  t.setHours(0, 0, 0, 0)
  const d = new Date(dateStr)
  d.setHours(0, 0, 0, 0)
  return Math.round((d - t) / 86400000)
}

// 오늘 날짜에서 n일 후의 날짜를 YYYY-MM-DD 형식으로 반환
export function addDays(n) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환
export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}
