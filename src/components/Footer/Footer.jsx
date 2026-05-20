import styles from './Footer.module.css'



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

      </div>


    </footer>
  )
}
