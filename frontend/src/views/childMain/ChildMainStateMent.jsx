import styles from "./ChildMainStateMent.module.css";

export default function ChildMainStateMent() {
  return (
    <div className={styles.container}>
      <div>
        <div>나의 주머니 변동 그래프</div>
        <div>그래프 자리</div>
      </div>
      <div>
        <div>나의 주머니 내역</div>
        <div>주머니 내역 자리</div>
      </div>
    </div>
  );
}
