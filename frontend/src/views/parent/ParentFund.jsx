import ParentFundAccountGraph from './ParentFundAccountGraph';
import ParentFundProfitGraph from './ParentFundProfitGraph';

import styles from './ParentFund.module.css';

export default function ParentFund() {
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
                    <div className={styles.childFundStatusFrame}>
                        <p>투자 종목 : 엄마의 몸무게는 증가할 것이다</p>
                        <div style={{ textAlign: 'right' }}>
                            <button>투자종목 수정하기</button>&nbsp;&nbsp;
                            <button>투자종목 종료하기</button>
                        </div>
                    </div>
                </div>
                <div className={styles.childReservationFundStatus}>
                    <p>신짱아 어린이의 예약 투자 내역</p>
                    <div className={styles.childReservationFundStatusFrame}>
                        <p>투자 종목 : 아빠의 음주는 줄어들 것이다</p>
                        <div style={{ textAlign: 'right' }}>
                            <button>투자종목 수정하기</button>&nbsp;&nbsp;
                            <button>투자종목 종료하기</button>
                        </div>
                    </div>
                </div>
                <div className={styles.todayFundNews}>
                    <p>오늘의 투자 뉴스 등록하기</p>
                    <div className={styles.todayFundNewsFrame}>
                        <p>
                            오늘의 투자 뉴스 : &nbsp;&nbsp;
                            <input type="text" />
                        </p>

                        <button>투자 뉴스 등록하기</button>
                    </div>
                </div>
            </div>
        </>
    );
}
