import styles from './MaterialBox.module.css'

// 날짜

function formatDate(dateStr) {
  return dateStr.slice(5).replace('-', '.')
}


function MaterialBox({ materials }) {
  return (
    <div className={styles.box}>


      <div className={styles.header}>
        <span>📁</span>
        <span>강의자료</span>
      </div>


      <ul className={styles.list}>
        {materials.map((material) => (
          <li key={material.id} className={styles.item}>
            <span className={styles.title}>· {material.title}</span>
            <span className={styles.date}>{formatDate(material.date)}</span>
          </li>
        ))}
      </ul>

      
    </div>
  )
}

export default MaterialBox
