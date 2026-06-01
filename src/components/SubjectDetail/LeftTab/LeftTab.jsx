import styles from './LeftTab.module.css'

// 카테고리별 탭 메뉴 구조
const MENU = [
  { category: '강의', items: ['강의계획서', '공지', '자료'] },
  { category: '과제', items: ['과제', '팀플'] },
  { category: '성적', items: ['시험', '성적'] },
]



function LeftTab({ activeTab, onTabChange }) {
  return (
    <nav className={styles.container}>

      {MENU.map(({ category, items }) => (
        <div key={category} className={styles.group}>

          {/* 카테고리 제목 */}
          <div className={styles.category}>{category}</div>

          {/* 하위 항목 */}
          {items.map((item) => (
            <button
              key={item}
              className={`${styles.item} ${activeTab === item ? styles.active : ''}`}
              onClick={() => onTabChange(item)}
            >
              ▶ {item}
            </button>
          ))}

        </div>
      ))}
    </nav>
  )
}

export default LeftTab
