export const TIMETABLE = {
  Mon: [
    { subject: '영어학개론', start: '09:00', end: '10:30', room: '인문관 301', color: 1, courseId: 'english-linguistics' },
    { subject: '통번역실습', start: '13:00', end: '14:30', room: '외관 201',   color: 3, courseId: 'translation-practice' },
  ],
  Tue: [
    { subject: '미디어와사회', start: '10:30', end: '12:00', room: '사회관 105', color: 2, courseId: 'media-society' },
  ],
  Wed: [
    { subject: '영어학개론', start: '09:00', end: '10:30', room: '인문관 301', color: 1, courseId: 'english-linguistics' },
    { subject: '독일어기초', start: '14:30', end: '16:00', room: '외관 305',   color: 4, courseId: 'german-basic' },
  ],
  Thu: [
    { subject: '미디어와사회', start: '10:30', end: '12:00', room: '사회관 105', color: 2, courseId: 'media-society' },
    { subject: '통번역실습',   start: '13:00', end: '14:30', room: '외관 201',   color: 3, courseId: 'translation-practice' },
  ],
  Fri: [
    { subject: '독일어기초', start: '09:00', end: '10:30', room: '외관 305', color: 4, courseId: 'german-basic' },
  ],
}

export const DAY_KEYS   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
export const DAY_LABELS = ['월',  '화',  '수',  '목',  '금']
