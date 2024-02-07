import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ParentFundAccountGraph from './ParentFundAccountGraph';
import ParentFundProfitGraph from './ParentFundProfitGraph';
import {createFund, createFundReservation, updateFundReservation, deleteFundReservation, getFund, getFundHistory, getFundReservation } from "@api/fund.js";

import styles from './ParentFund.module.css';

export default function ParentFund() {

    const childId = 2;  
    const [selectFund, setSelectedFund] = useState(false);
    const [selectReservationFund, setSelectReservationFund] = useState(false);
    const [fundCreateModalOpen, setFundCreateModalOpen] = useState(false);
    const [reservationFundCreateModalOpen, setReservationFundCreateModalOpen] = useState(false);
    const [fundNewsCreateModalOpen, setFundNewsCreateModalOpen] = useState(false);
    const [fundUpdateModalOpen, setFundUpdateModalOpen] = useState(false);
    const [reservationFundUpdateModalOpen, setReservationFundUpdateModalOpen] = useState(false);
    const [fund, setFund] = useState([]);
    const [fundReservation, setFundReservation] = useState([]);
    const [fundContent, setFundContent] = useState('');

    useEffect(() => {
        getFund(
            childId,
            (success) => {
                setFund(success.data.Fund);
                if (success.data.Fund) {
                    setSelectedFund(true);
                }
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
        getFundReservation(
            childId,
            (success) => {
                setFundReservation(success.data.FundReservation);
                if (success.data.FundReservation) {
                    setSelectReservationFund(true);
                }
            },
            (fail) => {
                console.log(fail);
            }
        );
        return () => {
            console.log('ChildManagement userEffect return');
        };
    }, []);

    const handleFundRegist = () => {
        createFund(
            {
                content: fundContent,
                childId: childId
            },
            (success) => {
                setFundReservation(success.data.Fund);
                setSelectReservationFund(true);
            },
            (fail) => {
                console.log(fail);
            }
        );
    };

    const handleFundReservationRegist = () => {
        createFundReservation(
            {
                content: fundContent,
                childId: childId
            },
            (success) => {
                setFundReservation(success.data.Fund);
                setSelectReservationFund(true);
            },
            (fail) => {
                console.log(fail);
            }
        );
    };

    const handleFundReservationUpdate = () => {
        updateFundReservation(
            {
                content: fundContent,
                childId: childId
            },
            (success) => {
                setFundReservation(success.data.Fund);
                setSelectReservationFund(true);
            },
            (fail) => {
                console.log(fail);
            }
        );
    };

    const handleFundReservationDelete = () => {
        deleteFundReservation(
            childId,
            (success) => {
                setSelectReservationFund(false);
            },
            (fail) => {
                console.log(fail);
            }
        );
    };

    const handelInputFundContent = (e) => {
        setFundContent(e.target.value);
    };

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
                    {selectFund && selectReservationFund? (
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
                            {selectReservationFund? <></> 
                            :
                            <div>
                                <button onClick={() => setFundCreateModalOpen(true)}>투자 등록하기</button>
                            </div>
                            }
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
                                            <input type="text" value={fundContent} onChange={handelInputFundContent} placeholder="투자 항목을 입력하세요" />
                                        </div>
                                        <button onClick={handleFundRegist}>투자 등록하기</button>
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
                            <p>투자 종목 : {fundReservation.content}</p>
                            <div style={{ textAlign: 'right' }}>
                                <button onClick={() => setReservationFundUpdateModalOpen(true)}>
                                    예약 투자종목 수정하기
                                </button>
                                &nbsp;&nbsp;
                                <button onClick={handleFundReservationDelete}>예약 투자종목 종료하기</button>
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
                                            <input type="text" value={fundContent} onChange={handelInputFundContent} placeholder={fundReservation.content} />
                                        </div>
                                        <button onClick={handleFundReservationUpdate}>예약 투자 수정하기</button>
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
                                            <input type="text" value={fundContent} onChange={handelInputFundContent} placeholder="예약 투자 항목을 입력하세요" />
                                        </div>

                                        <button onClick={handleFundReservationRegist}>예약 투자 등록하기</button>
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
