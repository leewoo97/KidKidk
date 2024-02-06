import React, { useState, useRef } from 'react';
import styles from './ParentMain.module.css';
import successStamp from '../../assets/images/successStamp.PNG';

export default function ParentMain() {
    return (
        <>
            <div className={styles.parentMainContainer}>
                <div className={styles.parentMainContainerStart}>
                    <div className={styles.childAssetProgress}>
                        <p>짱아 어린이의 자산 현황</p>
                        <div className={styles.circularProgressContainer}>
                            <div className={styles.circularProgressBox}>
                                <div
                                    className={styles.circularProgress}
                                    style={{
                                        background: `conic-gradient(
                                            #5FB776 ${180}deg,
                                            #D4CFC8 ${0}deg
                                        )`,
                                    }}
                                >
                                    <span>
                                        주머니
                                        <br />
                                        50%
                                    </span>
                                </div>
                            </div>
                            <div className={styles.circularProgressBox}>
                                <div
                                    className={styles.circularProgress}
                                    style={{
                                        background: `conic-gradient(
                                        #F1554C ${180}deg,
                                        #D4CFC8 ${0}deg
                                    )`,
                                    }}
                                >
                                    <span>
                                        투자
                                        <br />
                                        30%
                                    </span>
                                </div>
                            </div>
                            <div className={styles.circularProgressBox}>
                                <div
                                    className={styles.circularProgress}
                                    style={{
                                        background: `conic-gradient(
                                        #FFD000 ${180}deg,
                                        #D4CFC8 ${0}deg
                                    )`,
                                    }}
                                >
                                    <span>
                                        적금
                                        <br />
                                        20%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.childInvestProgress}>
                        <p>짱아 어린이의 투자 현황</p>
                        <div className={styles.childInvestProgressFrame}>
                            <div className={styles.childInvestProgressInfo}>
                                <ul>
                                    <li>
                                        <p>투자 항목 : 이번 주 엄마의 몸무게는 증가할 것이다</p>
                                    </li>
                                    <li>
                                        <button className={styles.investQuitButton}>투자 종료하기</button>
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.childInvestProgressWeekTable}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>월</th>
                                            <th>화</th>
                                            <th>수</th>
                                            <th>목</th>
                                            <th>금</th>
                                            <th>토</th>
                                            <th>일</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img src={successStamp} alt="successStamp" width={100} />
                                            </td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>6</td>
                                            <td>7</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
