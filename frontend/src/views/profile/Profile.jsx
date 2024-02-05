import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { RiLockPasswordFill } from 'react-icons/ri';
import { RiParentLine } from 'react-icons/ri';
import { FaRegImage } from 'react-icons/fa6';

import UserProfile from '../../components/UserProfile';
import ProfileModal from '../../components/ProfileModal';

import styles from './Profile.module.css';

import parentImg from '@images/parentImg.jpg';
import kidImg from '@images/kidImg.jpg';
import profilePlus from '@images/profilePlus.png';

export default function Profile() {
    // 가상의 프로필 데이터 배열
    const profiles = [
        { nickname: '봉미선', profile_image: parentImg },
        { nickname: '김철수', profile_image: kidImg },
        // 추가적인 프로필 데이터...
    ];
    const [modalCreateOpen, setModalCreateOpen] = useState(false);

    const openModalCreate = () => setModalCreateOpen(true);
    const closeModalCreate = () => setModalCreateOpen(false);

    return (
        <>
            <div className={styles.profileContainer}>
                <div className={styles.profileBox}>
                    {profiles.map((profile) => (
                        <UserProfile
                            key={profile.nickname}
                            nickname={profile.nickname}
                            profile_image={profile.profile_image}
                        />
                    ))}
                    <div>
                        <div className={styles.addProfileImageContainer}>
                            <button onClick={openModalCreate}>
                                <img src={profilePlus} alt="프로필 이미지" />
                            </button>
                            <span>Add Profile</span>
                        </div>
                    </div>
                </div>

                <p className={styles.profileptag}>프로필을 선택해주세요</p>
                {modalCreateOpen ? (
                    <ProfileModal
                        modalIsOpen={!!openModalCreate}
                        closeModal={closeModalCreate}
                        title="프로필 생성 모달"
                        content="이것은 프로필 생성 모달입니다."
                    >
                        <div className={styles.profileCreateModal}>
                            <p>프로필 등록</p>
                            <form className={styles.profileCreateForm}>
                                <div className={styles.profileInputContainer}>
                                    <input type="text" placeholder="아이디" />

                                    <div className={styles.iconContainer}>
                                        <CgProfile />
                                    </div>
                                </div>

                                <div className={styles.profileInputContainer}>
                                    <input type="text" placeholder="비밀번호" />

                                    <div className={styles.iconContainer}>
                                        <RiLockPasswordFill />
                                    </div>
                                </div>

                                <div className={styles.profileInputContainer}>
                                    <input type="text" placeholder="회원유형" />

                                    <div className={styles.iconContainer}>
                                        <RiParentLine />
                                    </div>
                                </div>

                                <div className={styles.profileInputContainer}>
                                    <label htmlFor={styles.fileButton}>
                                        <div className={styles.profileDiv}>프로필 이미지</div>
                                    </label>
                                    <input type="file" id={styles.fileButton} />
                                    <div className={styles.iconContainer}>
                                        <FaRegImage />
                                    </div>
                                </div>

                                <button>프로필 등록</button>
                            </form>
                        </div>
                    </ProfileModal>
                ) : null}
            </div>
        </>
    );
}
