import styles from './MiddleTab.module.css'
import NoticeBox from '../NoticeBox/NoticeBox'
import MaterialBox from '../MaterialBox/MaterialBox'
import AssignmentBox from '../AssignmentBox/AssignmentBox'
import SyllabusBox from '../SyllabusBox/SyllabusBox'
import TestBox from '../TestBox/TestBox'




function renderTab(activeTab, course) {
  //기본 뷰

  if (!activeTab) {
    return (
      <>
        <NoticeBox notices={course.notices} />
        <AssignmentBox assignments={course.assignments} courseId={course.id} />
      </>
    )
  }

  if (activeTab === '공지')       return <NoticeBox notices={course.notices} />
  if (activeTab === '자료')       return <MaterialBox materials={course.materials} />
  if (activeTab === '과제')       return <AssignmentBox assignments={course.assignments} courseId={course.id} />
  if (activeTab === '강의계획서') return <SyllabusBox course={course} />
  if (activeTab === '시험')       return <TestBox course={course} />


  return (
    <div className={styles.empty}>
      <p>'{activeTab}' 기능은 준비 중입니다.</p>
    </div>
  )
}



function MiddleTab({ course, activeTab }) {
  return (
    <div className={styles.container}>
      {renderTab(activeTab, course)}
    </div>
  )
}

export default MiddleTab
