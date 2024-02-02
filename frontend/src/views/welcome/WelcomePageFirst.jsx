import styles from './WelcomePageFirst.module.css';

import kakaoBtn from '@images/kakao_login.png';
import naverBtn from '@images/naver_login.png';

import { backendURL } from '@configs/config';

export default function WelcomePageFirst() {
    const redirect_uri = 'http://localhost:5173/profile'; //Redirect URI
    const kakaoURL = `${backendURL}/oauth2/authorization/kakao?redirect_uri=${redirect_uri}&mode=login`;
    const naverURL = `${backendURL}/oauth2/authorization/naver?redirect_uri=${redirect_uri}&mode=login`;

    const kakaoLoginClick = () => {
        window.location.href = kakaoURL;
    };

    const naverLoginClick = () => {
        window.location.href = naverURL;
    };

    return (
        <>
            <div className={styles.WelcomePageFirstContainer}>
                <h1 className={styles.headLogo}>
                    <b>키득키득</b>에 오신 것을 환영합니다
                </h1>

                <div className={styles.headContents}>
                    <p>
                        <b>키득!</b>
                    </p>
                    <p>
                        아이의 자산을 <b>키</b>워 이<b>득</b>을 보세요!
                    </p>
                    <p>
                        <b>키득!</b>
                    </p>
                    <p>
                        아이의 경제개념을 <b>키</b>워 웃음꽃을 <b>얻어</b> 보세요!
                    </p>
                </div>
                <div className={styles.WelcomePageButtonContainer}>
                    <button className={styles.kakaoButton}>
                        <img src={kakaoBtn} alt="카카오 로그인 버튼" onClick={kakaoLoginClick}></img>
                    </button>
                    <button className={styles.naverButton}>
                        <img src={naverBtn} alt="네이버 로그인 버튼" onClick={naverLoginClick} height="45px" />
                    </button>
                </div>
            </div>
        </>
    );
}
