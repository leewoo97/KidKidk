import styles from "./ChildSaving.module.css";
import React, { useState, useEffect } from "react";
import { addDays, format } from 'date-fns';
import { getChild } from '@api/child.js';
import { getSaving, getSavingHistory } from '@api/saving.js';
import acornImg from "@images/acorn.png";
import tuto1 from "@images/tuto1.png";
import tuto2 from "@images/tuto2.png";
import tuto3 from "@images/tuto3.png";
import tuto4 from "@images/tuto4.png";
import tuto5 from "@images/tuto5.png";
import ChildSavingTable from "./ChildSavingTable.jsx";
import Modal from "react-modal";

export default function ChildSaving() {

  const childId = 2;
  const [isSavingStart, setIsSavingStart] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTutorialIndex, setCurrentTutorialIndex] = useState(0);
  const [modalContents, setModalContents] = useState([
    "Tutorial 1",
    "Tutorial 2",
    "Tutorial 3",
    "Tutorial 4",
    "Tutorial 5",
  ]);
  const [child, setChild] = useState([]);
  const [saving, setSaving] = useState([]);
  const [savingHistory, setSavingHistory] = useState([]);
  const [payHistory, setPayHistory] = useState([]);
  const [countPayment, setCountPayment] = useState(0);
  const [endSavingDate, setEndSavingDate] = useState('');

  useEffect(() => {
    getChild(
        childId,
        (success) => {
            setChild(success.data);
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
    getSaving(
        childId,
        (success) => {
            setSaving(success.data.Saving);
            let tmpSaving = success.data.Saving;
            const savingStartDate = new Date(tmpSaving.startDate);
            const calcDate = addDays(savingStartDate, 22);
            const endDate = format(calcDate, 'yyyy-MM-dd');
            const calcCountPaymet = tmpSaving.payment * (4-tmpSaving.count);
            const today = format(new Date(), 'yyyy-MM-dd');

            setCountPayment(calcCountPaymet);
            setEndSavingDate(endDate);
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
            setSavingHistory(success.data.SavingHistories);
            let tempSavingHistories = success.data.SavingHistories;
            let size = tempSavingHistories.length;
            let eachSavingHistories = [1, 2, 3, 4];
            const tempPayHistory = eachSavingHistories.map((index) => {
                const history = index <= size ? tempSavingHistories[index - 1] : false;

                const amount = history ? history.amount : 0;
                return { id: index, amount: amount };
            });
            setPayHistory(tempPayHistory);
        },
        (fail) => {
            console.log(fail);
        }
    );
    return () => {
        console.log('ChildManagement userEffect return');
    };
}, []);

  // 모달 열기
  const openModal = () => {
    setCurrentTutorialIndex(0); // 모달이 열릴 때마다 현재 페이지 초기화
    setModalIsOpen(true);
  };
  const renderPageDots = () => {
    return modalContents.map((_, index) => (
      <div
        key={index}
        className={`${styles.pageDot} ${
          currentTutorialIndex === index ? styles.active : ""
        }`}
        onClick={() => changeModalContent(index)}
      />
    ));
  };

  const changeModalContent = (index) => {
    setCurrentTutorialIndex(index);
  };
  
  return (
    <div className={styles.savingCon}>
      {payHistory.length > 0 ? (
        <div className={styles.savingContainer}>
          <div className={styles.Container1}>
            <div className={styles.Container1Title}>적금 납부 횟수</div>
            <div className={styles.bars}>
              <div className={styles.bar}>
                <div className={styles.barWeek}>1주차</div>
                <div className={styles.bar1}
                  style={{
                    backgroundColor: payHistory[0].amount > 0 ? '#90ee90' : '#d3d3d3',
                  }}>
                </div>
              </div>
              <div className={styles.bar}>
                <div className={styles.barWeek}>2주차</div>
                <div className={styles.bar1}
                  style={{
                    backgroundColor: payHistory[1].amount > 0 ? '#90ee90' : '#d3d3d3',
                  }}>
                </div>
              </div>
              <div className={styles.bar}>
                <div className={styles.barWeek}>3주차</div>
                <div className={styles.bar1}
                  style={{
                    backgroundColor: payHistory[2].amount > 0 ? '#90ee90' : '#d3d3d3',
                  }}>
                </div>
              </div>
              <div className={styles.bar}>
                <div className={styles.barWeek}>4주차</div>
                <div className={styles.bar1}
                  style={{
                    backgroundColor: payHistory[3].amount > 0 ? '#90ee90' : '#d3d3d3',
                  }}>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.Container2}>
            <div className={styles.card1}>
              <div className={styles.card1Title}>지금까지 납부한 금액</div>
              <div className={styles.card1Content1}>
                <div>
                  <img src={acornImg} style={{ width: "3vw" }} />
                </div>
                <div className={styles.card1Text}>{countPayment} 도토리</div>
              </div>
            </div>
            <div className={styles.card2}>
              <div className={styles.card1Title}>적금 만기 일</div>
              <div className={styles.card2Text}>{endSavingDate}</div>
            </div>
          </div>

          <div className={styles.Container3}>
            <div className={styles.Container3Title}>나의 적금 내역</div>
            <div className={styles.scrollContainer}>
              <div className={styles.scrollContent}>
                <ChildSavingTable data={savingHistory} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.savingContainer}>
          {isSavingStart ? (
            <div className={styles.nonBox}>
              <div className={styles.box1}>
                내일부터 적금 통장이 생길거예요!
              </div>
            </div>
          ) : (
            <div className={styles.nonBox}>
              <div className={styles.box1}>현재 적금 계좌가 없어요!</div>
              <div className={styles.box2} onClick={openModal}>
                적금 계좌 만들기
              </div>
              <Modal
                appElement={document.getElementById("root")}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: "999",
                  },
                  content: {
                    backgroundColor: "#F8F3E7",
                    borderRadius: "15px",
                    width: "30vw",
                    height: "70vh",
                    margin: "auto",
                    padding: "30px",
                    position: "absolute",
                    zIndex: "999",
                  },
                }}
              >
                {currentTutorialIndex === 0 && (
                  <div className={styles.modalContainer}>
                    <div className={styles.circleContainer}>
                      {renderPageDots()}
                    </div>
                    <div className={styles.modalTitle}>
                      4주동안 진행되는 적금
                    </div>
                    <div className={styles.modalIcon}>
                      <img src={tuto1} style={{ width: "15vw" }} />
                    </div>
                    <div className={styles.modalContents}>
                      적금은 4주 동안 진행되며 안정적인 수익을 제공해요
                    </div>
                    <div
                      className={styles.modalOneBtn}
                      onClick={() =>
                        changeModalContent(currentTutorialIndex + 1)
                      }
                    >
                      다음 페이지
                    </div>
                  </div>
                )}
                {currentTutorialIndex === 1 && (
                  <div className={styles.modalContainer}>
                    <div className={styles.circleContainer}>
                      {renderPageDots()}
                    </div>
                    <div className={styles.modalTitle}>만기시 이자율 5%</div>
                    <div className={styles.modalIcon}>
                      <img src={tuto2} style={{ width: "15vw" }} />
                    </div>
                    <div className={styles.modalContents}>
                      <div>원금 + 추가 5%</div>
                      <div>적금은 안정적인 수익을 제공해요</div>
                    </div>
                    <div className={styles.modalBtns}>
                      <div
                        className={styles.modalTwoBtn1}
                        onClick={() =>
                          changeModalContent(currentTutorialIndex - 1)
                        }
                      >
                        이전 페이지
                      </div>
                      <div
                        className={styles.modalTwoBtn2}
                        onClick={() =>
                          changeModalContent(currentTutorialIndex + 1)
                        }
                      >
                        다음 페이지
                      </div>
                    </div>
                  </div>
                )}
                {currentTutorialIndex === 2 && (
                  <div className={styles.modalContainer}>
                    <div className={styles.circleContainer}>
                      {renderPageDots()}
                    </div>
                    <div className={styles.modalTitle}>
                      매주 납부요일 오전 9시에 자동 납입
                    </div>
                    <div className={styles.modalIcon}>
                      <img src={tuto3} style={{ width: "15vw" }} />
                    </div>
                    <div className={styles.modalContents}>
                      <div>납기일은 적금시작 다음날!</div>
                      <div>매주 해당 요일에 돈이 빠져나가요</div>
                    </div>
                    <div className={styles.modalBtns}>
                      <div
                        className={styles.modalTwoBtn1}
                        onClick={() =>
                          changeModalContent(currentTutorialIndex - 1)
                        }
                      >
                        이전 페이지
                      </div>
                      <div
                        className={styles.modalTwoBtn2}
                        onClick={() =>
                          changeModalContent(currentTutorialIndex + 1)
                        }
                      >
                        다음 페이지
                      </div>
                    </div>
                  </div>
                )}
                {currentTutorialIndex === 3 && (
                  <div className={styles.modalContainer}>
                    <div className={styles.circleContainer}>
                      {renderPageDots()}
                    </div>
                    <div className={styles.modalTitle}>
                      납부할 도토리가 없으면 미납처리
                    </div>
                    <div className={styles.modalIcon}>
                      <img src={tuto4} style={{ width: "15vw" }} />
                    </div>
                    <div className={styles.modalContents}>
                      납기일에 도토리가 부족하면 납부가 안돼요
                    </div>
                    <div className={styles.modalBtns}>
                      <div
                        className={styles.modalTwoBtn1}
                        onClick={() =>
                          changeModalContent(currentTutorialIndex - 1)
                        }
                      >
                        이전 페이지
                      </div>
                      <div
                        className={styles.modalTwoBtn2}
                        onClick={() =>
                          changeModalContent(currentTutorialIndex + 1)
                        }
                      >
                        다음 페이지
                      </div>
                    </div>
                  </div>
                )}
                {currentTutorialIndex === 4 && (
                  <div className={styles.modalContainer}>
                    <div className={styles.circleContainer}>
                      {renderPageDots()}
                    </div>
                    <div className={styles.modalTitle}>4번 중 3번이상 납부</div>
                    <div className={styles.modalIcon}>
                      <img src={tuto5} style={{ width: "15vw" }} />
                    </div>
                    <div className={styles.modalContents}>
                      4주동안 미납횟수가 2번이 되면 자동으로 해지돼요
                    </div>
                    <div className={styles.modalBtns}>
                      <div
                        className={styles.modalTwoBtn1}
                        onClick={() =>
                          changeModalContent(currentTutorialIndex - 1)
                        }
                      >
                        이전 페이지
                      </div>
                      <div
                        className={styles.modalTwoBtn3}
                        onClick={() => {
                          changeModalContent(currentTutorialIndex + 1),
                            setIsSavingStart(true);
                        }}
                      >
                        적금 계좌 생성
                      </div>
                    </div>
                  </div>
                )}
              </Modal>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
