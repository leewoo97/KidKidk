import styles from './WelcomePageFirst.module.css';

import kakaoBtn from '@images/kakao_login_medium_wide.png';
import naverBtn from '@images/naver_login.png';

export default function WelcomePageFirst() {
    const redirect_uri = 'http://localhost:5173/profile'; //Redirect URI
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${
        import.meta.env.VITE_REACT_APP_KAKAO_REST_API_KEY
    }&redirect_uri=${redirect_uri}&response_type=code`;

    const kakaoLoginClick = () => {
        window.location.href = kakaoURL;
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
                        아이의 경제개념을 <b>키</b>워 웃음꽃을 <b>얻어</b>{' '}
                        보세요!
                    </p>
                </div>
                <div className={styles.WelcomePageButtonContainer}>
                    <button className={styles.kakaoButton}>
                        <img
                            src={kakaoBtn}
                            alt="카카오 로그인 버튼"
                            onClick={kakaoLoginClick}
                        ></img>
                    </button>
                    <button className={styles.naverButton}>
                        <img src={naverBtn} alt="네이버 로고" height="45px" />
                        <span>네이버 로그인</span>
                    </button>
                </div>
            </div>
        </>
    );
}
