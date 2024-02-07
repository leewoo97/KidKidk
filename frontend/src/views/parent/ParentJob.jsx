import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import {
    getJob,
    getJobReservation,
    deleteJob,
    deleteJobReservation,
    createJob,
    createJobReservation,
} from '@api/job.js';
import { getJobData, getJobReservationData } from '@store/jobAtom.js';

import styles from './ParentJob.module.css';
import kidImg from '@images/kidImg.jpg';

export default function ParentJob() {
    const [selectJob, setSelectedJob] = useState(true);
    const [selectReservationJob, setSelectReservationJob] = useState(true);
    const [jobCreateModalOpen, setJobCreateModalOpen] = useState(false);
    const [reservationJobCreateModalOpen, setReservationJobCreateModalOpen] = useState(false);
    const [jobUpdateModalOpen, setJobUpdateModalOpen] = useState(false);

    const [jobData, setJobData] = useRecoilState(getJobData);
    const [jobReservationData, setJobReservationData] = useRecoilState(getJobReservationData);

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
    console.log('직업 조회 데이터 :', jobData);

    // 예약 직업 조회 API
    const getReservationJobDataAxios = useEffect(() => {
        console.log('Enter getReservationJobDataAxios useEffect');
        getJobReservation(
            // 부모가 탭에서 선택한 아이 아이디 (전역 상태값)
            2,
            (success) => {
                setJobReservationData(success.data.JobReservation);
                console.log(success);
            },
            (fail) => {
                console.log(fail);
            }
        );
        return () => {
            console.log('Return getReservationJobDataAxios useEffect');
        };
    }, []);
    console.log('예약 직업 조회 데이터 :', jobReservationData);

    const handleJobDelete = () => {
        const userConfirmation = confirm('정말로 직업을 삭제하시겠습니까?');
        // 사용자가 확인을 입력한 경우에만 삭제 진행
        if (userConfirmation) {
            deleteJob(
                2,
                (success) => {
                    console.log('직업 삭제 성공', success);
                },
                (fail) => {
                    console.log('직업 삭제 실패', fail);
                }
            );
        } else {
            console.log('직업 삭제 취소');
        }
    };

    const handleReservationJobDelete = () => {
        const userConfirmation = confirm('정말로 예약 직업을 삭제하시겠습니까?');
        // 사용자가 확인을 입력한 경우에만 삭제 진행
        if (userConfirmation) {
            deleteJobReservation(
                2,
                (success) => {
                    console.log('예약 직업 삭제 성공', success);
                },
                (fail) => {
                    console.log('예약 직업 삭제 실패', fail);
                }
            );
        } else {
            console.log('직업 삭제 취소');
        }
    };

    const handleJobCreate = (event) => {
        event.preventDefault();
        console.log(event);
        console.log('Enter handleJobCreate');

        createJob(
            (success) => {
                console.log('직업 등록 성공', success);
            },
            (fail) => {
                console.log('직업 등록 실패', fail);
            }
        );
        setJobCreateModalOpen(false);
    };

    return (
        <div className={styles.parentJobContainer}>
            <div className={styles.parentJobContainerStart}>
                <div className={styles.childProfile}>
                    <p>짱아 어린이의 프로필</p>
                    {jobData !== undefined && jobData ? (
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
                                    <li>{jobData.name}</li>
                                    <li>{jobData.task}</li>
                                    <li>주 {jobData.taskAmount}일</li>
                                    <li>{jobData.wage} 도토리</li>
                                </ul>
                            </div>
                            {/* 예약 직업의 상태가 0이면 "직업 삭제하기" 버튼 사라짐 */}
                            <div>
                                {jobReservationData !== undefined && jobReservationData.state ? (
                                    <button onClick={handleJobDelete} className={styles.jobDeleteButton}>
                                        직업 삭제하기
                                    </button>
                                ) : null}
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
                                    <form onSubmit={handleJobCreate} className={styles.jobForm}>
                                        <div className={styles.jobInputContainer}>
                                            <input type="text" name="name" placeholder="직업을 입력하세요" />
                                        </div>
                                        <div className={styles.jobInputContainer}>
                                            <input type="text" name="task" placeholder="할 업무를 입력하세요" />
                                        </div>
                                        <div className={styles.jobInputContainer}>
                                            <input
                                                type="text"
                                                name="taskAmount"
                                                placeholder="할 일 횟수를 입력하세요"
                                            />
                                        </div>
                                        <div className={styles.jobInputContainer}>
                                            <input type="text" name="wage" placeholder="급여를 입력하세요" />
                                        </div>

                                        <button type="submit">직업 등록하기</button>
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
                            {jobData !== undefined && jobData ? (
                                <>
                                    <li>
                                        <label htmlFor="workProgress">{jobData.task} :</label>
                                    </li>
                                    <li>
                                        <progress
                                            className={styles.progress}
                                            id="workProgress"
                                            max={jobData.taskAmount}
                                            value={jobData.doneCount}
                                        ></progress>
                                    </li>
                                    <li>
                                        {jobData.doneCount}/{jobData.taskAmount}
                                    </li>
                                </>
                            ) : (
                                <p style={{ color: 'red' }}>현재 등록된 직업이 없습니다.</p>
                            )}
                        </ul>
                    </div>
                </div>
                <div className={styles.jobReservationStatus}>
                    <p>직업 예약 현황</p>
                    {jobReservationData !== undefined && selectReservationJob !== undefined && selectReservationJob ? (
                        <div className={styles.jobReservationStatusFrame}>
                            <div>
                                <ul className={styles.jobReservationStatusTitle}>
                                    <li>직업</li>
                                    <li>업무</li>
                                    <li>횟수</li>
                                    <li>급여</li>
                                </ul>
                            </div>
                            <div>
                                <ul className={styles.jobReservationStatusContent}>
                                    <li>{jobReservationData.name} </li>
                                    <li>{jobReservationData.task} </li>
                                    <li>주 {jobReservationData.taskAmount} 일</li>
                                    <li>{jobReservationData.wage} </li>
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
                                <button
                                    onClick={handleReservationJobDelete}
                                    className={styles.jobReservationDeleteButton}
                                >
                                    예약 직업 삭제하기
                                </button>
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
