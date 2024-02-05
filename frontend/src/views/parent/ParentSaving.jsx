import styles from './ParentSaving.module.css';

export default function ParentSaving() {
    return (
        <>
            <div className={styles.childSavingStatus}>
                <p>신짱아 어린이의 적금 내역</p>
                <div className={styles.childSavingStatusFrame}>
                    <div className={styles.childSavingStatusFrame_balance}>
                        <p>적금 잔액</p>
                        <p>40600 도토리</p>
                    </div>
                    <div className={styles.childSavingStatusFrame_weeklyPayment}>
                        <p>주 납입 금액(회분)</p> <p>20000 도토리</p>
                    </div>
                    <div className={styles.childSavingStatusFrame_expirationDate}>
                        <p>적금 만기 일</p> <p>2024년 1월 16일</p>
                    </div>
                    <div className={styles.childSavingStatusFrame_paymentTimes}>
                        <p>적금 납부 횟수</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>1주차</th>
                                    <th>2주차</th>
                                    <th>3주차</th>
                                    <th>4주차</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            backgroundColor: 'lightgreen',
                                        }}
                                    >
                                        1
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: 'lightgray',
                                        }}
                                    >
                                        2
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: 'lightgreen',
                                        }}
                                    >
                                        3
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: 'lightgreen',
                                        }}
                                    >
                                        4
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
