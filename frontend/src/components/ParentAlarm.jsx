import alarmDoneStamp from '@images/alarmDoneStamp.png';
import alarmAcceptExchange from '@images/alarmAcceptExchange.png';
import alarmCheckRead from '@images/alarmCheckRead.png'

import styles from './ParentAlarm.module.css';

import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { lastEventIdState, notificationsState, sseState } from '../store/alarmAtom';
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

export default function ParentAlarm() {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const [sse, setSse] = useRecoilState(sseState);
    const [lastEventId, setLastEventId] = useRecoilState(lastEventIdState);
    const [notifications, setNotifications] = useRecoilState(notificationsState);

    const [profileId, setProfileId] = useState(2);

    const [userData, setUserData] = useState(['짱구', '짱아']);

    const [selected, setSelected] = useState("전체");

    const kafkaSub = () => {
        setSse(new EventSource(`http://localhost:8081/kafka/subscribe/${profileId}`, {
            headers: {
                "Last-Event-ID" : lastEventId,
            },
            heartbeatTimeout: 5*60*1000,
        }).onmessage = (event) =>    {
            console.log(event);
            if(event.data !== "connected!"){
                const jsonData = JSON.parse(event.data);
                setNotifications(prev => [...prev, jsonData]);
            }
            setLastEventId(event.lastEventId);
        });
    }

    const handleClickRead = (key) => {
        setNotifications(notifications.map(noti => noti.key === key ? {...noti, read: !noti.read} : noti ));
    }

    const deleteReadNotifications = () => {
        setNotifications(notifications.filter(noti => !noti.read));
    }

    const handleClickChild = (e) => {
        setSelected(e.target.value);
    }

   
    const AlarmContents = ({ parentAlarmData }) => {
        return (
            
            <>
                {parentAlarmData &&
                    parentAlarmData.map((item) => (
                        <>
                        { !item.read ? (
                            <div
                                key={item.key}
                                className={styles.card}
                                style={{
                                    color: item.require === 'job' ? '#80759E' : '#8e4865',
                                    borderColor: item.require === 'job' ? '#80759E' : '#8e4865',
                                }}>
                                <div className={styles.cardContent}>
                                    <div>{item.title}</div>
                                    <div style={{ fontSize: '12px' }}>{item.content}</div>
                                </div>
                                {item.require === 'job' ? (
                                    <img src={alarmDoneStamp} 
                                        onClick={() => handleClickRead(item.key)} 
                                        style={{ width: '6vw', height: '2vw', cursor: 'pointer' }} />
                                ) : (
                                    <img
                                        src={alarmAcceptExchange}
                                        onClick={() => handleClickRead(item.key)}
                                        style={{ width: '6vw', height: '2vw', cursor: 'pointer' }}
                                    />
                                )}
                            </div>
                            ) : (
                            <div
                                key={item.key}
                                className={styles.card}
                                style={{
                                color: '#C1B8AD',
                                borderColor: '#C1B8AD',
                                }}>
                                <div className={styles.cardContent}>
                                    <div>{item.title}</div>
                                    <div style={{ fontSize: '12px' }}>{item.content}</div>
                                </div>
                                <img src={alarmCheckRead} 
                                    style={{ width: '2vw', height: '2vw', cursor: 'pointer' }} />
                            </div>
                        )}
                        </>   
                    ))}
            </>
        );
    };
    return (
        <>
            <div className={styles.parentAlarmContainer}>
                <button onClick={kafkaSub}>카프카 연결 테스트</button>
                <div className={styles.parentAlarmTitle}>
                    <p>알림 현황</p>
                </div>
                <div className={styles.parentAlarmButtons}>
                    <button value="전체" onClick={handleClickChild}>전체</button>
                    {userData.map((child) => (
                        <button key={child} value={child} onClick={handleClickChild}>{child}</button>
                    ))}
                </div>
                <div className={styles.parentAlarmInfo}>
                    {selected === '전체' 
                        ? (<span>미확인 알림 : {notifications.filter(noti => !noti.read).length}개</span>)
                        : (<span>미확인 알림 : {notifications.filter(noti => (noti.pubName === selected) && !noti.read).length}개</span>)
                    }
                    <button onClick ={deleteReadNotifications} className={styles.parentAlarmContainer}>모든 읽은 알림 삭제</button>
                </div>
                <div className={styles.parentAlarmContents}>
                    {selected === '전체' 
                        ? (<AlarmContents parentAlarmData={notifications} />) 
                        : (<AlarmContents parentAlarmData={notifications.filter(noti => noti.pubName === selected)} />)
                    }
                </div>
            </div>
        </>
    );
}
