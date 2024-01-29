import styles from "./ChildMainManagement.module.css";

function ChildMainManagement() {
  console.log("찍히나?");
  return (
    <div className={styles.container}>
      <p>아이 메인-관리 페이지</p>
    </div>
  );
}

export default ChildMainManagement;
