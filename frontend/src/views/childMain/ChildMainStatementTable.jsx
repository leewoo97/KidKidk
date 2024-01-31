import styles from "./ChildMainStatementTable.module.css";

const ChildMainStateMentTable = ({ data }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headtr}>
            <th>일자</th>
            <th>유형</th>
            <th>변동내역</th>
            <th>주머니</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.date}</td>
              <td>{row.type}</td>
              <td>{row.state}</td>
              <td>{row.coin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChildMainStateMentTable;
