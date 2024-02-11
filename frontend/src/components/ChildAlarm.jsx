import styles from './ChildAlarm.module.css';
import alarmCheck from '@images/alarmCheck.png';
import alarmCheckRead from '@images/alarmCheckRead.png'
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { lastEventIdState, notificationsState, sseState } from '../store/alarmAtom';
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

function ChildAlarm() {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const [sse, setSse] = useRecoilState(sseState);
    const [lastEventId, setLastEventId] = useRecoilState(lastEventIdState);
    const [notifications, setNotifications] = useRecoilState(notificationsState);
    
    const [profileId, setProfileId] = useState(2);
    const kafkaSub = () => {
        setSse(new EventSource(`notification.silvstone.xyz/subscribe/${profileId}`, {
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
                    <>
                    { !item.read ? (
                        <div key={item.key} className={styles.card}>
                            <div className={styles.cardContent}>
                                <div>{item.title}</div>
                                <div style={{ fontSize: '12px' }}>{item.content}</div>
                            </div>
                            <img src={alarmCheck} onClick={() => handleClickRead(item.key)} style={{ width: '2vw', height: '2vw', cursor: 'pointer' }} />
                        </div>
                    ) :
                    ( 
                        <div key={item.key} className={styles.cardRead}>
                        <div className={styles.cardContent}>
                            <div>{item.title}</div>
                            <div style={{ fontSize: '12px' }}>{item.content}</div>
                        </div>
                        <img src={alarmCheckRead} style={{ width: '2vw', height: '2vw'}} />
                    </div>

                    )}
                    </>
                    
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
                    <div>미확인 알림 : {notifications.filter(noti => !noti.read).length}개</div>
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
