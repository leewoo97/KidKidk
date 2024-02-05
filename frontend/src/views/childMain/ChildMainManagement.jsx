import styles from "./ChildMainManagement.module.css";
import acornImg from "@images/acorn.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getJob } from "@api/job.js";
import { getFund } from "@api/fund.js";
import { getSavingHistory } from "@api/saving.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ManagementContent() {
  const navigate = useNavigate();

  const childId = 2;
  const [job, setJob] = useState([]);
  const [fund, setFund] = useState([]);
  const [savingMoney, setSavingMoney] = useState(0);

  useEffect(() => {
    getJob(
      childId,
      (success) => {
        setJob(success.data.Job);
        console.log(success.data.Job);
      },
      (fail) => {
        console.log(fail);
      }
    );
    return () => {
      console.log('ChildManagement userEffect return');
    };
  }, []);

  useEffect(() => {
    getFund(
      childId,
      (success) => {
        setFund(success.data.Fund);
        console.log(success.data.Fund);
      },
      (fail) => {
        console.log(fail);
      }
    );
    return () => {
      console.log('ChildManagement userEffect return');
    };
  }, []);

  useEffect(() => {
    getSavingHistory(
      childId,
      (success) => {
        let saving = success.data.Saving;
        setSavingMoney((4-saving.count)*saving.payment);
        console.log(success.data.Saving);
      },
      (fail) => {
        console.log(fail);
      }
    );
    return () => {
      console.log('ChildManagement userEffect return');
    };
  }, []);

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
            <div
              className={styles.refundBtn}
              onClick={() => navigate("/child/refund")}
            >
              환전하기
            </div>
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
                <div>적금 : {savingMoney} 도토리</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.card2}>
        <div className={styles.title}> 이번주 할 일</div>
        <div className={styles.card2_1}>
          <div> {job.task} </div>
          <div></div>
          <div> {job.doneCount}/{job.taskAmount} </div>
          <div> 완료 </div>
        </div>
      </div>
      <div className={styles.card2}>
        <div className={styles.title}> 이번주 투자 항목 </div>
        <div className={styles.card2_2}>
          {fund.content}
        </div>
      </div>
    </div>
  );
}
