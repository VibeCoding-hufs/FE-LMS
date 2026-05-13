export const COURSES = {
  'english-linguistics':  {
    id: 'english-linguistics',
    subject: '영어학개론',
    professor: '김영희',
    department: '영어대학',
    credits: 3,
    room: '인문관 301',
    schedule: '월·수 09:00–10:30',
    color: 1,
    notices: [
      { id: 1, title: '중간고사 범위 및 일정 안내', date: '2026-05-10', important: true },
      { id: 2, title: '6주차 강의자료 업로드 완료', date: '2026-05-08', important: false },
      { id: 3, title: '과제1 제출 기한 연장 안내 (5/16 → 5/19)', date: '2026-05-05', important: false },
      { id: 4, title: '5주차 강의 녹화본 업로드', date: '2026-05-01', important: false },
    ],
    materials: [
      { id: 1, title: '6주차 - 음운론 기초 및 음소 분석', date: '2026-05-08', type: 'pdf' },
      { id: 2, title: '5주차 - 형태론: 형태소와 어형성', date: '2026-05-01', type: 'pptx' },
      { id: 3, title: '4주차 - 통사론 개요', date: '2026-04-24', type: 'pdf' },
      { id: 4, title: '3주차 - 영어 음성학 개관', date: '2026-04-17', type: 'pptx' },
    ],
    assignments: [
      { id: 1, title: '영어 음운 분석 레포트 (A4 3매)', due: '2026-05-19', status: 'pending' },
      { id: 2, title: '형태소 분석 연습문제', due: '2026-05-02', status: 'submitted' },
      { id: 3, title: '수업 참관 보고서', due: '2026-04-18', status: 'submitted' },
    ],
    attendance: {
      present: 10, late: 1, absent: 1, total: 12,
      records: [
        { week: 1, status: 'present' }, { week: 2, status: 'present' },
        { week: 3, status: 'present' }, { week: 4, status: 'late' },
        { week: 5, status: 'present' }, { week: 6, status: 'absent' },
        { week: 7, status: 'present' }, { week: 8, status: 'present' },
        { week: 9, status: 'present' }, { week: 10, status: 'present' },
        { week: 11, status: 'present' }, { week: 12, status: 'present' },
      ],
    },
    syllabus: {
      professorEmail: 'kimyh@hufs.ac.kr',
      weeklyPlan: [
        { week: 1,  topic: '강의 소개 및 영어학의 분야 개관' },
        { week: 2,  topic: '음성학 I: 자음과 모음의 분류' },
        { week: 3,  topic: '음성학 II: 영어 음성 전사 실습' },
        { week: 4,  topic: '음운론 I: 음소와 변이음' },
        { week: 5,  topic: '음운론 II: 음운 규칙과 음절 구조' },
        { week: 6,  topic: '형태론 I: 형태소와 어형성' },
        { week: 7,  topic: '형태론 II: 굴절과 파생' },
        { week: 8,  topic: '중간고사' },
        { week: 9,  topic: '통사론 I: 구 구조와 문장 구조' },
        { week: 10, topic: '통사론 II: 변형 생성 문법 개요' },
        { week: 11, topic: '의미론 I: 의미 관계와 어휘 의미론' },
        { week: 12, topic: '의미론 II: 문장 의미와 화용론 경계' },
        { week: 13, topic: '화용론: 함의·전제·발화 행위' },
        { week: 14, topic: '사회언어학·역사언어학 개관' },
        { week: 15, topic: '기말고사' },
      ],
      scoring: [
        { item: '중간고사', percent: 30 },
        { item: '기말고사', percent: 30 },
        { item: '과제',     percent: 20 },
        { item: '출석',     percent: 10 },
        { item: '수업 참여', percent: 10 },
      ],
      attendancePolicy: {
        maxAbsent: 5,
        lateToAbsent: 3,
        note: '결석 5회 초과 시 성적 F 처리. 지각 3회는 결석 1회로 산정.',
      },
      assignmentPolicy: '과제는 마감일 자정(23:59)까지 LMS에 업로드해야 합니다. 기한 초과 제출은 점수의 30%가 감점되며, 표절 적발 시 0점 처리됩니다.',
    },
  },

  'translation-practice': {
    id: 'translation-practice',
    subject: '통번역실습',
    professor: '박지수',
    department: '통번역대학',
    credits: 3,
    room: '외관 201',
    schedule: '월·목 13:00–14:30',
    color: 3,
    notices: [
      { id: 1, title: '발표 순서 확정 안내', date: '2026-05-09', important: true },
      { id: 2, title: '번역 실습 텍스트 배부', date: '2026-05-06', important: false },
    ],
    materials: [
      { id: 1, title: '6주차 - 법률 문서 번역 실습', date: '2026-05-08', type: 'pdf' },
      { id: 2, title: '5주차 - 신문 기사 번역', date: '2026-05-01', type: 'pdf' },
      { id: 3, title: '번역 스타일 가이드', date: '2026-03-05', type: 'pdf' },
    ],
    assignments: [
      { id: 1, title: '조별 발표 (번역 비평)', due: '2026-05-22', status: 'pending' },
      { id: 2, title: '영한 번역 실습 2회', due: '2026-05-08', status: 'submitted' },
      { id: 3, title: '영한 번역 실습 1회', due: '2026-04-17', status: 'submitted' },
    ],
    attendance: {
      present: 11, late: 0, absent: 1, total: 12,
      records: [
        { week: 1, status: 'present' }, { week: 2, status: 'present' },
        { week: 3, status: 'absent' },  { week: 4, status: 'present' },
        { week: 5, status: 'present' }, { week: 6, status: 'present' },
        { week: 7, status: 'present' }, { week: 8, status: 'present' },
        { week: 9, status: 'present' }, { week: 10, status: 'present' },
        { week: 11, status: 'present' }, { week: 12, status: 'present' },
      ],
    },
    syllabus: {
      professorEmail: 'parkjs@hufs.ac.kr',
      weeklyPlan: [
        { week: 1,  topic: '강의 소개 및 통번역의 기초 개념' },
        { week: 2,  topic: '텍스트 분석과 번역 전략' },
        { week: 3,  topic: '영한 번역 실습 I: 신문 기사' },
        { week: 4,  topic: '영한 번역 실습 II: 학술 텍스트' },
        { week: 5,  topic: '한영 번역 실습 I: 공공 문서' },
        { week: 6,  topic: '한영 번역 실습 II: 법률 문서' },
        { week: 7,  topic: '번역 비평 및 피드백 세션' },
        { week: 8,  topic: '중간고사 (번역 실기)' },
        { week: 9,  topic: '순차통역 기초 I: 노트 테이킹' },
        { week: 10, topic: '순차통역 기초 II: 실습' },
        { week: 11, topic: '영상 번역 실습' },
        { week: 12, topic: '의료·과학 분야 번역 특강' },
        { week: 13, topic: '조별 발표 준비 및 워크숍' },
        { week: 14, topic: '조별 발표 (번역 비평)' },
        { week: 15, topic: '기말고사 (번역 실기)' },
      ],
      scoring: [
        { item: '중간고사', percent: 25 },
        { item: '기말고사', percent: 25 },
        { item: '과제',     percent: 25 },
        { item: '조별 발표', percent: 15 },
        { item: '출석',     percent: 10 },
      ],
      attendancePolicy: {
        maxAbsent: 4,
        lateToAbsent: 2,
        note: '결석 4회 초과 시 성적 F 처리. 지각 2회는 결석 1회로 산정.',
      },
      assignmentPolicy: '번역 과제는 반드시 지정된 양식(HWP 또는 PDF)으로 제출해야 합니다. 마감 후 24시간 이내 제출 시 20% 감점, 이후 제출 불가.',
    },
  },

  'media-society': {
    id: 'media-society',
    subject: '미디어와사회',
    professor: '이상철',
    department: '사회과학대학',
    credits: 3,
    room: '사회관 105',
    schedule: '화·목 10:30–12:00',
    color: 2,
    notices: [
      { id: 1, title: '기말 팀 프로젝트 주제 선정 안내', date: '2026-05-11', important: true },
      { id: 2, title: '중간고사 성적 공개', date: '2026-05-07', important: false },
      { id: 3, title: '외부 강사 특강 일정 (5/20)', date: '2026-05-04', important: false },
    ],
    materials: [
      { id: 1, title: '6주차 - 소셜미디어와 여론 형성', date: '2026-05-07', type: 'pptx' },
      { id: 2, title: '5주차 - 미디어 리터러시', date: '2026-04-30', type: 'pptx' },
      { id: 3, title: '4주차 - 저널리즘의 변화', date: '2026-04-23', type: 'pdf' },
    ],
    assignments: [
      { id: 1, title: '미디어 소비 일기 작성 (1주일)', due: '2026-05-20', status: 'pending' },
      { id: 2, title: '중간고사 (필기)', due: '2026-04-30', status: 'submitted' },
    ],
    attendance: {
      present: 12, late: 0, absent: 0, total: 12,
      records: [
        { week: 1, status: 'present' }, { week: 2, status: 'present' },
        { week: 3, status: 'present' }, { week: 4, status: 'present' },
        { week: 5, status: 'present' }, { week: 6, status: 'present' },
        { week: 7, status: 'present' }, { week: 8, status: 'present' },
        { week: 9, status: 'present' }, { week: 10, status: 'present' },
        { week: 11, status: 'present' }, { week: 12, status: 'present' },
      ],
    },
    syllabus: {
      professorEmail: 'leesc@hufs.ac.kr',
      weeklyPlan: [
        { week: 1,  topic: '미디어란 무엇인가: 개념과 역사' },
        { week: 2,  topic: '미디어 이론 I: 매체 결정론과 사회 구성론' },
        { week: 3,  topic: '인쇄 미디어와 저널리즘의 역사' },
        { week: 4,  topic: '방송 미디어: 라디오·TV와 공론장' },
        { week: 5,  topic: '미디어 리터러시: 비판적 읽기' },
        { week: 6,  topic: '소셜미디어와 디지털 공론장' },
        { week: 7,  topic: '알고리즘과 필터버블' },
        { week: 8,  topic: '중간고사' },
        { week: 9,  topic: '미디어와 정치: 의제 설정 이론' },
        { week: 10, topic: '미디어와 젠더·인종 표상' },
        { week: 11, topic: '가짜뉴스와 정보 생태계' },
        { week: 12, topic: '글로벌 미디어와 문화 제국주의' },
        { week: 13, topic: '미디어 산업과 플랫폼 경제' },
        { week: 14, topic: '팀 프로젝트 발표' },
        { week: 15, topic: '기말고사' },
      ],
      scoring: [
        { item: '중간고사',    percent: 30 },
        { item: '기말고사',    percent: 30 },
        { item: '팀 프로젝트', percent: 20 },
        { item: '과제',        percent: 10 },
        { item: '출석·참여',   percent: 10 },
      ],
      attendancePolicy: {
        maxAbsent: 6,
        lateToAbsent: 3,
        note: '결석 6회 초과 시 성적 F 처리. 지각 3회는 결석 1회로 산정.',
      },
      assignmentPolicy: '모든 과제는 LMS를 통해 제출합니다. 팀 프로젝트 보고서는 발표 전날 23:59까지 제출하며, 개인 과제 지각 제출 시 하루당 10점 감점.',
    },
  },

  'german-basic': {
    id: 'german-basic',
    subject: '독일어기초',
    professor: '한소영',
    department: '독일어대학',
    credits: 2,
    room: '외관 305',
    schedule: '수·금 09:00–10:30',
    color: 4,
    notices: [
      { id: 1, title: '단어 시험 범위 안내 (6주차)', date: '2026-05-12', important: true },
      { id: 2, title: '회화 보충 수업 일정 (토 10:00)', date: '2026-05-09', important: false },
    ],
    materials: [
      { id: 1, title: '6주차 - 독일어 동사 변화 심화', date: '2026-05-08', type: 'pdf' },
      { id: 2, title: '5주차 - 명사의 성과 격', date: '2026-05-01', type: 'pdf' },
      { id: 3, title: '교재 부록 - 주요 어휘 300', date: '2026-03-05', type: 'pdf' },
    ],
    assignments: [
      { id: 1, title: '단어 시험 (6주차 범위)', due: '2026-05-21', status: 'pending' },
      { id: 2, title: '작문 과제 1 - 자기소개', due: '2026-04-24', status: 'submitted' },
    ],
    attendance: {
      present: 11, late: 1, absent: 0, total: 12,
      records: [
        { week: 1, status: 'present' }, { week: 2, status: 'present' },
        { week: 3, status: 'present' }, { week: 4, status: 'present' },
        { week: 5, status: 'late' },    { week: 6, status: 'present' },
        { week: 7, status: 'present' }, { week: 8, status: 'present' },
        { week: 9, status: 'present' }, { week: 10, status: 'present' },
        { week: 11, status: 'present' }, { week: 12, status: 'present' },
      ],
    },
    syllabus: {
      professorEmail: 'hansy@hufs.ac.kr',
      weeklyPlan: [
        { week: 1,  topic: '독일어 알파벳과 발음 규칙' },
        { week: 2,  topic: '인사 표현과 기본 회화 I' },
        { week: 3,  topic: '명사의 성(性)과 정관사·부정관사' },
        { week: 4,  topic: '현재형 동사 변화 I: sein·haben' },
        { week: 5,  topic: '현재형 동사 변화 II: 규칙·불규칙 동사' },
        { week: 6,  topic: '명사의 격 I: 1격·4격' },
        { week: 7,  topic: '수 표현과 시간 표현' },
        { week: 8,  topic: '중간고사' },
        { week: 9,  topic: '명사의 격 II: 2격·3격' },
        { week: 10, topic: '분리 동사와 화법 조동사' },
        { week: 11, topic: '형용사 격변화' },
        { week: 12, topic: '과거형 I: 완료형(Perfekt)' },
        { week: 13, topic: '과거형 II: 과거형(Präteritum)' },
        { week: 14, topic: '회화 종합 실습: 일상생활 주제' },
        { week: 15, topic: '기말고사' },
      ],
      scoring: [
        { item: '중간고사', percent: 30 },
        { item: '기말고사', percent: 30 },
        { item: '단어 시험', percent: 20 },
        { item: '과제',     percent: 10 },
        { item: '출석',     percent: 10 },
      ],
      attendancePolicy: {
        maxAbsent: 4,
        lateToAbsent: 2,
        note: '결석 4회 초과 시 성적 F 처리. 지각 2회는 결석 1회로 산정.',
      },
      assignmentPolicy: '작문 과제는 손으로 작성한 뒤 사진 촬영하여 LMS에 업로드합니다. 단어 시험 범위는 매주 공지사항에서 확인하세요.',
    },
  },
}

// 모든 과제를 마감일(YYYY-MM-DD) 기준으로 그룹화하여 반환하는 함수
export function getAssignmentsByDate() {
  const byDate = {}
  Object.values(COURSES).forEach(course => {
    course.assignments.forEach(assignment => {
      const key = assignment.due
      if (!byDate[key]) byDate[key] = []
      byDate[key].push({
        courseId:      course.id,
        courseSubject: course.subject,
        color:         course.color,
        ...assignment,
      })
    })
  })
  return byDate
}
