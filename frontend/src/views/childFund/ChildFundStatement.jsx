import styles from "./ChildFundStatement.module.css";
import ChildFundStatementTable from "./ChildFundStatementTable.jsx";

export default function ChildFundStatement() {
  const statementdata = [
    {
      id: 1,
      date: "2024.01.16 오전 10:39",
      type: "투자 성공",
      state: "+7%",
      coin: "20300 도토리",
    },
    {
      id: 2,
      date: "2024.01.16 오전 10:38",
      type: "투자 성공",
      state: "+7%",
      coin: "20300 도토리",
    },
    {
      id: 3,
      date: "2024.01.16 오전 09:23",
      type: "투자 실패",
      state: "-7%",
      coin: "20300 도토리",
    },
    {
      id: 4,
      date: "2024.01.16 오전 09:23",
      type: "투자 성공",
      state: "+7%",
      coin: "20300 도토리",
    },
    {
      id: 5,
      date: "2024.01.16 오전 09:23",
      type: "투자 실패",
      state: "-7%",
      coin: "20300 도토리",
    },
    {
      id: 6,
      date: "2024.01.16 오전 09:23",
      type: "투자 성공",
      state: "+7%",
      coin: "20300 도토리",
    },
    {
      id: 7,
      date: "2024.01.16 오전 09:23",
      type: "투자 성공",
      state: "+7%",
      coin: "20300 도토리",
    },
    {
      id: 8,
      date: "2024.01.16 오전 09:23",
      type: "투자 성공",
      state: "+7%",
      coin: "20300 도토리",
    },
    {
      id: 9,
      date: "2024.01.16 오전 09:23",
      type: "투자 실패",
      state: "-7%",
      coin: "20300 도토리",
    },

    {
      id: 10,
      date: "2024.01.16 오전 09:23",
      type: "투자 실패",
      state: "-7%",
      coin: "20300 도토리",
    },
    {
      id: 11,
      date: "2024.01.16 오전 09:23",
      type: "투자 성공",
      state: "+7%",
      coin: "20300 도토리",
    },
    {
      id: 12,
      date: "2024.01.16 오전 09:23",
      type: "투자 실패",
      state: "-7%",
      coin: "20300 도토리",
    },
  ];
  return (
    <div className={styles.stateContainer}>
      <div className={styles.stateTitle}>나의 투자 내역</div>
      <div className={styles.scrollContainer}>
        <div className={styles.scrollContent}>
          <ChildFundStatementTable data={statementdata} />
        </div>
      </div>
    </div>
  );
}
