import { useNavigate } from "react-router-dom";
import styles from "./ChildNav.module.css";
import s from "classnames"; /* 클래스네임을 여러개 쓰기 위함 */
import { useState } from "react";

function ChildNav() {
  const navigate = useNavigate();
  const [top, setTop] = useState(0);
  const a = ["25px", "99px", "173px", "247px"];

  const handleMain = (num) => {
    setTop(num);

    const pathMap = {
      0: "/child/main/management",
      1: "/child/fund/management",
      2: "/child/saving/management",
      3: "/child/education",
    };

    const newPath = pathMap[num] || "/child/main/management";
    navigate(newPath);
  };

  function Component({ num, title }) {
    return (
      <div
        className={s(styles.btn, top === num && styles.select)}
        onClick={() => handleMain(num)}
      >
        {title}
      </div>
    );
  }

  return (
    <div className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>KIDKIDK</div>
        <div className={styles.menu}>
          <Component num={0} title={"메인"} />
          <Component num={1} title={"투자"} />
          <Component num={2} title={"적금"} />
          <Component num={3} title={"공부방"} />
        </div>
        <div className={styles.현재위치} style={{ top: a[top] }}>
          <div className={styles.rectangleRow}></div>
          <div className={styles.rectangleCol}>
            <div className={styles.rectangleMin1}></div>
            <div className={styles.rectangleMin2}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChildNav;
