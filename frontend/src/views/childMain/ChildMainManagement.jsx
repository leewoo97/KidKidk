import styles from "./ChildMainManagement.module.css";
import acornImg from "@images/acorn.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ManagementContent() {
  const Data = {
    labels: ["주머니", "투자", "적금"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#5FB776", "#F1554C", "#FFD000"],
        borderColor: ["#5FB776", "#F1554C", "#FFD000"],
      },
    ],
  };

  const Options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.formattedValue}%`;
          },
        },
      },
      legend: {
        display: false, // 범례를 표시
      },
    },
  };

  const ChartComponent = () => <Doughnut data={Data} options={Options} />;

  return (
    <div className={styles.manageContainer}>
      <div className={styles.card1}>
        <div className={styles.card1_1}>
          <div className={styles.title}> 현재 짱아의 주머니 </div>
          <div className={styles.iconContainer1}>
            <div>
              <img src={acornImg} style={{ width: "6vw" }} />
            </div>
            <div className={styles.infoContainer1}>
              <div> 도토리 </div>
              <div> 4500개 </div>
            </div>
          </div>
          <div className={styles.refundContainer}>
            <div className={styles.refundBtn}>환전하기</div>
          </div>
        </div>
        <div className={styles.card1_2}>
          <div className={styles.title}> 짱아가 가지고 있는 모든 도토리 </div>
          <div className={styles.iconContainer2}>
            <div style={{ width: "140px" }}>
              <ChartComponent />
            </div>
            <div className={styles.infoContainer2}>
              <div className={styles.boxdetail}>
                <div
                  className={styles.colorbox}
                  style={{ backgroundColor: "#5FB776" }}
                ></div>
                <div>주머니 : 4500 도토리</div>
              </div>
              <div className={styles.boxdetail}>
                <div
                  className={styles.colorbox}
                  style={{ backgroundColor: "#F1554C" }}
                ></div>
                <div>투자 : 2700 도토리</div>
              </div>
              <div className={styles.boxdetail}>
                <div
                  className={styles.colorbox}
                  style={{ backgroundColor: "#FFD000" }}
                ></div>
                <div>적금 : 1800 도토리</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.card2}>
        <div className={styles.title}> 이번주 할 일</div>
        <div className={styles.card2_1}>
          <div> 똘이 산책 시키기 </div>
          <div></div>
          <div> 2/5 </div>
          <div> 완료 </div>
        </div>
      </div>
      <div className={styles.card2}>
        <div className={styles.title}> 이번주 투자 항목 </div>
        <div className={styles.card2_2}>
          이번 주 엄마의 몸무게는 증가할 것이다
        </div>
      </div>
    </div>
  );
}
