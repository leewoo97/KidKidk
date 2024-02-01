import styles from './ProfileNav.module.css';
import parentImg from '@images/parentImg.jpg';

export default function ProfileNav() {
    return (
        <>
            <div className={styles.profileNavContainer}>
                <div className={styles.profileNavContainerStart}>
                    <div className={styles.profileImageContainer}>
                        <img src={parentImg} alt="부모 프로필" />
                    </div>
                    <span>봉미선</span>
                </div>
            </div>
        </>
    );
}
