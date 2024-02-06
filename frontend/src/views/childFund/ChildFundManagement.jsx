import styles from "./ChildFundManagement.module.css";
import acornImg from "@images/acorn.png";
import { Bar } from "react-chartjs-2";
import React, { useState } from "react";
import Modal from "react-modal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChildFundManagement() {
  const [isFundStart, setIsFundStart] = useState(true); // 부모가 투자 시작안했으면 false
  const [isFundItem, setIsFundItem] = useState(true); // 투자항목이 있으면 true
  const [currentIndex, setCurrentIndex] = useState(0); // 모달 페이지
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buyCoin, setBuyCoin] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setBuyCoin(value);
  };

  // 모달 열기
  const openModal = () => {
    setCurrentIndex(0); // 모달이 열릴 때마다 현재 페이지 초기화
    setModalIsOpen(true);
  };

  const changeModalContent = (index) => {
    setCurrentIndex(index);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // 세로선 숨김
        },
      },
      y: {
        grid: {
          drawBorder: false, // 기본 그리드 라인 숨김
        },
        ticks: {
          callback: function (value, index, values) {
            return value; // 다른 눈금에는 라벨 표시
          },
          afterBuildTicks: function (scale) {
            // 특정 위치에 0 값을 포함한 눈금 생성
            if (!scale.ticks.includes(0)) {
              scale.ticks.push(0);
            }
          },
        },
      },
    },
  };

  const data = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        data: [5, -5, -7, 3, -5, 6, 7],
        backgroundColor: function (context) {
          const value = context.dataset.data[context.dataIndex];
          return value >= 0 ? "#F1554C" : "#4285F4";
        },
      },
    ],
  };

  const labels = ["월", "화", "수", "목", "금", "토", "일"];
  return (
    <div>
      {!isFundStart ? (
        <div className={styles.manageContainer}>
          <div className={styles.fundNot}>투자를 통해 도토리를 모아봐요!</div>
        </div>
      ) : (
        <div className={styles.manageContainer}>
          <div className={styles.content1}>
            <div className={styles.card1}>
              <div className={styles.title1}>
                투자 항목
                {isFundItem ? (
                  <div className={styles.startFund} onClick={openModal}>
                    거래하러 가기
                  </div>
                ) : null}
              </div>
              <div className={styles.card1_text1}>
                내일 엄마의 몸무게는 증가할 것이다.
              </div>
            </div>

            <div className={styles.card2}>
              <div className={styles.title1}>오늘 나의 선택</div>
              <div className={styles.card2_text1}>오늘은 쉴래</div>
            </div>
          </div>
          <Modal
            appElement={document.getElementById("root")}
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0)",
                zIndex: "999",
              },
              content: {
                backgroundColor: "#F57D73",
                borderRadius: "15px",
                width: "30vw",
                height: "55vh",
                margin: "auto",
                padding: "1vw",
                position: "absolute",
                top: "35vh",
                left: "65vw",
                zIndex: "999",
              },
            }}
          >
            {currentIndex === 0 && (
              <div className={styles.modalContainer}>
                <div className={styles.modalHead}>
                  <div className={styles.modalHead1}>사기</div>
                  <div className={styles.modalHead2}>팔기</div>
                  <div className={styles.modalHead3}>베팅</div>
                </div>

                <div className={styles.modalBody}>
                  <div className={styles.modalBodyContainer}>
                    <div className={styles.modalBody1}>
                      <div className={styles.modalBody1Content}>
                        <div className={styles.modalMax}>최대 가능</div>
                        <div className={styles.modalCoinBox}>
                          <div className={styles.modalCoin}>2700 도토리</div>
                          <div>
                            <img src={acornImg} style={{ width: "2vw" }} />
                          </div>
                        </div>
                      </div>

                      <div className={styles.modalBody1Line} />
                    </div>

                    <div className={styles.modalBody2}>
                      <input
                        type="number"
                        placeholder="도토리 개수 입력"
                        value={buyCoin}
                        onChange={handleInputChange}
                        className={styles.input}
                      />
                      <div>개 도토리 사기</div>
                    </div>
                    <div className={styles.modalBody3}>
                      <div>구매 후 투자계좌에 남은 도토리</div>
                      <div>
                        <div>2700 도토리</div>
                        <img src={acornImg} style={{ width: "2vw" }} />
                      </div>
                    </div>
                    <div className={styles.modalBodyBtns}>
                      <div>초기화</div>
                      <div>구매하기</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentIndex === 1 && <div>팔기</div>}
            {currentIndex === 2 && <div>베팅</div>}
          </Modal>

          <div className={styles.content2}>
            <div className={styles.content2Title}>나의 투자 통계</div>
            <div className={styles.content2Contents}>
              <div className={styles.card3}>
                <div className={styles.title2}>현재 투자금</div>
                <div className={styles.card3Content1}>
                  <div>
                    <img src={acornImg} style={{ width: "2vw" }} />
                  </div>
                  <div className={styles.card3Text1}>2700 도토리</div>
                </div>
              </div>
              <div className={styles.card3}>
                <div className={styles.title2}>평균 투자 금액</div>
                <div className={styles.card3Content1}>
                  <div>
                    <img src={acornImg} style={{ width: "2vw" }} />
                  </div>
                  <div className={styles.card3Text1}>3500 도토리</div>
                </div>
              </div>
              <div className={styles.card3}>
                <div className={styles.title2}>투자 성공률</div>
                <div className={styles.card3Text2}>88%</div>
              </div>
              <div className={styles.card3}>
                <div className={styles.title2}>이익률</div>
                <div className={styles.card3Text2}>6%</div>
              </div>
            </div>
          </div>
          <div className={styles.content3}>
            <div className={styles.card7}>
              <div className={styles.content2Title}>최근 일주일 투자 현황</div>
              <div className={styles.graph}>
                <Bar
                  style={{ width: "500px", height: "60px" }}
                  options={options}
                  data={data}
                />
              </div>
            </div>
            <div className={styles.card8}></div>
            <div className={styles.card9}>
              <div className={styles.content2Title}>투자뉴스</div>
              <div className={styles.content3News}>
                <div>오늘 엄마는 회식이 있다</div>
                <div>오늘 엄마는 회식이 있다</div>
                <div>오늘 엄마는 회식이 있다</div>
                <div>오늘 엄마는 회식이 있다</div>
                <div>오늘 엄마는 회식이 있다</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
