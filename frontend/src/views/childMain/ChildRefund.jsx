import styles from "./ChildRefund.module.css";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
export default function ChildRefund() {
  const [refundCoin, setRefundCoin] = useState("");
  const [isRefundBtnActive, setIsRefundBtnActive] = useState(false);
  const [isRefundBtnSubmit, setIsRefundBtnSubmit] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([null, null]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [finalRefundAmount, setFinalRefundAmount] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setRefundCoin(value);
    setIsRefundBtnActive(value > 0);
  };

  const handleStartQClick = () => {
    if (isRefundBtnActive) {
      setIsRefundBtnSubmit(true);
    }
  };

  const handelAnswerClick = (index, answer) => {
    const newSelectAns = [...selectedAnswers];
    newSelectAns[index] = answer;
    setSelectedAnswers(newSelectAns);
  };

  useEffect(() => {
    console.log("현재 선택한 정답:", selectedAnswers);
  }, [selectedAnswers]);

  useEffect(() => {
    console.log("맞은 정답 개수 : ", correctAnswers);
  }, [correctAnswers]);

  useEffect(() => {
    console.log("최종 환전 금액 : ", finalRefundAmount);
  }, [finalRefundAmount]);

  const handleRefundSubmit = () => {
    if (selectedAnswers.includes(null)) {
      // 1. 정답을 선택하지 않았을 때, 제출 버튼을 누른경우
      setIsModalOpen(true);
    } else {
      // 2. 정답을 다 고르고, 제출 버튼을 누른 경우
      // 정답을 몇 문제 맞췄는지 체크
      const correctAnswersCount = selectedAnswers.reduce(
        (count, userAnswer, index) => {
          const actualAnswer = quizData[index].ans;
          return userAnswer === actualAnswer ? count + 1 : count;
        },
        0
      );

      setCorrectAnswers(correctAnswersCount);
      console.log("잘되니 : ", correctAnswers);

      const per = [-0.1, 0, 0.1];

      // 3. 몇 문제를 맞추었고, 최종 환전 금액은 얼마인지
      const finalAmount =
        parseInt(refundCoin) + parseInt(refundCoin) * per[correctAnswers];
      console.log("최종 환전 금액 계산 : ", finalAmount);
      setFinalRefundAmount(finalAmount);

      // 4. 결과 모달 열기
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const quizData = [
    {
      id: 0,
      question: "엄마의 생년월일은 1970년 2월 8일이다.",
      ans: "O",
    },
    {
      id: 1,
      question: "아빠는 일주일에 3번씩 수영을 한다.",
      ans: "X",
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.title}>도토리 환전하기</div>
      <div className={styles.headContents}>
        <div className={styles.content1}>
          {isRefundBtnSubmit ? (
            <div className={styles.inputSide}>{refundCoin}</div>
          ) : (
            <input
              type="number"
              placeholder="환전할 도토리 개수 입력"
              value={refundCoin}
              onChange={handleInputChange}
              className={styles.input}
            />
          )}
          <div className={styles.inputSide}>개 도토리 환전하기</div>
        </div>
        {isRefundBtnSubmit ? null : (
          <div
            className={`${
              isRefundBtnActive ? styles.quizBtnActive : styles.quizBtn
            }`}
            onClick={handleStartQClick}
          >
            퀴즈풀러 가기
          </div>
        )}
      </div>
      <div className={styles.line}></div>
      {isRefundBtnSubmit ? (
        <div className={styles.quizContainer2}>
          {quizData.map((item, index) => (
            <div key={item.id} className={styles.quizContent}>
              <div className={styles.quizQuestion}>
                Q{index + 1}. {item.question}
              </div>
              <div className={styles.quizOX}>
                <div
                  className={styles.quizC}
                  style={{
                    color: "#4285F4",
                    backgroundColor:
                      selectedAnswers[index] === "O" ? "#c1b8ad" : "#ffffff",
                  }}
                  onClick={() => handelAnswerClick(index, "O")}
                >
                  O
                </div>
                <div
                  className={styles.quizC}
                  style={{
                    color: "#F12711",
                    backgroundColor:
                      selectedAnswers[index] === "X" ? "#c1b8ad" : "#ffffff",
                  }}
                  onClick={() => handelAnswerClick(index, "X")}
                >
                  X
                </div>
              </div>
            </div>
          ))}
          <div
            className={
              selectedAnswers.includes(null)
                ? styles.quizAnsSubmit1
                : styles.quizAnsSubmit2
            }
            onClick={handleRefundSubmit}
          >
            답안 제출하기
          </div>
        </div>
      ) : (
        <div className={styles.quizContainer1}>퀴즈를 풀어볼까요?</div>
      )}

      {/* Modal */}
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Result Modal"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "999" },
          content: {
            backgroundColor: "#F7F5F1",
            borderRadius: "15px",
            width: "40vw",
            height: "15vw",
            margin: "auto",
            padding: "30px",
            position: "absolute",
            // left: "65vw",
            zIndex: "999",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <div className={styles.modalComponent}>
          {selectedAnswers.includes(null) ? (
            <div className={styles.modalTitle}>
              답안을 입력하지 않은 문항이 있습니다.
            </div>
          ) : (
            <div className={styles.modalResult}>
              <div className={styles.modalTitle}>
                {correctAnswers}문제를 맞추었습니다!
              </div>
              <div className={styles.modalContents}>
                최종 환전 금액은 {finalRefundAmount}원 입니다.
              </div>
            </div>
          )}
          <button className={styles.modalClose} onClick={handleCloseModal}>
            닫기
          </button>
        </div>
      </Modal>
    </div>
  );
}
