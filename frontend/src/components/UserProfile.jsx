import { useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import ProfileModal from '../../src/components/ProfileModal.jsx';

import styles from './UserProfile.module.css';

export default function UserProfile({ nickname, profile_image }) {
    const [modalLoginOpen, setModalLoginOpen] = useState(false);
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);

    const openModalLogin = () => setModalLoginOpen(true);
    const closeModalLogin = () => setModalLoginOpen(false);

    const openModalUpdate = () => setModalUpdateOpen(true);
    const closeModalUpdate = () => setModalUpdateOpen(false);
    return (
        <>
            <div className={styles.userProfileContainer}>
                <div className={styles.userProfileImageContainer}>
                    <button onClick={openModalLogin}>
                        <img src={profile_image} alt="프로필 이미지" />
                    </button>
                </div>
                <div>
                    <span>{nickname}</span>
                    &nbsp;
                    <span>
                        <button onClick={openModalUpdate}>
                            <IoMdSettings />
                        </button>
                    </span>
                </div>
            </div>
            {modalLoginOpen ? (
                <ProfileModal
                    modalIsOpen={openModalLogin}
                    closeModal={closeModalLogin}
                    title="로그인 모달"
                    content="이것은 로그인 모달입니다."
                />
            ) : null}
            {modalUpdateOpen ? (
                <ProfileModal
                    modalIsOpen={openModalUpdate}
                    closeModal={closeModalUpdate}
                    title="수정 모달"
                    content="이것은 수정 모달입니다."
                />
            ) : null}
        </>
    );
}
