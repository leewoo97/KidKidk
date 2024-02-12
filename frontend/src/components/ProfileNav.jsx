import styles from './ProfileNav.module.css';
import parentImg from '@images/parentImg.jpg';

export default function ProfileNav({ profileName }) {
    return (
        <>
            <div className={styles.profileNavContainer}>
                <div className={styles.profileNavContainerStart}>
                    <div className={styles.profileImageContainer}>
                        <img src={parentImg} alt="부모 프로필" />
                    </div>
                    <span>{profileName}</span>
                </div>
            </div>
        </>
    );
}
