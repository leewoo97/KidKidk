import styles from './WelcomePageSecond.module.css';

import welcomeJob from '@images/welcomeJob.jpg';
import welcomeFund from '@images/welcomeFund.png';
import welcomeSaving from '@images/welcomeSaving.jpg';
import welcomeEdu from '@images/welcomeEdu.png';

export default function WelcomePageFirst() {
    return (
        <>
            <div className={styles.welcomePageSecondContainer}>
                <div className={styles.welcomeJob}>
                    <p>아이에게 직업을 만들어주세요</p>
                    <div className={styles.welcomeImgContainer}>
                        <img src={welcomeJob} alt="직업 설명" />
                        <p>dfddadf</p>
                    </div>
                </div>
                <div className={styles.welcomeSaving}>
                    <p>아이에게 적금을 알려주세요</p>{' '}
                    <div className={styles.welcomeImgContainer}>
                        <img src={welcomeSaving} alt="직업 설명" />
                        <p>dfddadf</p>
                    </div>
                </div>
                <div className={styles.welcomeFund}>
                    <p>아이에게 투자를 알려주세요</p>
                    <div className={styles.welcomeImgContainer}>
                        <img src={welcomeFund} alt="직업 설명" />
                        <p>dfddadf</p>
                    </div>
                </div>
                <div className={styles.welcomeEdu}>
                    <p>아이에게 맞춤 경제 교육을 시작하세요</p>
                    <div className={styles.welcomeImgContainer}>
                        <img src={welcomeEdu} alt="직업 설명" />
                        <p>dfddadf</p>
                    </div>
                </div>
            </div>
        </>
    );
}
