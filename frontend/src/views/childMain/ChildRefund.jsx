import styles from "./ChildRefund.module.css";
import React, { useState } from "react";
export default function ChildRefund() {
  const [refundCoin, setRefundCoin] = useState("");
  const [isRefundBtnActive, setIsRefundBtnActive] = useState(false);
  const [isRefundBtnSubmit, setIsRefundBtnSubmit] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setRefundCoin(value);
    setIsRefundBtnActive(value > 0);
  };

  const handleRefundClick = () => {
    if (isRefundBtnActive) {
      setIsRefundBtnSubmit(true);
      console.log("환전할 도토리 개수:", refundCoin);
    }
  };

  const quizData = [
    {
      id: 1,
      question: "틈새시장은 세분화한 다양한 상품으로 이뤄진다.",
      ans: "O",
    },
    {
      id: 2,
      question: "개인이 금융기관에서 빌려 쓰는 돈을 가계대출이라 한다.",
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
            onClick={handleRefundClick}
          >
            퀴즈풀러 가기
          </div>
        )}
      </div>
      <div className={styles.line}></div>
      {isRefundBtnSubmit ? (
        <div className={styles.quizContainer2}>
          {quizData.map((item) => (
            <div>
              <div>{item.question}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.quizContainer1}>퀴즈를 풀어볼까요?</div>
      )}
    </div>
  );
}
