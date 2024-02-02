import styles from "./ParentFundSaving.module.css";

export default function ParentFundSaving() {
  return (
    <div className={styles.ParentFundSavingContainer}>
      <div className={styles.ParentFundSavingContainerStart}>
        <div className={styles.fundAccountGraph}>
          투자 계좌 관련 변동 그래프
        </div>
        <div className={styles.fundBenefitGraph}>
          투자 성공/실패에 따른 이익률 변동 그래프
        </div>
        <div className={styles.childFundStatus}>
          <p>신짱아 어린이의 투자 내역</p>
          <div className={styles.childFundStatusFrame}>
            <p>투자 종목 : 엄마의 몸무게는 증가할 것이다</p>
            <div style={{ textAlign: "right" }}>
              <button>투자종목 수정하기</button>&nbsp;&nbsp;
              <button>투자종목 종료하기</button>
            </div>
          </div>
        </div>
        <div className={styles.childReservationFundStatus}>
          <p>신짱아 어린이의 예약 투자 내역</p>
          <div className={styles.childReservationFundStatusFrame}>
            <p>투자 종목 : 아빠의 음주는 줄어들 것이다</p>
            <div style={{ textAlign: "right" }}>
              <button>투자종목 수정하기</button>&nbsp;&nbsp;
              <button>투자종목 종료하기</button>
            </div>
          </div>
        </div>
        <div className={styles.todayFundNews}>
          <p>오늘의 투자 뉴스 등록하기</p>
          <div className={styles.todayFundNewsFrame}>
            <p>
              오늘의 투자 뉴스 : &nbsp;&nbsp;
              <input type="text" />
            </p>

            <button>투자 뉴스 등록하기</button>
          </div>
        </div>
        <div className={styles.childSavingStatus}>
          <p>신짱아 어린이의 적금 내역</p>
          <div className={styles.childSavingStatusFrame}>
            <div className={styles.childSavingStatusFrame_balance}>
              <p>적금 잔액</p>
              <p>40600 도토리</p>
            </div>
            <div className={styles.childSavingStatusFrame_weeklyPayment}>
              <p>주 납입 금액(회분)</p> <p>20000 도토리</p>
            </div>
            <div className={styles.childSavingStatusFrame_expirationDate}>
              <p>적금 만기 일</p> <p>2024년 1월 16일</p>
            </div>
            <div className={styles.childSavingStatusFrame_paymentTimes}>
              <p>적금 납부 횟수</p>
              <table>
                <thead>
                  <tr>
                    <th>1주차</th>
                    <th>2주차</th>
                    <th>3주차</th>
                    <th>4주차</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: "lightgreen",
                      }}
                    >
                      1
                    </td>
                    <td
                      style={{
                        backgroundColor: "lightgray",
                      }}
                    >
                      2
                    </td>
                    <td
                      style={{
                        backgroundColor: "lightgreen",
                      }}
                    >
                      3
                    </td>
                    <td
                      style={{
                        backgroundColor: "lightgreen",
                      }}
                    >
                      4
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
