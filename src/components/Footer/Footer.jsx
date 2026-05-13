import styles from './Footer.module.css'

const NAV_COLS = [
  {
    title: '교육현황',
    links: [['개설과목검색', '#'], ['OCW', '#'], ['학사일정', '#']],
  },
  {
    title: '커뮤니티',
    links: [['공지사항', '#'], ['질의응답', '#'], ['자료실', '#']],
  },
  {
    title: '소개',
    links: [['e-Class 소개', '#'], ['FAQ', '#']],
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logo}>HUFS</span>
          <p>Copyright &copy; 2026 한국외국어대학교. All rights reserved.</p>
          <p>서울특별시 동대문구 이문로 107&nbsp;|&nbsp;Tel: 02-2173-2114</p>
          <a href="#" className={styles.privacy}>개인정보처리방침</a>
        </div>
        <nav className={styles.nav} aria-label="사이트맵">
          {NAV_COLS.map(col => (
            <div key={col.title} className={styles.col}>
              <strong>{col.title}</strong>
              {col.links.map(([label, href]) => (
                <a key={label} href={href}>{label}</a>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </footer>
  )
}
