/* ── 유틸 ─────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function diffDays(targetDate) {
  const t = today();
  const d = new Date(targetDate);
  d.setHours(0, 0, 0, 0);
  return Math.round((d - t) / 86400000);
}

function fmtDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

/* ── 달력 ─────────────────────────────────────── */
(function initCalendar() {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();

  const label = $('#cal-month-label');
  const table = $('#cal-table');

  function render() {
    label.textContent = `${year}년 ${month + 1}월`;
    const todayNum = new Date().toDateString();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLast = new Date(year, month, 0).getDate();

    const days = ['일', '월', '화', '수', '목', '금', '토'];
    let html = '<thead><tr>';
    days.forEach((d, i) => {
      const cls = i === 0 ? 'sun' : i === 6 ? 'sat' : '';
      html += `<th class="${cls}">${d}</th>`;
    });
    html += '</tr></thead><tbody>';

    let date = 1;
    let nextDate = 1;
    for (let row = 0; row < 6; row++) {
      html += '<tr>';
      for (let col = 0; col < 7; col++) {
        const cellIndex = row * 7 + col;
        let num, cls = '', isOther = false;
        if (cellIndex < firstDay) {
          num = prevLast - firstDay + cellIndex + 1;
          isOther = true;
        } else if (date > lastDate) {
          num = nextDate++;
          isOther = true;
        } else {
          num = date++;
        }
        const colCls = col === 0 ? 'sun' : col === 6 ? 'sat' : '';
        const checkDate = new Date(year, isOther ? (cellIndex < firstDay ? month - 1 : month + 1) : month, num);
        const isToday = checkDate.toDateString() === todayNum;
        cls = [colCls, isOther ? 'other-month' : '', isToday ? 'today' : ''].filter(Boolean).join(' ');
        html += `<td class="${cls}"><span>${num}</span></td>`;
      }
      html += '</tr>';
      if (date > lastDate && row >= 4) break;
    }
    html += '</tbody>';
    table.innerHTML = html;
  }

  render();
  $('#cal-prev').addEventListener('click', () => {
    month--;
    if (month < 0) { month = 11; year--; }
    render();
  });
  $('#cal-next').addEventListener('click', () => {
    month++;
    if (month > 11) { month = 0; year++; }
    render();
  });
})();

/* ── 시간표 데이터 ──────────────────────────────
   수업 없는 요일·슬롯은 그냥 비움
   color-1 ~ color-5 클래스로 과목별 색상 구분
──────────────────────────────────────────────── */
const TIMETABLE = {
  Mon: [
    { subject: '영어학개론', time: '09:00–10:30', room: '인문관 301', color: 1 },
    { subject: '통번역실습', time: '13:00–14:30', room: '외관 201', color: 3 },
  ],
  Tue: [
    { subject: '미디어와사회', time: '10:30–12:00', room: '사회관 105', color: 2 },
  ],
  Wed: [
    { subject: '영어학개론', time: '09:00–10:30', room: '인문관 301', color: 1 },
    { subject: '독일어기초', time: '14:30–16:00', room: '외관 305', color: 4 },
  ],
  Thu: [
    { subject: '미디어와사회', time: '10:30–12:00', room: '사회관 105', color: 2 },
    { subject: '통번역실습', time: '13:00–14:30', room: '외관 201', color: 3 },
  ],
  Fri: [
    { subject: '독일어기초', time: '09:00–10:30', room: '외관 305', color: 4 },
  ],
};

