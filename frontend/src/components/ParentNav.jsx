import { Outlet, useNavigate } from 'react-router-dom';

import ProfileNav from './ProfileNav';
import Modal from 'react-modal';
import { useState } from 'react';
import ParentAlarm from './ParentAlarm';

import { getChildList } from '@store/profile.js';

import styles from './ParentNav.module.css';
import s from 'classnames'; /* 클래스네임을 여러개 쓰기 위함 */
import bell from '@images/bell.png';
import kidImg from '@images/kidImg.jpg';

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

    // 가상의 사용자 데이터...
    const userData = [
        {
            user: '짱아',
            job: '펫시터',
        },
        { user: '짱구', job: '환경 미화원' },
    ];

    // 부모 모달 창
    const [parentAlarmOpen, setparentAlarmOpen] = useState(false);

    const parentAlarmModalIsOpen = () => setparentAlarmOpen(true);
    // console.log(typeof parentAlarmModalIsOpen);
    const parentAlarmCloseModal = () => setparentAlarmOpen(false);

    function Component({ num, title }) {
        return (
            <div className={s(styles.btn, top === num && styles.select)} onClick={() => handleMain(num)}>
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
                {/* 아이 탭 */}
                <div className={styles.parentChildTab}>
                    {userData.map((data) => (
                        <div key={data.user} className={styles.parentChildTabContainer}>
                            <div>{data.user}</div>&nbsp;&nbsp;
                            <div>{data.job}</div>
                        </div>
                    ))}
                </div>
                <div onClick={() => setparentAlarmOpen(true)}>
                    <img src={bell} className={styles.alarm} />
                </div>
                {parentAlarmOpen ? (
                    <Modal
                        appElement={document.getElementById('root')}
                        isOpen={!!parentAlarmModalIsOpen}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={parentAlarmCloseModal}
                        style={{
                            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '999' },
                            content: {
                                backgroundColor: '#F7F5F1',
                                borderRadius: '15px',
                                width: '30vw',
                                height: '90vh',
                                margin: 'auto',
                                padding: '30px',
                                position: 'absolute',
                                left: '65vw',
                                zIndex: '999',
                            },
                        }}
                    >
                        <ParentAlarm />
                    </Modal>
                ) : null}
            </div>
        </div>
    );
}

export default ParentNav;
