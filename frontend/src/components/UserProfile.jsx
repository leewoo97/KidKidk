import { useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { RiLockPasswordFill } from 'react-icons/ri';
import ProfileModal from '../../src/components/ProfileModal.jsx';

import styles from './UserProfile.module.css';
import kidImg from '@images/kidImg.jpg';

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
                <div className={styles.userProfileNameContainer}>
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
                >
                    <div className={styles.profileLoginModal}>
                        <p>프로필 로그인</p>
                        <form className={styles.profileLoginForm}>
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

                            <button>로그인</button>
                        </form>
                    </div>
                </ProfileModal>
            ) : null}
            {modalUpdateOpen ? (
                <ProfileModal
                    modalIsOpen={openModalUpdate}
                    closeModal={closeModalUpdate}
                    title="수정 모달"
                    content="이것은 수정 모달입니다."
                >
                    <div className={styles.profileUpdateModal}>
                        <p>프로필 수정</p>
                        <form className={styles.profileUpdateForm}>
                            <div>
                                <ul>
                                    <li>
                                        <div className={styles.profileUpdateFormInputContainer}>
                                            <span style={{ width: '97.99px' }}>닉네임</span>
                                            <input type="text" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.profileUpdateFormInputContainer}>
                                            <span style={{ width: '97.99px' }}>비밀번호</span>
                                            <input type="text" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.profileUpdateFormInputContainer}>
                                            <span>비밀번호 확인</span>
                                            <input type="text" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.profileUpdateFormInputContainer}>
                                            <span>프로필 이미지</span>
                                            <img
                                                src={kidImg}
                                                alt="프로필 이미지"
                                                width="100px"
                                                height="100px"
                                                style={{ objectFit: 'contain', marginTop: '10px' }}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <button>프로필 수정</button> <button>프로필 삭제</button>
                        </form>
                    </div>
                </ProfileModal>
            ) : null}
        </>
    );
}
