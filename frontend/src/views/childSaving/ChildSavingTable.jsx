import styles from "./ChildSavingTable.module.css";

const ChildSavingTable = ({ data }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headtr}>
            <th>일자</th>
            <th>유형</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.date}</td>
              <td>{row.type}</td>
              <td>{row.coin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChildSavingTable;
