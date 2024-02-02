import styles from "./ParentJob.module.css";
import kidImg from "@images/kidImg.jpg";

export default function ParentJob() {
  return (
    <div className={styles.parentJobContainer}>
      <div className={styles.parentJobContainerStart}>
        <div className={styles.childProfile}>
          <p>짱아 어린이의 자산 현황</p>
          <div className={styles.childProfileFrame}>
            <div>
              <div className={styles.childProfileImage}>
                <img src={kidImg} />
              </div>
            </div>
            <div>
              <ul className={styles.childProfileTitle}>
                <li>직업 </li>
                <li>업무 </li>
                <li>횟수 </li>
                <li>급여 </li>
              </ul>
            </div>
            <div>
              <ul className={styles.childProfileContent}>
                <li>펫시터</li>
                <li>똘이 산책 시키기</li>
                <li>주 5일</li>
                <li>20000 도토리</li>
              </ul>
            </div>
            <div>
              <button className={styles.jobDeleteButton}>삭제하기</button>
            </div>
          </div>
        </div>
        <div className={styles.jobProgressStatus}>
          <p>업무 진척도</p>
          <div className={styles.jobProgressStatusFrame}>
            <ul>
              <li>
                <label htmlFor="workProgress">똘이 산책시키기 :</label>
              </li>
              <li>
                <progress id="workProgress" max="100" value="40"></progress>
              </li>
              <li>2/5</li>
            </ul>
          </div>
        </div>
        <div className={styles.jobReservationStatus}>
          <p>직업 예약 현황</p>
          <div className={styles.jobReservationStatusFrame}>
            <div>
              <ul className={styles.jobReservationStatusTitle}>
                <li>직업 </li>
                <li>업무 </li>
                <li>횟수 </li>
                <li>급여 </li>
              </ul>
            </div>
            <div>
              <ul className={styles.jobReservationStatusContent}>
                <li>펫시터</li>
                <li>똘이 산책 시키기</li>
                <li>주 5일</li>
                <li>20000 도토리</li>
              </ul>
            </div>
            <div>
              <button className={styles.jobReservationUpdateButton}>
                수정하기
              </button>
              &nbsp;&nbsp;
              <button className={styles.jobReservationDeleteButton}>
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
