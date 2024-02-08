import styles from './ChildFundManagement.module.css';
import acornImg from '@images/acorn.png';
import { Bar } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getFund, getFundHistory, getRoi, getStatus } from '@api/fund.js';
import { getChild } from '@api/child.js';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { differenceInDays, format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChildFundManagement() {
    const childId = 2;
    const [isFundStart, setIsFundStart] = useState(true); // 부모가 투자 시작안했으면 false
    const [isFundItem, setIsFundItem] = useState(false); // 투자항목이 있으면 true
    const [currentIndex, setCurrentIndex] = useState(0); // 모달 페이지
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [buyCoin, setBuyCoin] = useState('');
    const [fund, setFund] = useState([]); // 투자 항목 테이블
    const [fundStatus, setFundStatus] = useState([]); // 투자 상태 테이블
    const [child, setChild] = useState([]); // 자식 테이블(코인, 투자자산)
    const [fundHistory, setFundHistory] = useState([]); // 투자 내역 테이블
    const [labels, setLabels] = useState([]); // 그래프 라벨
    const [rates, setRates] = useState([]); // 이익률
    const [roi, setRoi] = useState([]); // 투자 성공률 테이블
    const [successRate, setSuccessRate] = useState(0);
    const [avgFundMoney, setAvgFundMoney] = useState(0); // 평균 투자 금액
    const [choice, setChoice] = useState(''); // 아이의 베팅 선택
    const [pnlRate, setPnlRate] = useState(0); // 이익률
    const [sellCoin, setSellCoin] = useState(''); // 판매할 도토리
    const [isBuyBtnActive, setIsBuyBtnActive] = useState(false);
    const [isSellBtnActive, setIsSellBtnActive] = useState(false);
    const [currentHaveCoin, setCurrentHaveCoin] = useState(30000); // 현재 보유금
    const [currentFundCoin, setCurrentFundCoin] = useState(10000); // 현재 투자금
    const [myChoice, setMyChoice] = useState(0); // 오늘 나의 선택
    const [showDiv, setShowDiv] = useState(false); // 거래할 수 있는 시간이면 true

    // 투자를 거래할 수 있는 시간인지 확인
    useEffect(() => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        // 현재 시간이 9시에서 17시 사이인지 확인
        const isBetween9to5 = currentHour >= 8 && currentHour <= 19;

        // 현재 시간이 9시에서 17시 사이이면 showDiv 상태를 true로 설정
        setShowDiv(isBetween9to5);
    }, []);

    useEffect(() => {
        // 투자항목 테이블 조회
        getFund(
            childId,
            (success) => {
                setFund(success.data.Fund);
                if (success.data.Fund) {
                    setIsFundItem(true);
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
        // 자식 테이블 조회
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
        // 투자 내역 테이블 조회
        // 최근 일주일 투자 현황의 라벨과 데이터를 뽑아냄
        getFundHistory(
            childId,
            (success) => {
                setFundHistory(success.data.FundHistory);
                labels.length = 0;
                rates.length = 0;
                let dateTime = format(new Date(), 'yyyy.MM.dd');
                let labelList = [];
                let rateList = [];
                success.data.FundHistory.map((row) => {
                    let dataLog = new Date(row.dataLog);
                    let fDataLog = format(dataLog, 'yyyy.MM.dd');
                    if (differenceInDays(new Date(dateTime), new Date(fDataLog)) <= 7) {
                        labelList.push(fDataLog);
                        rateList.push((row.pnl < row.seedMoney ? -1 : 1) * row.yield);
                    }
                });
                setLabels(labelList);
                setRates(rateList);
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
        // 투자 성공률 조회
        getRoi(
            childId,
            (success) => {
                setRoi(success.data.roi);
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
        // 투자 상태 조회
        getStatus(
            childId,
            (success) => {
                setFundStatus(success.data.FundStatus);
            },
            (fail) => {
                console.log(fail);
            }
        );
        return () => {
            console.log('ChildManagement userEffect return');
        };
    }, []);

    const handleReset = () => {
        // buyCoin 상태 초기화
        setBuyCoin('');
        setSellCoin('');
    };

    const handleInputBuyChange = (e) => {
        const value = e.target.value;
        setBuyCoin(value);
        setIsBuyBtnActive(value > 0 && value <= child.fundMoney);
    };

    const handleInputSellChange = (e) => {
        const value = e.target.value;
        setSellCoin(value);
        setIsSellBtnActive(value > 0 && value <= currentFundCoin);
    };

    // 모달 열기
    const openModal = () => {
        setBuyCoin('');
        setSellCoin('');
        setCurrentIndex(0); // 모달이 열릴 때마다 현재 페이지 초기화
        setModalIsOpen(true);
    };

    const changeModalContent = (index) => {
        setCurrentIndex(index);
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // 세로선 숨김
                },
            },
            y: {
                grid: {
                    drawBorder: false, // 기본 그리드 라인 숨김
                },
                ticks: {
                    callback: function (value, index, values) {
                        return value; // 다른 눈금에는 라벨 표시
                    },
                    afterBuildTicks: function (scale) {
                        // 특정 위치에 0 값을 포함한 눈금 생성
                        if (!scale.ticks.includes(0)) {
                            scale.ticks.push(0);
                        }
                    },
                },
            },
        },
    };

    // 최근 일주일 투자현황 data
    const data = {
        labels,
        datasets: [
            {
                data: rates,
                backgroundColor: function (context) {
                    const value = context.dataset.data[context.dataIndex];
                    return value >= 0 ? '#F1554C' : '#4285F4';
                },
            },
        ],
    };

    // 아이의 투자 상태를 setChoice에 저장
    // fundStatus 객체가 변경될 때마다 useEffect 콜백 함수를 실행
    // setChoice 함수를 호출하여 choice 상태를 업데이트
    useEffect(() => {
        if (fundStatus && fundStatus.amount != 0) {
            setChoice(fundStatus.submit ? '성공' : '실패');
        } else {
            setChoice('선택 안함');
        }
    }, [fundStatus]);

    // 투자 성공률 변동을 setSuccessRate에 저장
    // 투자 성공률 roi 객체가 변경될 때마다 콜백 함수 실행
    useEffect(() => {
        let isZero = roi.count; // 투자 횟수
        let count = isZero == 0 ? 1 : isZero;
        let rate = (roi.success / count) * 100;
        setSuccessRate(rate);
    }, [roi]);

    // 평균 투자금액, 이익률을 저장
    // fundHistory 객체가 변경될 때마다 콜백 함수 실행
    useEffect(() => {
        let count = 0;
        let sumSeedMoney = 0;
        let sumPnl = 0;
        fundHistory.map((row) => {
            sumSeedMoney += row.seedMoney;
            sumPnl += row.pnl;
            count += 1;
        });

        count = count == 0 ? 1 : count;
        sumSeedMoney = sumSeedMoney == 0 ? 1 : sumSeedMoney;

        let avg = sumSeedMoney / count; // 평균 투자금액
        let pRate = (sumPnl / sumSeedMoney) * 100; // 이익률

        setAvgFundMoney(avg);
        setPnlRate(pRate);
    }, [fundHistory]);

    return (
        <div>
            {!isFundStart ? (
                <div className={styles.manageContainer}>
                    <div className={styles.fundNot}>투자를 통해 도토리를 모아봐요!</div>
                </div>
            ) : (
                <div className={styles.manageContainer}>
                    <div className={styles.content1}>
                        <div className={styles.card1}>
                            <div className={styles.title1}>
                                투자 항목
                                {isFundItem && showDiv ? (
                                    <div className={styles.startFund} onClick={openModal}>
                                        거래하러 가기
                                    </div>
                                ) : null}
                            </div>
                            <div className={styles.card1_text1}>
                                {fund ? (
                                    <> {fund.content} </>
                                ) : (
                                    <span style={{ color: '#C1B8AD' }}>오늘은 투자 항목이 없어요 ㅠㅠ </span>
                                )}
                            </div>
                        </div>

                        <div className={styles.card2}>
                            <div className={styles.title1}>오늘 나의 선택</div>
                            <div className={styles.card2_text1}>
                                {choice === '선택 안함' ? (
                                    <span style={{ color: '#C1B8AD' }}>오늘은 쉴래</span>
                                ) : (
                                    <>
                                        {choice === '성공' ? (
                                            <span style={{ color: '#5E82CD' }}>{choice}</span>
                                        ) : (
                                            <span style={{ color: '#E26459' }}>{choice}</span>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <Modal
                        appElement={document.getElementById('root')}
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        className={`${styles.modal} ${
                            currentIndex === 0
                                ? styles.modalBuy
                                : currentIndex === 1
                                ? styles.modalSell
                                : currentIndex === 2
                                ? styles.modalBet
                                : ''
                        }`}
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                zIndex: '999',
                            },
                            content: {
                                borderRadius: '15px',
                                width: '30vw',
                                height: '55vh',
                                margin: 'auto',
                                padding: '1vw',
                                position: 'absolute',
                                top: '35vh',
                                left: '65vw',
                                zIndex: '999',
                            },
                        }}
                    >
                        <div className={styles.modalContainer}>
                            <div className={styles.modalHead}>
                                <div
                                    className={`${styles.modalHead1} ${
                                        currentIndex === 0 ? styles.redColor : styles.grayColor
                                    }`}
                                    onClick={() => changeModalContent(0)}
                                >
                                    사기
                                </div>
                                <div
                                    className={`${styles.modalHead2} ${
                                        currentIndex === 1 ? styles.blueColor : styles.grayColor
                                    }`}
                                    onClick={() => changeModalContent(1)}
                                >
                                    팔기
                                </div>
                                <div
                                    className={`${styles.modalHead3} ${
                                        currentIndex === 2 ? styles.greenColor : styles.grayColor
                                    }`}
                                    onClick={() => changeModalContent(2)}
                                >
                                    베팅
                                </div>
                            </div>
                            {currentIndex === 0 && (
                                <div className={styles.modalBody}>
                                    <div className={styles.modalBodyContainer}>
                                        <div className={styles.modalBody1}>
                                            <div className={styles.modalBody1Content}>
                                                <div className={styles.modalMax}>최대 구매 가능</div>
                                                <div className={styles.modalCoinBox}>
                                                    <div className={styles.modalCoin}>{child.fundMoney} 도토리</div>
                                                    <img src={acornImg} style={{ width: '2vw' }} />
                                                </div>
                                            </div>
                                            <div className={styles.modalBody1Line} />
                                        </div>

                                        <div className={styles.modalBody2}>
                                            <input
                                                type="number"
                                                placeholder="도토리 개수 입력"
                                                value={buyCoin}
                                                onChange={handleInputBuyChange}
                                                className={styles.input}
                                            />
                                            <div className={styles.modalMax}>개 도토리 사기</div>
                                        </div>

                                        <div className={styles.modalBody3}>
                                            <div className={styles.modalMax}>구매 후 투자계좌에 남은 도토리</div>
                                            <div className={styles.modalCoinBox1}>
                                                <div className={styles.modalCoin1}>
                                                    {child.fundMoney - buyCoin >= 0
                                                        ? `${child.fundMoney - buyCoin} 도토리`
                                                        : '구매할 수 없습니다.'}
                                                </div>
                                                <img src={acornImg} style={{ width: '2vw' }} />
                                            </div>
                                        </div>
                                        <div className={styles.modalBodyBtns}>
                                            <div className={styles.modalReset} onClick={handleReset}>
                                                초기화
                                            </div>
                                            <div
                                                className={`${styles.modalChoBtn} ${
                                                    isBuyBtnActive && currentIndex === 0
                                                        ? styles.modalBuy
                                                        : !isBuyBtnActive && currentIndex === 0
                                                        ? styles.modalBeforeBuy
                                                        : ''
                                                }`}
                                            >
                                                구매하기
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentIndex === 1 && (
                                <div className={styles.modalBody}>
                                    <div className={styles.modalBodyContainer}>
                                        <div className={styles.modalBody1}>
                                            <div className={styles.modalBody1Content}>
                                                <div className={styles.modalMax}>최대 판매 가능</div>
                                                <div className={styles.modalCoinBox}>
                                                    <div className={styles.modalCoin}>{currentFundCoin} 도토리</div>
                                                    <img src={acornImg} style={{ width: '2vw' }} />
                                                </div>
                                            </div>
                                            <div className={styles.modalBody1Line} />
                                        </div>

                                        <div className={styles.modalBody2}>
                                            <input
                                                type="number"
                                                placeholder="도토리 개수 입력"
                                                value={sellCoin}
                                                onChange={handleInputSellChange}
                                                className={styles.input}
                                            />
                                            <div className={styles.modalMax}>개 도토리 팔기</div>
                                        </div>

                                        <div className={styles.modalBody3}>
                                            <div className={styles.modalMax}>판매 후 투자계좌에 남은 도토리</div>
                                            <div className={styles.modalCoinBox1}>
                                                <div className={styles.modalCoin1}>
                                                    {currentFundCoin - sellCoin >= 0
                                                        ? `${currentFundCoin - sellCoin} 도토리`
                                                        : '판매할 수 없습니다.'}
                                                </div>
                                                <img src={acornImg} style={{ width: '2vw' }} />
                                            </div>
                                        </div>
                                        <div className={styles.modalBodyBtns}>
                                            <div className={styles.modalReset} onClick={handleReset}>
                                                초기화
                                            </div>
                                            <div
                                                className={`${styles.modalChoBtn} ${
                                                    isSellBtnActive && currentIndex === 1
                                                        ? styles.modalSell
                                                        : !isSellBtnActive && currentIndex === 1
                                                        ? styles.modalBeforeSell
                                                        : ''
                                                }`}
                                            >
                                                판매하기
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {currentIndex === 2 && (
                                <div className={styles.modalBody}>
                                    <div className={styles.betContainer}>
                                        <div className={styles.betBody1}>
                                            <div className={styles.betBody1Title}>투자 항목</div>
                                            <div className={styles.betBody1Content}>
                                                내일 엄마의 몸무게는 증가할 것이다.
                                            </div>
                                        </div>

                                        <div className={styles.betBody2}>
                                            <div className={styles.modalBody2Line} />
                                            <div className={styles.betBody2Title}>
                                                <div>이익률</div>
                                                <div>투자 성공 시</div>
                                                <div>투자 실패 시</div>
                                            </div>
                                            <div className={styles.betBody2Contents}>
                                                <div>6%</div>
                                                <div>
                                                    +500 도토리
                                                    <img src={acornImg} style={{ width: '1.5vw' }} />
                                                </div>
                                                <div>
                                                    -500 도토리
                                                    <img src={acornImg} style={{ width: '1.5vw' }} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.modalBodyBtns}>
                                            <div className={styles.modalReset} onClick={() => setMyChoice(0)}>
                                                초기화
                                            </div>
                                            <div
                                                className={`${styles.modalChoBtn} ${
                                                    currentIndex === 2 ? styles.modalSell : ''
                                                }`}
                                                onClick={() => setMyChoice(1)}
                                            >
                                                성공
                                            </div>
                                            <div
                                                className={`${styles.modalChoBtn} ${
                                                    currentIndex === 2 ? styles.modalBuy : ''
                                                }`}
                                                onClick={() => setMyChoice(2)}
                                            >
                                                실패
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Modal>

                    <div className={styles.content2}>
                        <div className={styles.content2Title}>나의 투자 통계</div>
                        <div className={styles.content2Contents}>
                            <div className={styles.card3}>
                                <div className={styles.title2}>현재 투자금</div>
                                <div className={styles.card3Content1}>
                                    <div>
                                        <img src={acornImg} style={{ width: '2vw' }} />
                                    </div>
                                    <div className={styles.card3Text1}>{child.fundMoney} 도토리</div>
                                </div>
                            </div>
                            <div className={styles.card3}>
                                <div className={styles.title2}>평균 투자 금액</div>
                                <div className={styles.card3Content1}>
                                    <div>
                                        <img src={acornImg} style={{ width: '2vw' }} />
                                    </div>
                                    <div className={styles.card3Text1}>{avgFundMoney} 도토리</div>
                                </div>
                            </div>
                            <div className={styles.card3}>
                                <div className={styles.title2}>투자 성공률</div>
                                <div className={styles.card3Text2}>{successRate}%</div>
                            </div>
                            <div className={styles.card3}>
                                <div className={styles.title2}>이익률</div>
                                <div className={styles.card3Text2}>{pnlRate}%</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.content3}>
                        <div className={styles.card7}>
                            <div className={styles.content2Title}>최근 일주일 투자 현황</div>
                            <div className={styles.graph}>
                                <Bar style={{ width: '500px', height: '60px' }} options={options} data={data} />
                            </div>
                        </div>
                        <div className={styles.card8}></div>
                        <div className={styles.card9}>
                            <div className={styles.content2Title}>투자뉴스</div>
                            <div className={styles.content3News}>
                                <div>오늘 엄마는 회식이 있다</div>
                                <div>오늘 엄마는 회식이 있다</div>
                                <div>오늘 엄마는 회식이 있다</div>
                                <div>오늘 엄마는 회식이 있다</div>
                                <div>오늘 엄마는 회식이 있다</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
