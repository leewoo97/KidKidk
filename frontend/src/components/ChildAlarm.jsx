import styles from './ChildAlarm.module.css';
import alarmCheak from '@images/alarmCheak.png';

function ChildAlarm() {
    const alarmData = [
        {
            id: 1,
            content: '정기적금이 출금되었습니다',
            coin: '-5000 도토리',
        },
        {
            id: 2,
            content: '정기적금이 만료되어 입금되었습니다',
            coin: '+21000 도토리',
        },
        {
            id: 3,
            content: '환전 요청이 수락되었습니다',
            coin: '-30000 도토리',
        },
        {
            id: 4,
            content: '새로운 직업이 부여되었습니다',
            coin: '정원사 - 화분에 물 주기',
        },
        {
            id: 5,
            content: '투자 항목이 갱신되었습니다',
            coin: '아빠는 오늘 술을 한 잔 이상 마셨습니다',
        },
        {
            id: 6,
            content: '주급이 입금되었습니다',
            coin: '+10000 도토리',
        },
        {
            id: 7,
            content: '새로운 직업이 부여되었습니다',
            coin: '정원사 - 화분에 물 주기',
        },
        {
            id: 8,
            content: '투자 항목이 갱신되었습니다',
            coin: '아빠는 오늘 술을 한 잔 이상 마셨습니다',
        },
        {
            id: 9,
            content: '주급이 입금되었습니다',
            coin: '+10000 도토리',
        },
    ];

    const Contents = ({ alarmData }) => {
        return (
            <>
                {alarmData.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.cardContent}>
                            <div>{item.content}</div>
                            <div style={{ fontSize: '12px' }}>{item.coin}</div>
                        </div>
                        <img src={alarmCheak} style={{ width: '2vw', height: '2vw', cursor: 'pointer' }} />
                    </div>
                ))}
            </>
        );
    };

    return (
        <div className={styles.alarmContainer}>
            <div className={styles.title}>알림 현황</div>
            <div className={styles.content}>
                <div className={styles.cardHead}>
                    <div>미확인 알림 : {alarmData.length}개</div>
                    <div className={styles.alarmDel}>모든 읽은 알림 삭제</div>
                </div>
                <div className={styles.cards}>
                    <Contents alarmData={alarmData} />
                </div>
            </div>
        </div>
    );
}

export default ChildAlarm;
