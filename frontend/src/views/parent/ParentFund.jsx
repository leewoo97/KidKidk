import { useState } from 'react';
import Modal from 'react-modal';

import ParentFundAccountGraph from './ParentFundAccountGraph';
import ParentFundProfitGraph from './ParentFundProfitGraph';

import styles from './ParentFund.module.css';

export default function ParentFund() {
    const [selectFund, setSelectedFund] = useState(true);
    const [selectReservationFund, setSelectReservationFund] = useState(true);
    const [fundCreateModalOpen, setFundCreateModalOpen] = useState(false);
    const [reservationFundCreateModalOpen, setReservationFundCreateModalOpen] = useState(false);
    const [fundNewsCreateModalOpen, setFundNewsCreateModalOpen] = useState(false);
    const [fundUpdateModalOpen, setFundUpdateModalOpen] = useState(false);
    const [reservationFundUpdateModalOpen, setReservationFundUpdateModalOpen] = useState(false);

    return (
        <>
            <div className={styles.parentFundContainer}>
                <div className={styles.fundAccountGraph}>
                    <ParentFundAccountGraph />
                </div>
                <div className={styles.fundBenefitGraph}>
                    <ParentFundProfitGraph />
                </div>
                <div className={styles.childFundStatus}>
                    <p>신짱아 어린이의 투자 내역</p>
                    {selectFund ? (
                        <div className={styles.childFundStatusFrame}>
                            <p>투자 종목 : 엄마의 몸무게는 증가할 것이다</p>
                            <div style={{ textAlign: 'right' }}>
                                <button onClick={() => setFundUpdateModalOpen(true)}>투자종목 수정하기</button>
                                &nbsp;&nbsp;
                                <button>투자종목 종료하기</button>
                            </div>
                            <Modal
                                appElement={document.getElementById('root')}
                                isOpen={fundUpdateModalOpen}
                                onRequestClose={() => setFundUpdateModalOpen(false)}
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
                                <div className={styles.fundModal}>
                                    <p>투자 수정</p>
                                    <form className={styles.fundForm}>
                                        <div className={styles.fundInputContainer}>
                                            <input type="text" placeholder="투자 항목을 입력하세요" />
                                        </div>

                                        <button>투자 수정하기</button>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    ) : (
                        <div className={styles.childNoFundStatusFrame}>
                            <p style={{ color: 'red' }}>현재 등록된 투자항목이 없습니다.</p>
                            <div>
                                <button onClick={() => setFundCreateModalOpen(true)}>투자 등록하기</button>
                            </div>
                            <Modal
                                appElement={document.getElementById('root')}
                                isOpen={fundCreateModalOpen}
                                onRequestClose={() => setFundCreateModalOpen(false)}
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
                                <div className={styles.fundModal}>
                                    <p>투자 등록</p>
                                    <form className={styles.fundForm}>
                                        <div className={styles.fundInputContainer}>
                                            <input type="text" placeholder="투자 항목을 입력하세요" />
                                        </div>

                                        <button>투자 등록하기</button>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    )}
                </div>
                <div className={styles.childReservationFundStatus}>
                    <p>신짱아 어린이의 예약 투자 내역</p>
                    {selectReservationFund ? (
                        <div className={styles.childReservationFundStatusFrame}>
                            <p>투자 종목 : 아빠의 음주는 줄어들 것이다</p>
                            <div style={{ textAlign: 'right' }}>
                                <button onClick={() => setReservationFundUpdateModalOpen(true)}>
                                    예약 투자종목 수정하기
                                </button>
                                &nbsp;&nbsp;
                                <button>예약 투자종목 종료하기</button>
                            </div>
                            <Modal
                                appElement={document.getElementById('root')}
                                isOpen={reservationFundUpdateModalOpen}
                                onRequestClose={() => setReservationFundUpdateModalOpen(false)}
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
                                <div className={styles.fundModal}>
                                    <p>예약 투자 수정</p>
                                    <form className={styles.fundForm}>
                                        <div className={styles.fundInputContainer}>
                                            <input type="text" placeholder="투자 항목을 입력하세요" />
                                        </div>

                                        <button>예약 투자 수정하기</button>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    ) : (
                        <div className={styles.childNoReservationFundStatusFrame}>
                            <p style={{ color: 'red' }}>현재 예약된 투자항목이 없습니다.</p>
                            <div>
                                <button onClick={() => setReservationFundCreateModalOpen(true)}>
                                    예약 투자 등록하기
                                </button>
                            </div>
                            <Modal
                                appElement={document.getElementById('root')}
                                isOpen={reservationFundCreateModalOpen}
                                onRequestClose={() => setReservationFundCreateModalOpen(false)}
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
                                <div className={styles.fundModal}>
                                    <p>예약 투자 등록</p>
                                    <form className={styles.fundForm}>
                                        <div className={styles.fundInputContainer}>
                                            <input type="text" placeholder="예약 투자 항목을 입력하세요" />
                                        </div>

                                        <button>예약 투자 등록하기</button>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    )}
                </div>
                <div className={styles.todayFundNews}>
                    <p>오늘의 투자 뉴스 등록하기</p>
                    <div className={styles.todayFundNewsFrame}>
                        <p>
                            오늘의 투자 뉴스 : &nbsp;&nbsp;
                            <input type="text" />
                        </p>

                        <button onClick={() => setFundNewsCreateModalOpen(true)}>투자 뉴스 등록하기</button>
                    </div>
                    <Modal
                        appElement={document.getElementById('root')}
                        isOpen={fundNewsCreateModalOpen}
                        onRequestClose={() => setFundNewsCreateModalOpen(false)}
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
                        <div className={styles.fundModal}>
                            <p>투자 뉴스 등록</p>
                            <form className={styles.fundForm}>
                                <div className={styles.fundInputContainer}>
                                    <input type="text" placeholder="오늘의 투자 뉴스를 입력하세요" />
                                </div>

                                <button>투자 뉴스 등록하기</button>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    );
}