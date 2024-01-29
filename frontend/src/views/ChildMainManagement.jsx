import styles from "./ChildMainManagement.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

function ManagementContent() {
  return <div> 관리 컴포넌트 내용 </div>;
}

function StatementContent() {
  return <div> 내역 컴포넌트 내용 </div>;
}

function ChildMainManagement() {
  const [left, setLeft] = useState(0);
  const [selectedToggle, setSelectedToggle] = useState(0);

  function Toggle({ num, title }) {
    const isSelected = selectedToggle === num;

    const handleToggleClick = (num) => {
      setSelectedToggle(num);

      if (num === 0) {
        setLeft(0);
      } else if (num === 1) {
        setLeft(190);
      }
    };

    const textClass = isSelected ? styles.textselected : styles.textunselected;
    const lineClass = isSelected ? styles.lineselected : styles.lineunselected;

    return (
      <div className={`${textClass}`} onClick={() => handleToggleClick(num)}>
        {title}
        <hr className={`${lineClass}`} />
      </div>
    );
  }

  const renderContent = () => {
    if (selectedToggle === 0) {
      return <ManagementContent />;
    } else if (selectedToggle === 1) {
      return <StatementContent />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.toggle}>
          <Toggle num={0} title={"관리"} />
          <Toggle num={1} title={"내역"} />
        </div>
        <div className={styles.circle} style={{ left: `${left}px` }}></div>
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
}

export default ChildMainManagement;
