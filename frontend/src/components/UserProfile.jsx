//실험
import { profileCreate, profileLogin, profileSelectAll, profileUpdate, profileDelete } from '/src/apis/api/profile.js';
//실험
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { RiLockPasswordFill } from 'react-icons/ri';
import ProfileModal from '../../src/components/ProfileModal.jsx';

import styles from './UserProfile.module.css';
import kidImg from '@images/kidImg.jpg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { profileInfoState } from '../store/profileInfoAtom';
import { getChild } from '../apis/api/profile.js';

export default function UserProfile({ profileId, nickname, profile_image, userType }) {
    const navigate = useNavigate();
    //onChange
    //업데이트 API에 쓰이는 onChange
    const onChangeUpdateNickname = (e) => {
        setUpdateUser({
            ...updateUser,
            nickname: e.target.value,
        });
        console.log('타켓 벨류 : ' + e.target.value);
        console.log('바뀐 닉네임 : ' + updateUser.nickname);
    };
    const onChangeUpdatePin = (e) => {
        setUpdateUser({
            ...updateUser,
            pin: e.target.value,
        });
        // console.log('타켓 벨류 : ' + e.target.value)
        // console.log('바뀐 핀 : ' + updateUser.pin)
    };
    //업데이트 API에 쓰이는 onChange
    //onChange

    //실험
    // console.log(profileId);
    // console.log(nickname);
    // console.log(profile_image);
    //실험
    const [modalLoginOpen, setModalLoginOpen] = useState(false);
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);

    const openModalLogin = () => setModalLoginOpen(true);
    const closeModalLogin = () => setModalLoginOpen(false);

    const openModalUpdate = () => setModalUpdateOpen(true);
    const closeModalUpdate = () => setModalUpdateOpen(false);

    //삭제 실험
    //버튼누르면 프로필 삭제
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleClick = (e) => {
        // e.preventDefault();
        setIsButtonClicked(true);
    };
    //버튼누르면 프로필 삭제

    const [deleteData, setDeleteData] = useState([{}]);

    const [profile, serProfile] = useState({
        profileId: profileId, //오른쪽은 유저 각각의 프로필 아이디
        nickname: 'string',
        profileImage: profile_image,
        type: true,
        userId: 1,
    });

    useEffect(() => {
        if (isButtonClicked) {
            //   console.log('Profile Delete Enter');
            profileDelete(
                profile,
                (deleteData) => {
                    setDeleteData(deleteData.data);
                    //   console.log(deleteData.data);
                },
                (fail) => {
                    console.log(fail);
                }
            );
        }
        return () => {
            <div>{/* console.log('Profile Delete return'); */}</div>;
        };
    }, [isButtonClicked]);
    //삭제 실험

    // 수정 실험 2024/02/07
    const [updateButtonClicked, setUpdateButtonClicked] = useState(false);

    const updateClick = (e) => {
        // e.preventDefault();
        setUpdateButtonClicked(true);
    };
    const [updateData, setUpdateData] = useState([{}]);

    const [updateUser, setUpdateUser] = useState({
        profileId: profileId, //오른쪽은 유저 각각의 프로필 아이디
        nickname: '',
        pin: 0,
        profileImage: profile_image,
    });

    //  console.log(updateUser.profileId);
    //  console.log(updateUser.nickname);
    useEffect(() => {
        if (updateButtonClicked) {
            // console.log('Profile Update Enter');
            // console.log(updateUser.profileId);
            profileUpdate(
                updateUser,
                (updateData) => {
                    // console.log(updateData.data);
                    setUpdateData(updateData.data);
                    //    console.log(updateUser.profileId);
                },
                (fail) => {
                    console.log(fail);
                }
            );
            //    console.log('Profile Update mid');
        }
        return () => {
            //  console.log('Profile Update return');
        };
    }, [updateButtonClicked]);

    //수정 실험 2024/02/07

    // 로그인처리
    const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState);

    const [loginUser, setLoginUser] = useState({
        profileId: profileId, //오른쪽은 유저 각각의 프로필 아이디
        nickname: nickname,
        pin: '',
        type: userType,
        profileImage: profile_image,
    });

    const onChangeLoginPin = (e) => {
        setLoginUser({
            ...loginUser,
            pin: e.target.value,
        });
        // console.log('타켓 벨류 : ' + e.target.value);
        // console.log('바뀐 핀 : ' + loginUser.pin);
    };

    const loginClick = (e) => {
        e.preventDefault();
        profileLogin(
            loginUser,
            async (Data) => {
                console.log('로그인 성공', Data.data);
                await setProfileInfo(Data.data);
                if (Data.data.type) {
                    navigate('/parent');
                } else {
                    getChild(
                        loginUser,
                        (val) => {
                            setProfileInfo((prevProfileInfo) => ({ ...prevProfileInfo, ...val.data }));
                            navigate('/child');
                        },
                        (fail) => {
                            console.log(fail);
                        }
                    );
                }
            },
            (fail) => {
                console.log(fail);
            }
        );
    };

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
                    modalIsOpen={!!openModalLogin}
                    closeModal={closeModalLogin}
                    title="로그인 모달"
                    content="이것은 로그인 모달입니다."
                >
                    <div className={styles.profileLoginModal}>
                        <p>프로필 로그인</p>
                        <form onSubmit={loginClick} className={styles.profileLoginForm}>
                            <div className={styles.profileInputContainer}>
                                <input type="password" onChange={onChangeLoginPin} />

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
                    modalIsOpen={!!openModalUpdate}
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
                                            <input type="text" onChange={onChangeUpdateNickname} />
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.profileUpdateFormInputContainer}>
                                            <span style={{ width: '97.99px' }}>비밀번호</span>
                                            <input type="text" onChange={onChangeUpdatePin} />
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.profileUpdateFormInputContainer}>
                                            <span>비밀번호 확인</span>
                                            <input type="text" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.profileUpdateFormButtonContainer}>
                                <button /*onClick={updateClick}은 실험*/ onClick={updateClick}>프로필 수정</button>
                                &nbsp;&nbsp;
                                <button /*onClick={handleClick}은 실험*/ onClick={handleClick}>프로필 삭제</button>
                            </div>
                        </form>
                    </div>
                </ProfileModal>
            ) : null}
        </>
    );
}
