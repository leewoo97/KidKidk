import styles from "./ChildFundStatement.module.css";
import ChildFundStatementTable from "./ChildFundStatementTable.jsx";
import React, { useState, useEffect } from "react";
import { getFundHistory } from "@api/fund.js";

export default function ChildFundStatement() {

  const childId = 2;
  const [statementdata, setStatementdata] = useState([]);

  useEffect(() => {
    getFundHistory(
      childId,
      (success) => {
        setStatementdata(success.data.FundHistory);
        console.log(success.data.FundHistory);
      },
      (fail) => {
        console.log(fail);
      }
    );
    return () => {
      console.log('ChildManagement userEffect return');
    };
  }, []);

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
