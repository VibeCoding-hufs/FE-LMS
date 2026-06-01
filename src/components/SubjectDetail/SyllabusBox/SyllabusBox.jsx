import styles from './SyllabusBox.module.css'

// 강의계획서-course 데이터를 받아 강의 정보 표시
function SyllabusBox({ course }) {
  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <span>📋</span>
        <span>강의계획서</span>
      </div>

      <div className={styles.body}>

        {/* 기본 강의 정보 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>기본 정보</h3>
          <ul className={styles.infoList}>
            <li><span className={styles.label}>담당교수</span>{course.professor}</li>
            <li><span className={styles.label}>학점</span>{course.credits}학점</li>
            <li><span className={styles.label}>강의실</span>{course.room}</li>
            <li><span className={styles.label}>강의시간</span>{course.schedule}</li>
            <li><span className={styles.label}>이메일</span>{course.syllabus.professorEmail}</li>
          </ul>
        </section>



        {/* 성적 배분*/}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>성적 배분</h3>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>항목</th>
                <th className={styles.th}>비율</th>
              </tr>
            </thead>

            <tbody>
              {course.syllabus.scoring.map((item) => (
                <tr key={item.item} className={styles.tr}>
                  <td className={styles.td}>{item.item}</td>
                  <td className={styles.tdRight}>{item.percent}%</td>
                </tr>
              ))}
            </tbody>
          </table>

        </section>



        {/* 주차별 강의 계획 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>주차별 강의 계획</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thWeek}>주차</th>
                <th className={styles.th}>강의 내용</th>
              </tr>
            </thead>
            <tbody>
              {course.syllabus.weeklyPlan.map((plan) => (
                <tr key={plan.week} className={styles.tr}>
                  <td className={styles.tdWeek}>{plan.week}주</td>
                  <td className={styles.td}>{plan.topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 출결 규정 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>출결 규정</h3>
          <p className={styles.policy}>{course.syllabus.attendancePolicy.note}</p>
        </section>


        {/* 과제 규정 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>과제 규정</h3>
          <p className={styles.policy}>{course.syllabus.assignmentPolicy}</p>
        </section>

      </div>
    </div>
  )
}

export default SyllabusBox
