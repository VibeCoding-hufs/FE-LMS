import React from "react";
import styles from "./SubjectList.module.css";


function SubjectList() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>수강과목</h2>
      <ul className={styles.list}>
        <li className={styles.item}>교육행정및학교경영</li>
        <li className={styles.item}>멀티미디어중국어교육</li>
        <li className={styles.item}>웹프로그래밍</li>
        <li className={styles.item}>인간과교육</li>
        <li className={styles.item}>종합설계</li>
        <li className={styles.item}>중국어교육세미나</li>
        <li className={styles.item}>학교현장실습</li>
      </ul>
    </div>
  );
}

export default SubjectList;