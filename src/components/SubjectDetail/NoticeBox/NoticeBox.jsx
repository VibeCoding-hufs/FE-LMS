import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import styles from './NoticeBox.module.css'



function formatDate(dateStr) {
  return dateStr.slice(5).replace('-', '.')
}



// courseId를 URL에서 가져와 더보기 링크에 활용
function NoticeBox({ notices }) {
  const { courseId } = useParams()

  return (
    <div className={styles.box}>


      <div className={styles.header}>
        <span>📢</span>
        <span>공지사항</span>
        {/* 더보기 버튼: 공지 목록 페이지로 이동 */}
        <Link to={`/courses/${courseId}/notices`} className={styles.more}>더보기 →</Link>
      </div>


      <ul className={styles.list}>
        {notices.map((notice) => (
          <li key={notice.id} className={styles.item}>

            <span className={styles.title}>· {notice.title}</span>
            {/* 서버는 created_at, 정적 데이터는 date 필드를 사용 */}
            <span className={styles.date}>{formatDate(notice.created_at || notice.date)}</span>
          </li>
        ))}
      </ul>



    </div>
  )
}

export default NoticeBox
