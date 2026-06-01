import styles from './TestBox.module.css'



function TestBox({ course }) {


  const exams = []
  for (let i = 0; i < course.syllabus.weeklyPlan.length; i++) {
    const plan = course.syllabus.weeklyPlan[i]
    if (plan.topic.includes('고사') || plan.topic.includes('시험')) {
      exams.push(plan)
    }
  }


  // 성적 배분 중 시험 관련 항목만 골라내기
  const examScoring = []
  for (let i = 0; i < course.syllabus.scoring.length; i++) {
    const item = course.syllabus.scoring[i]
    if (item.item.includes('고사') || item.item.includes('시험')) {
      examScoring.push(item)
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <span>📄</span>
        <span>시험</span>
      </div>
      <div className={styles.body}>

        {/* 시험 일정 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>시험 일정</h3>
          {exams.length === 0 && (
            <p className={styles.empty}>등록된 시험 일정이 없습니다.</p>
          )}

          {exams.length > 0 && (
            <ul className={styles.examList}>
              {exams.map((exam) => (
                <li key={exam.week} className={styles.examItem}>
                  <span className={styles.week}>{exam.week}주차</span>
                  <span className={styles.topic}>{exam.topic}</span>
                </li>
              ))}
            </ul>
          )}
        </section>


        {/* 시험 성적 반영 비중 - 표로 표시 */}
        {examScoring.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>성적 반영 비중</h3>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>항목</th>
                  <th className={styles.th}>비율</th>
                </tr>
              </thead>
              <tbody>
                {examScoring.map((item) => (
                  <tr key={item.item} className={styles.tr}>
                    <td className={styles.td}>{item.item}</td>
                    <td className={styles.tdRight}>{item.percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </section>
        )}


        {/* 유의사항 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>유의사항</h3>
          <p className={styles.policy}>{course.syllabus.assignmentPolicy}</p>
        </section>

      </div>
    </div>
  )
}

export default TestBox
