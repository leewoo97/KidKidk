import { Outlet, useNavigate } from 'react-router-dom';
import styles from './ParentNav.module.css';
import s from 'classnames'; /* 클래스네임을 여러개 쓰기 위함 */
import ProfileNav from './ProfileNav';
import { useState } from 'react';

function ParentNav() {
    const navigate = useNavigate();
    const [top, setTop] = useState(0);
    const a = ['5.5%', '18%', '29.5%'];

    const handleMain = (num) => {
        setTop(num);

        const pathMap = {
            0: '/parent/main',
            1: '/parent/job',
            2: '/parent/fundsaving',
        };

        const newPath = pathMap[num] || '/parent/main';
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
        <div className={styles.container}>
            <div className={styles.nav}>
                <div className={styles.logo}>KIDKIDK</div>
                <div className={styles.menu}>
                    <Component num={0} title={'메인'} />
                    <Component num={1} title={'직업'} />
                    <Component num={2} title={'투자/적금'} />
                </div>
                <div className={styles.light} style={{ top: a[top] }}>
                    <div className={styles.rectangleRow}></div>
                    <div className={styles.rectangleCol}>
                        <div className={styles.rectangleMin1}></div>
                        <div className={styles.rectangleMin2}></div>
                    </div>
                </div>
            </div>
            <div className={styles.contents}>
                <Outlet />
            </div>
            <div className={styles.profile}>
                <ProfileNav />
            </div>
        </div>
    );
}

export default ParentNav;
