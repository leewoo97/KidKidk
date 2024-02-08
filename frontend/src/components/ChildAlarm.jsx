import styles from './ChildAlarm.module.css';
import alarmCheak from '@images/alarmCheck.png';
import { useRecoilState } from 'recoil';
import { lastEventIdState, notificationsState, sseState } from '../store/alarmAtom';
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

function ChildAlarm() {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const [sse, setSse] = useRecoilState(sseState);
    const [lastEventId, setLastEventId] = useRecoilState(lastEventIdState);
    const [notifications, setNotifications] = useRecoilState(notificationsState);
    
    const kafkaSub = () => {
        setSse(new EventSource(`http://localhost:8080/kafka/subscribe/2`, {
            headers: {
                "Last-Event-ID" : lastEventId,
            },
            heartbeatTimeout: 5*60*1000,
        }).onmessage = (event) =>    {
            console.log(event);
            if(event.data !== "connected!"){setNotifications(prev => [...prev, JSON.parse(event.data)]);}
            setLastEventId(event.lastEventId);
        });
    }

    const handleClickRead = (key) => {
        setNotifications(notifications.map(noti => noti.key === key ? {...noti, read: !noti.read} : noti ));
    }

    const deleteReadNotifications = () => {
        setNotifications(notifications.filter(noti => !noti.read));
    }

    
    

    const Contents = ({ alarmData }) => {
        return (
            <>
                {alarmData.map((item) => (
                    <div key={item.key} className={styles.card}>
                        <div className={styles.cardContent}>
                            <div>{item.message}</div>
                            <div style={{ fontSize: '12px' }}>{item.sub_message}</div>
                        </div>
                        { !item.read && <img src={alarmCheak} onClick={() => handleClickRead(item.key)} style={{ width: '2vw', height: '2vw', cursor: 'pointer' }} />}
                    </div>
                ))}
            </>
        );
    };

    return (
        <div className={styles.alarmContainer}>
            <button onClick={kafkaSub}>카프카 연결 테스트</button>
            <div className={styles.title}>알림 현황</div>
            <div className={styles.content}>
                <div className={styles.cardHead}>
                    <div>미확인 알림 : {notifications.length}개</div>
                    <div className={styles.alarmDel} onClick={deleteReadNotifications}>모든 읽은 알림 삭제</div>
                </div>
                <div className={styles.cards}>
                    <Contents alarmData={notifications} />
                </div>
            </div>
        </div>
    );
}

export default ChildAlarm;
