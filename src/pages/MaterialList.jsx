import styles from './CoursePage.module.css'

// 강의자료 탭: 파일 타입별 색상 뱃지와 다운로드 버튼 표시
export default function MaterialList({ materials }) {
  const typeColor = { pdf: styles.typePdf, pptx: styles.typePptx, docx: styles.typeDocx }

  return (
    <ul className={styles.list}>
      {materials.map(m => (
        <li key={m.id} className={styles.listItem}>
          <span className={`${styles.fileType} ${typeColor[m.type] ?? ''}`}>
            {m.type.toUpperCase()}
          </span>
          <span className={styles.itemTitle}>{m.title}</span>
          <span className={styles.itemDate}>{m.date}</span>
          <button className={styles.downloadBtn}>다운로드</button>
        </li>
      ))}
    </ul>
  )
}
