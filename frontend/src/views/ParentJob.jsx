import JobProgress from '../components/JobProgress';
import styles from './ParentJob.module.css';
import { Image } from '@chakra-ui/react';

export default function ParentJob() {
    return (
        <div className={styles.divContainer}>
            <div className={styles.childProfile}>
                <p>짱아 어린이의 자산 현황</p>
                <div className={styles.childProfileFrame}>
                    <div>
                        <Image
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            alt="Green double couch with wooden legs"
                            borderRadius="full"
                            boxSize="200px"
                        />
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
                            <li>펫시터</li>
                            <li>똘이 산책 시키기</li>
                            <li>주 5일</li>
                            <li>20000 도토리</li>
                        </ul>
                    </div>
                    <div>
                        <button className={styles.jobDeleteButton}>
                            삭제하기
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <JobProgress jobwidth="748.53" />
            </div>
            <div className={styles.jobReservationStatus}>
                <p>직업 예약 현황</p>
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
                        <button className={styles.jobReservationUpdateButton}>
                            수정하기
                        </button>
                        &nbsp;&nbsp;
                        <button className={styles.jobReservationDeleteButton}>
                            삭제하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
