import styles from "./ChildFundManagement.module.css";
import acornImg from "@images/acorn.png";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getFund, getFundHistory, getRoi, getStatus } from "@api/fund.js";
import { getChild } from "@api/child.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { differenceInDays, format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChildFundManagement() {

  const childId = 2;
  const [isFundStart, setIsFundStart] = useState(true); // 부모가 투자 시작안했으면 false
  const [isFundItem, setIsFundItem] = useState(false); // 투자항목이 있으면 true
  const [currentIndex, setCurrentIndex] = useState(0); // 모달 페이지
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buyCoin, setBuyCoin] = useState("");
  const [fund, setFund] = useState([]);
  const [fundStatus, setFundStatus] = useState(0);
  const [child, setChild] = useState([]);
  const [fundHistory, setFundHistory] = useState([]);
  const [labels, setLabels] = useState([]);
  const [rates, setRates] = useState([]);
  const [roi, setRoi] = useState([]);
  const [successRate, setSuccessRate] = useState(0);
  const [avgFundMoney, setAvgFundMoney] = useState(0);
  const [choice, setChoice] = useState('');
  const [pnlRate, setPnlRate] = useState(0);

  useEffect(() => {
    getFund(
      childId,
      (success) => {
        setFund(success.data.Fund);
        if (success.data.Fund) {
          setIsFundItem(true);
        }
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
    getChild(
      childId,
      (success) => {
        setChild(success.data.Child);
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
    getFundHistory(
      childId,
      (success) => {
        setFundHistory(success.data.FundHistory);
        labels.length = 0;
        rates.length = 0;
        let dateTime = format(new Date(), 'yyyy.MM.dd');
        success.data.FundHistory.map((row) => {
          let dataLog = new Date(row.dataLog);
          let fDataLog = format(dataLog, 'yyyy.MM.dd');
          if (differenceInDays(new Date(dateTime), new Date(fDataLog)) <= 7) {
            labels.push("");
            rates.push((row.pnl < row.seedMoney ? -1 : 1) * row.yield);
          }
        })
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
    getRoi(
      childId,
      (success) => {
        setRoi(success.data.roi);
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
    getStatus(
      childId,
      (success) => {
        setFundStatus(success.data.FundStatus);
      },
      (fail) => {
        console.log(fail);
      }
    );
    return () => {
      console.log('ChildManagement userEffect return');
    };
  }, []);

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
    labels,
    datasets: [
      {
        data: rates,
        backgroundColor: function (context) {
          const value = context.dataset.data[context.dataIndex];
          return value >= 0 ? "#F1554C" : "#4285F4";
        },
      },
    ],
  };

  useEffect(() => {
    if (fundStatus && fundStatus.amount != 0) {
      setChoice(fundStatus.submit ? '성공' : '실패');
    } else {
      setChoice('선택 안함');
    }
  }, [fundStatus]);

  useEffect(() => {
    let isZero = roi.count;
    let count = isZero == 0 ? 1 : isZero;
    let rate = (roi.success / count) * 100;
    setSuccessRate(rate);
  }, [roi]);

  useEffect(() => {
    let count = 0;
    let sumSeedMoney = 0;
    let sumPnl = 0;
    fundHistory.map((row) => {
      sumSeedMoney += row.seedMoney;
      sumPnl += row.pnl;
      count += 1;
    })

    count = count == 0 ? 1 : count;
    sumSeedMoney = sumSeedMoney == 0 ? 1 : sumSeedMoney;

    let avg = sumSeedMoney / count;
    let pRate = (sumPnl / sumSeedMoney) * 100;

    setPnlRate(pRate);
    setAvgFundMoney(avg);
  }, [fundHistory]);


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
                {fund ? <> {fund.content} </> : 
                <span style={{color:"#C1B8AD"}}>오늘은 투자 항목이 없어요 ㅠㅠ </span>
                }
              </div>
            </div>

            <div className={styles.card2}>
              <div className={styles.title1}>오늘 나의 선택</div>
              <div className={styles.card2_text1}>
                {choice === '선택 안함'? <span style={{color:"#C1B8AD"}}>오늘은 쉴래</span> : 
                  <>{choice === '성공'? 
                    <span style={{color:"#5E82CD"}}>{choice}</span> : 
                    <span style={{color:"#E26459"}}>{choice}</span>}
                  </>
                }
              </div>
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
                          <div className={styles.modalCoin}>{child.fundMoney} 도토리</div>
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
                        <div>{child.fundMoney - buyCoin} 도토리</div>
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
                  <div className={styles.card3Text1}>{child.fundMoney} 도토리</div>
                </div>
              </div>
              <div className={styles.card3}>
                <div className={styles.title2}>평균 투자 금액</div>
                <div className={styles.card3Content1}>
                  <div>
                    <img src={acornImg} style={{ width: "2vw" }} />
                  </div>
                  <div className={styles.card3Text1}>{avgFundMoney} 도토리</div>
                </div>
              </div>
              <div className={styles.card3}>
                <div className={styles.title2}>투자 성공률</div>
                <div className={styles.card3Text2}>{successRate}%</div>
              </div>
              <div className={styles.card3}>
                <div className={styles.title2}>이익률</div>
                <div className={styles.card3Text2}>{pnlRate}%</div>
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
