import styles from "./ChildEdu.module.css";

export default function ChildEdu() {
  return (
    <div className={styles.eduContainer}>
      <div className={styles.title}>경제와 더 친해져봐요!</div>
      <div className={styles.Container}>
        <div className={styles.contents}>
          <div className={styles.card}>적금</div>
          <div className={styles.card}>투자</div>
          <div className={styles.card}>부동산</div>
          <div className={styles.card}>세금</div>
        </div>
        <div className={styles.contents}>
          <div className={styles.card}>공급과 수요</div>
          <div className={styles.card}>생산과 소비</div>
          <div className={styles.card}>환율</div>
          <div className={styles.card}>코인</div>
        </div>
      </div>
    </div>
  );
}
