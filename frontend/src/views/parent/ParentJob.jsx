import { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { useRecoilState } from 'recoil';
import { getJob } from '@api/job.js';
import { getJobData } from '@store/jobAtom.js';

import styles from './ParentJob.module.css';
import kidImg from '@images/kidImg.jpg';

export default function ParentJob() {
    const [selectJob, setSelectedJob] = useState(true);
    const [selectReservationJob, setSelectReservationJob] = useState(true);
    const [jobCreateModalOpen, setJobCreateModalOpen] = useState(false);
    const [reservationJobCreateModalOpen, setReservationJobCreateModalOpen] = useState(false);
    const [jobUpdateModalOpen, setJobUpdateModalOpen] = useState(false);

    const [jobData, setJobData] = useRecoilState(getJobData);

    // 직업 조회 API
    const getJobDataAxios = useEffect(() => {
        console.log('Enter getJobDataAxios useEffect');
        getJob(
            // 부모가 탭에서 선택한 아이 아이디
            2,
            (success) => {
                setJobData(success.data.Job);
                console.log(success);
            },
            (fail) => {
                console.log(fail);
            }
        );
        return () => {
            console.log('Return getJobDataAxios useEffect');
        };
    }, []);

    return (
        <div className={styles.parentJobContainer}>
            <div className={styles.parentJobContainerStart}>
                <div className={styles.childProfile}>
                    <p>짱아 어린이의 프로필</p>
                    {selectJob ? (
                        <div className={styles.childProfileFrame}>
                            <div>
                                <div className={styles.childProfileImage}>
                                    <img src={kidImg} />
                                </div>
                            </div>
                            <div>
                                <ul className={styles.childProfileTitle}>
                                    <li>직업 </li>
                                    <li>업무 </li>
                                    <li>횟수 </li>
                                    <li>급여 </li>
                                </ul>
                            </div>
                            <div>
                                <ul className={styles.childProfileContent}>
                                    {jobData ? (
                                        <>
                                            <li>{jobData.name}</li>
                                            <li>{jobData.task}</li>
                                            <li>주 {jobData.taskAmount}일</li>
                                            <li>{jobData.wage} 도토리</li>
                                        </>
                                    ) : (
                                        <>직업이 없습니다.</>
                                    )}
                                </ul>
                            </div>
                            <div>
                                <button className={styles.jobDeleteButton}>직업 삭제하기</button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.childNoProfileFrame}>
                            <p style={{ color: 'red' }}>현재 등록된 직업이 없습니다.</p>
                            <div>
                                <button onClick={() => setJobCreateModalOpen(true)} className={styles.jobCreateButton}>
                                    직업 등록하기
                                </button>
                            </div>
                            <Modal
                                appElement={document.getElementById('root')}
                                isOpen={jobCreateModalOpen}
                                onRequestClose={() => setJobCreateModalOpen(false)}
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
                                <div className={styles.jobModal}>
                                    <p>직업 등록</p>
                                    <form className={styles.jobForm}>
                                        <div className={styles.jobInputContainer}>
                                            <input type="text" placeholder="직업을 입력하세요" />
                                        </div>
                                        <div className={styles.jobInputContainer}>
                                            <input type="text" placeholder="할 업무를 입력하세요" />
                                        </div>
                                        <div className={styles.jobInputContainer}>
                                            <input type="text" placeholder="급여를 입력하세요" />
                                        </div>

                                        <button>직업 등록하기</button>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    )}
                </div>
                <div className={styles.jobProgressStatus}>
                    <p>업무 진척도</p>
                    <div className={styles.jobProgressStatusFrame}>
                        <ul>
                            <li>
                                <label htmlFor="workProgress">똘이 산책시키기 :</label>
                            </li>
                            <li>
                                <progress className={styles.progress} id="workProgress" max="100" value="40"></progress>
                            </li>
                            <li>2/5</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.jobReservationStatus}>
                    <p>직업 예약 현황</p>
                    {selectReservationJob ? (
                        <div className={styles.jobReservationStatusFrame}>
                            <div>
                                <ul className={styles.jobReservationStatusTitle}>
                                    <li>직업 </li>
                                    <li>업무 </li>
                                    <li>횟수 </li>
                                    <li>급여 </li>
                                </ul>
                            </div>
                            <div>
                                <ul className={styles.jobReservationStatusContent}>
                                    <li>펫시터</li>
                                    <li>똘이 산책 시키기</li>
                                    <li>주 5일</li>
                                    <li>20000 도토리</li>
                                </ul>
                            </div>
                            <div>
                                <button
                                    onClick={() => setJobUpdateModalOpen(true)}
                                    className={styles.jobReservationUpdateButton}
                                >
                                    예약 직업 수정하기
                                </button>
                                &nbsp;&nbsp;
                                <button className={styles.jobReservationDeleteButton}>예약 직업 삭제하기</button>
                            </div>
                            <Modal
                                appElement={document.getElementById('root')}
                                isOpen={jobUpdateModalOpen}
                                onRequestClose={() => setJobUpdateModalOpen(false)}
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
                                <div className={styles.jobModal}>
                                    <p>예약 직업 수정</p>
                                    <form className={styles.jobForm}>
                                        <div className={styles.jobInputContainer}>
                                            <input type="text" placeholder="직업을 입력하세요" />
                                        </div>
                                        <div className={styles.jobInputContainer}>
                                            <input type="text" placeholder="할 업무를 입력하세요" />
                                        </div>
                                        <div className={styles.jobInputContainer}>
                                            <input type="text" placeholder="급여를 입력하세요" />
                                        </div>

                                        <button>예약 직업 수정하기</button>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    ) : (
                        <div className={styles.jobReservationNoStatusFrame}>
                            <p style={{ color: 'red' }}>현재 예약된 직업이 없습니다.</p>
                            <div>
                                <button
                                    onClick={() => setReservationJobCreateModalOpen(true)}
                                    className={styles.jobCreateButton}
                                >
                                    예약 직업 등록하기
                                </button>
                            </div>
                            <Modal
                                appElement={document.getElementById('root')}
                                isOpen={reservationJobCreateModalOpen}
                                onRequestClose={() => setReservationJobCreateModalOpen(false)}
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
                                <div className={styles.jobModal}>
                                    <p>예약 직업 등록</p>
                                    <form className={styles.jobForm}>
                                        <div className={styles.jobInputContainer}>
                                            <input type="text" placeholder="예약 직업을 입력하세요" />
                                        </div>
                                        <div className={styles.jobInputContainer}>
                                            <input type="text" placeholder="예약 할 업무를 입력하세요" />
                                        </div>
                                        <div className={styles.jobInputContainer}>
                                            <input type="text" placeholder="예약 할 급여를 입력하세요" />
                                        </div>

                                        <button>예약 직업 등록하기</button>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