(function initTimetable() {
  const keys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const labels = ['월', '화', '수', '목', '금'];

  const todayIdx = new Date().getDay();
  const container = $('#timetable');

  const monday = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    return d;
  })();

  keys.forEach((key, i) => {
    const colDate = new Date(monday);
    colDate.setDate(monday.getDate() + i);
    const isToday = (i + 1) === todayIdx || (todayIdx === 0 && false);
    const isTodayCol = colDate.toDateString() === new Date().toDateString();

    const col = document.createElement('div');
    col.className = 'tt-day' + (isTodayCol ? ' today' : '');

    const dateStr = `${colDate.getMonth() + 1}/${colDate.getDate()}`;
    col.innerHTML = `<div class="tt-day-header">${labels[i]}<span class="tt-day-date">${dateStr}</span></div>`;

    const classes = TIMETABLE[key] || [];
    if (classes.length === 0) {
      col.innerHTML += '<p class="tt-empty">-</p>';
    } else {
      classes.forEach(c => {
        col.innerHTML += `
          <div class="tt-class color-${c.color}">
            <strong>${c.subject}</strong>
            <span class="tt-time">${c.time}</span>
            <span class="tt-room">${c.room}</span>
          </div>`;
      });
    }
    container.appendChild(col);
  });
})();

/* ── D-day 할일 ────────────────────────────────── */
(function initDday() {
  const STORAGE_KEY = 'hufs_todos';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  let todos = load();

  if (todos.length === 0) {
    todos = [
      { id: 1, title: '영어학개론 레포트 제출', date: fmtISO(3),  done: false },
      { id: 2, title: '미디어와사회 중간고사',  date: fmtISO(7),  done: false },
      { id: 3, title: '통번역실습 발표',        date: fmtISO(14), done: false },
      { id: 4, title: '독일어기초 단어시험',    date: fmtISO(21), done: false },
    ];
    save(todos);
  }

  function fmtISO(addDays) {
    const d = new Date();
    d.setDate(d.getDate() + addDays);
    return d.toISOString().slice(0, 10);
  }

  function sorted(list) {
    return [...list].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return diffDays(a.date) - diffDays(b.date);
    });
  }

  function badgeClass(n, done) {
    if (done) return 'past';
    if (n < 0)  return 'past';
    if (n === 0) return 'today';
    if (n <= 3)  return 'urgent';
    return '';
  }

  function badgeText(n, done) {
    if (done) return '완료';
    if (n === 0) return 'D-DAY';
    if (n > 0) return `D-${n}`;
    return `D+${Math.abs(n)}`;
  }

  function render() {
    const list = $('#dday-list');
    const empty = $('#dday-empty');
    const active = todos.filter(t => !t.done);
    const done   = todos.filter(t => t.done);
    const ordered = sorted(todos);

    if (todos.length === 0) {
      list.innerHTML = '';
      empty.hidden = false;
    } else {
      empty.hidden = true;
      list.innerHTML = ordered.map(t => {
        const n = diffDays(t.date);
        const bc = badgeClass(n, t.done);
        const bt = badgeText(n, t.done);
        return `
          <li class="dday-item${t.done ? ' done' : ''}" data-id="${t.id}">
            <span class="dday-badge ${bc}">${bt}</span>
            <div class="dday-info">
              <span class="dday-title">${t.title}</span>
              <span class="dday-date">${t.date}</span>
            </div>
            <input type="checkbox" class="dday-check" aria-label="완료" ${t.done ? 'checked' : ''} />
          </li>`;
      }).join('');

      $$('.dday-check', list).forEach(cb => {
        cb.addEventListener('change', e => {
          const id = +e.target.closest('.dday-item').dataset.id;
          todos = todos.map(t => t.id === id ? { ...t, done: e.target.checked } : t);
          save(todos);
          render();
        });
      });
    }
  }

  render();

  const btnAdd  = $('#btn-add-todo');
  const form    = $('#add-todo-form');
  const btnCancel = $('#btn-cancel');

  btnAdd.addEventListener('click', () => {
    form.hidden = false;
    btnAdd.hidden = true;
    $('#todo-title').focus();
    const min = new Date().toISOString().slice(0, 10);
    $('#todo-date').min = min;
    $('#todo-date').value = min;
  });

  btnCancel.addEventListener('click', () => {
    form.hidden = true;
    btnAdd.hidden = false;
    form.reset();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = $('#todo-title').value.trim();
    const date  = $('#todo-date').value;
    if (!title || !date) return;
    const id = Date.now();
    todos.push({ id, title, date, done: false });
    save(todos);
    render();
    form.reset();
    form.hidden = true;
    btnAdd.hidden = false;
  });
})();
