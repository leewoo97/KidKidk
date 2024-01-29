import { useState } from 'react';
import { Progress } from '@chakra-ui/react';

import styles from './JobProgress.module.css';

export default function JobProgress(props) {
    const hasJob = true;
    return (
        <>
            {!hasJob ? (
                <div
                    className={styles.noJobProgress}
                    style={{ width: props.jobwidth + 'px' }}
                >
                    <p>직업을 생성해주세요.</p>
                </div>
            ) : (
                <div
                    className={styles.jobProgress}
                    style={{ width: props.jobwidth + 'px' }}
                >
                    <p>업무 진척도</p>
                    <ul>
                        <li>똘이 산책시키기</li>
                        <li>
                            <Progress
                                hasStripe
                                colorScheme="green"
                                width="200px"
                                height="32px"
                                value={60}
                            />
                        </li>
                        <li>3/5</li>
                        <li>
                            <button className={styles.jobProgressButton}>
                                완료
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}
