import styles from "./ChildMainManagement.module.css";
import acornImg from "../assets/acorn.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Progress } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

function ManagementContent() {
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
    },
    legend: {
      display: false, // 범례를 숨김
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.card1}>
        <div className={styles.첫번째줄1}>
          <div className={styles.제목}> 현재 짱아의 주머니 </div>
          <div className={styles.iconContainer}>
            <div>
              <img src={acornImg} style={{ width: "90px" }} />
            </div>
            <div className={styles.infoContainer}>
              <div> 도토리 </div>
              <div> 4500개 </div>
            </div>
          </div>
          <div className={styles.refundContainer}>
            <div className={styles.refundBtn}>환전하기</div>
          </div>
        </div>
        <div className={styles.첫번째줄2}>
          <div className={styles.제목}> 짱아가 가지고 있는 모든 도토리 </div>
          <div className={styles.iconContainer}>
            <div>
              <Doughnut
                data={Data}
                options={Options}
                style={{ width: "90px" }}
              ></Doughnut>
            </div>
            {/* <div>
              <div> 주머니에 든 양</div>
              <div> 투자에 든 양 </div>
              <div> 적금에 든 양 </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className={styles.card2}>
        <div className={styles.제목}> 이번주 할 일</div>
        <div className={styles.두번째줄}>
          <div> 똘이 산책 시키기 </div>
          <div>
            <Progress colorScheme="green" size="md" value={80} />
          </div>
          <div> 업무 횟 수 </div>
          <div> 완료버튼 </div>
        </div>
      </div>
      <div className={styles.card2}>
        <div className={styles.제목}> 이번주 투자 항목 </div>
        <div className={styles.세번째줄}>
          이번 주 엄마의 몸무게는 증가할 것이다
        </div>
      </div>
    </div>
  );
}

export default ManagementContent;
