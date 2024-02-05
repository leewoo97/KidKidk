import alarmDoneStamp from '@images/alarmDoneStamp.png';
import alarmAcceptExchange from '@images/alarmAcceptExchange.png';

import styles from './ParentAlarm.module.css';

export default function ParentAlarm() {
    // 가상 데이터...
    const userData = [
        {
            user: '짱아',
        },
        { user: '짱구' },
    ];

    const alarmData = [
        {
            id: 1,
            require: 'job',
            title: '짱아 어린이가 미션을 완료하였습니다.',
            content: '똘이 산책시키기',
        },
        {
            id: 2,
            require: 'job',
            title: '짱아 어린이가 미션을 완료하였습니다.',
            content: '똘이 산책시키기',
        },
        {
            id: 3,
            require: 'exchange',
            title: '짱아 어린이가 환전을 요청하였습니다.',
            content: '5000 도토리 환전 요청',
        },
        {
            id: 4,
            require: 'exchange',
            title: '짱아 어린이가 환전을 요청하였습니다.',
            content: '5000 도토리 환전 요청',
        },
        {
            id: 5,
            require: 'job',
            title: '짱아 어린이가 미션을 완료하였습니다.',
            content: '똘이 산책시키기',
        },
        {
            id: 6,
            require: 'job',
            title: '짱아 어린이가 미션을 완료하였습니다.',
            content: '똘이 산책시키기',
        },
        {
            id: 7,
            require: 'exchange',
            title: '짱아 어린이가 환전을 요청하였습니다.',
            content: '5000 도토리 환전 요청',
        },
        {
            id: 8,
            require: 'exchange',
            title: '짱아 어린이가 환전을 요청하였습니다.',
            content: '5000 도토리 환전 요청',
        },
        {
            id: 9,
            require: 'job',
            title: '짱아 어린이가 미션을 완료하였습니다.',
            content: '똘이 산책시키기',
        },
        {
            id: 10,
            require: 'job',
            title: '짱아 어린이가 미션을 완료하였습니다.',
            content: '똘이 산책시키기',
        },
        {
            id: 11,
            require: 'exchange',
            title: '짱아 어린이가 환전을 요청하였습니다.',
            content: '5000 도토리 환전 요청',
        },
        {
            id: 12,
            require: 'exchange',
            title: '짱아 어린이가 환전을 요청하였습니다.',
            content: '5000 도토리 환전 요청',
        },
    ];
    const AlarmContents = ({ parentAlarmData }) => {
        return (
            <>
                {parentAlarmData &&
                    parentAlarmData.map((item) => (
                        <div
                            key={item.id}
                            className={styles.card}
                            style={{
                                color: item.require === 'job' ? '#80759E' : '#8e4865',
                                borderColor: item.require === 'job' ? '#80759E' : '#8e4865',
                            }}
                        >
                            <div className={styles.cardContent}>
                                <div>{item.title}</div>
                                <div style={{ fontSize: '12px' }}>{item.content}</div>
                            </div>
                            {item.require === 'job' ? (
                                <img src={alarmDoneStamp} style={{ width: '6vw', height: '2vw', cursor: 'pointer' }} />
                            ) : (
                                <img
                                    src={alarmAcceptExchange}
                                    style={{ width: '6vw', height: '2vw', cursor: 'pointer' }}
                                />
                            )}
                        </div>
                    ))}
            </>
        );
    };
    return (
        <>
            <div className={styles.parentAlarmContainer}>
                <div className={styles.parentAlarmTitle}>
                    <p>알림 현황</p>
                </div>
                <div className={styles.parentAlarmButtons}>
                    <button>전체</button>
                    {userData.map((data) => (
                        <button key={data.user}>{data.user}</button>
                    ))}
                </div>
                <div className={styles.parentAlarmInfo}>
                    <span>미확인 알림 : {alarmData.length}개</span>
                    <button className={styles.parentAlarmContainer}>모든 읽은 알림 삭제</button>
                </div>
                <div className={styles.parentAlarmContents}>
                    <AlarmContents parentAlarmData={alarmData} />
                </div>
            </div>
        </>
    );
}
