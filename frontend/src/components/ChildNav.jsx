import { Outlet, useNavigate } from 'react-router-dom';
import kidImg from '@images/kidImg.jpg';
import styles from './ChildNav.module.css';
import s from 'classnames'; /* 클래스네임을 여러개 쓰기 위함 */
import { useState } from 'react';

function ChildNav() {
    const navigate = useNavigate();
    const [top, setTop] = useState(0);
    const a = ['5.5%', '18%', '29.5%', '41.5%'];

    const handleMain = (num) => {
        setTop(num);

        const pathMap = {
            0: '/child/main',
            1: '/child/fund',
            2: '/child/saving',
            3: '/child/edu',
        };

        const newPath = pathMap[num] || '/child/main';
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
                    <Component num={1} title={'투자'} />
                    <Component num={2} title={'적금'} />
                    <Component num={3} title={'공부방'} />
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
                <div className={styles.imgContainer}>
                    <img src={kidImg} />
                </div>
                <div>신짱아</div>
                <div>직업 : 펫시터</div>
                <div>엄마 : 봉미선</div>
            </div>
        </div>
    );
}

export default ChildNav;
