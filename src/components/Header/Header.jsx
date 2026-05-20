import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';


function Header() {
  return (
    <>
    <header className={styles.header}>
      <a href="/" className={styles.logo}>  
        <img src="/HUFS_logo.svg" alt="HUFS LMS Logo" width="100" />
      </a>
      <h1 className={styles.title}>HUFS LMS</h1>    
      <Link to="/login" className={styles.loginButton}>로그인</Link>

    </header></>

  );
}

export default Header;