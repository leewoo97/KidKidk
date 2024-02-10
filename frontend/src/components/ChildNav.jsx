import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import kidImg from '@images/kidImg.jpg';
import bell from '@images/bell.png';
import acornImg from '@images/acorn.png';
import styles from './ChildNav.module.css';
import s from 'classnames'; /* 클래스네임을 여러개 쓰기 위함 */
import { useState, useEffect } from 'react';
import { getChild } from '@api/child.js';
import { transferToFundMoney } from '@api/profile.js';
import { transferToCoin } from '@api/fund.js';
import Modal from 'react-modal';
import ChildAlarm from './ChildAlarm.jsx';

function ChildNav() {

    const childId = 2;
    const navigate = useNavigate();
    const location = useLocation(); // 현재 url을 확인
    const [top, setTop] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [chargeModalIsOpen, setChargeModalIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0); // 입/출금 모달 페이지
    const [chargeCoinIn, setChargeCoinIn] = useState(''); // 입금 input 모달 페이지
    const [chargeCoinOut, setChargeCoinOut] = useState(''); // 출금 input 모달 페이지
    const [chargeBtnActive, setChargeBtnActive] = useState(false); // 입/출금 모달 버튼 활성화 여부
    const a = ['5.5%', '18%', '29.5%', '41.5%'];
    const [child, setChild] = useState([{
        coin : 0,
        fundMoney : 0
    }]);

    useEffect(() => {
        getChild(
            childId,
            (success) => {
                setChild(success.data);
            },
            (fail) => {
                console.log(fail);
            }
        );
        return () => {
            console.log('ChildManagement userEffect return');
        };
    }, []);

    useEffect(() => {
        // 페이지가 로드될 때 현재 URL을 확인하여 알맞은 탭을 활성화
        const pathMap = {
            '/child/main': 0,
            '/child/fund': 1,
            '/child/saving': 2,
            '/child/edu': 3,
        };
        const currentTop = pathMap[location.pathname] || 0;
        setTop(currentTop);
    }, [location]);

    // 입금 및 출금 모달 열기
    const openChargeModal = () => {
        setCurrentIndex(0);
        setChargeModalIsOpen(true);
    };

    // 입금 input 태그에 적은 금액
    const handleInputChargeIn = (e) => {
        const value = e.target.value;
        setChargeCoinIn(value);
    };

    // 출금 input 태그에 적은 금액
    const handleInputChargeOut = (e) => {
        const value = e.target.value;
        setChargeCoinOut(value);
    };

    const handleCoinIn = () => {
        transferToFundMoney(
            {
                coin : chargeCoinIn,
                childId : childId
            },
            () => {
                setChild({
                    childId: child.childId,
                    coin: child.coin - chargeCoinIn,
                    fundMoney: child.fundMoney + chargeCoinIn
                });
            },
            (fail) => {
                console.log(fail);
            }
        );
        return () => {
            console.log('ChildManagement userEffect return');
        };
    };

    const handleCoinOut = () => {
        transferToCoin(
            {
                fundMoney : chargeCoinOut,
                childId : childId
            },
            () => {
                setChild({
                    childId: child.childId,
                    coin: child.coin + chargeCoinIn,
                    fundMoney: child.FundMoney - chargeCoinIn
                });
            },
            (fail) => {
                console.log(fail);
            }
        );
        return () => {
            console.log('ChildManagement userEffect return');
        };
    };

    const changeModalContent = (index) => {
        setCurrentIndex(index);
    };

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
            <div className={styles.pocket1}>
                <div className={styles.pocketTitle}>나의 주머니</div>
                <div className={styles.pocketContainer}>
                    <div className={styles.pocketCoin}>
                        {child.coin} 도토리
                        <img src={acornImg} style={{ width: '1.5vw' }} />
                    </div>
                    <div className={styles.refundBtn} onClick={() => navigate('/child/refund')}>
                        환전하기
                    </div>
                </div>
            </div>
            <div className={styles.pocket2}>
                <div className={styles.pocketTitle}>투자 주머니</div>
                <div className={styles.pocketContainer}>
                    <div className={styles.pocketCoin}>
                        {child.fundMoney} 도토리
                        <img src={acornImg} style={{ width: '1.5vw' }} />
                    </div>
                    <div className={styles.refundBtn} onClick={openChargeModal}>
                        입금 및 출금하기
                    </div>
                </div>
            </div>
            <Modal
                appElement={document.getElementById('root')}
                isOpen={chargeModalIsOpen}
                onRequestClose={() => setChargeModalIsOpen(false)}
                className={`${styles.modal} ${
                    currentIndex === 0 ? styles.modalDeepGreen : currentIndex === 1 ? styles.modalLightGreen : ''
                }`}
                style={{
                    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '999' },
                    content: {
                        // backgroundColor: '#F7F5F1',
                        borderRadius: '15px',
                        width: '30vw',
                        height: '50vh',
                        padding: '1vw',
                        top: '20%',
                        left: '35%',
                        position: 'absolute',
                        zIndex: '999',
                    },
                }}
            >
                <div className={styles.modalContainer}>
                    <div className={styles.modalHead}>
                        <div
                            className={`${styles.modalHead1} ${
                                currentIndex === 0 ? styles.deepGreenColor : styles.grayColor
                            }`}
                            onClick={() => changeModalContent(0)}
                        >
                            입금
                        </div>
                        <div
                            className={`${styles.modalHead2} ${
                                currentIndex === 1 ? styles.lightGreenColor : styles.grayColor
                            }`}
                            onClick={() => changeModalContent(1)}
                        >
                            출금
                        </div>
                    </div>
                    <div className={styles.modalBody}>
                        {currentIndex === 0 && (
                            <div className={styles.modalBody}>
                                <div className={styles.chargeModalTitle1}>투자 주머니에 입금하기</div>
                                <div className={styles.chargeModalContent}>
                                    <div className={styles.chargeModalText}>최대 입금 가능</div>
                                    <div className={styles.chargeModalContent2}>
                                        <div className={styles.chargeModalText}>{child.coin} 도토리</div>
                                        <img src={acornImg} style={{ width: '1.5vw' }} />
                                    </div>
                                </div>
                                <div className={styles.chargeModalContent1}>
                                    <input
                                        type="number"
                                        placeholder="도토리 개수 입력"
                                        value={chargeCoinIn}
                                        onChange={handleInputChargeIn}
                                        className={styles.input}
                                    />
                                    <div className={styles.modalMax}>개 도토리 입금하기</div>
                                </div>
                                <div className={styles.chargeModalBtn1} onClick={handleCoinIn}>입금하기</div>
                            </div>
                        )}
                        {currentIndex === 1 && (
                            <div className={styles.modalBody}>
                                <div className={styles.chargeModalTitle2}>나의 주머니로 출금하기</div>
                                <div className={styles.chargeModalContent}>
                                    <div className={styles.chargeModalText}>최대 출금 가능</div>
                                    <div className={styles.chargeModalContent2}>
                                        <div className={styles.chargeModalText}>{child.fundMoney} 도토리</div>
                                        <img src={acornImg} style={{ width: '1.5vw' }} />
                                    </div>
                                </div>
                                <div className={styles.chargeModalContent1}>
                                    <input
                                        type="number"
                                        placeholder="도토리 개수 입력"
                                        value={chargeCoinOut}
                                        onChange={handleInputChargeOut}
                                        className={styles.input}
                                    />
                                    <div className={styles.modalMax}>개 도토리 출금하기</div>
                                </div>
                                <div className={styles.chargeModalBtn2} onClick={handleCoinOut}>출금하기</div>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>

            <div onClick={() => setModalIsOpen(true)}>
                <img src={bell} className={styles.alarm} />
            </div>
            <Modal
                appElement={document.getElementById('root')}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
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
                <ChildAlarm />
            </Modal>
        </div>
    );
}

export default ChildNav;
