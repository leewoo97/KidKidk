import { profileCreate, profileLogin, profileSelectAll, profileUpdate, profileDelete } from '/src/apis/api/profile.js';
import React, { useState, useEffect } from 'react';
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

import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../store/userInfoAtom';

export default function Profile() {
    /**
     * 리코일userinfo 상태 불러오기
     */
    const userInfo = useRecoilValue(userInfoState);
    console.log('userinfo : ', userInfo);

    //onChange
    const onChangeCreateNickname = (e) => {
        setCreateUser({
            ...createUser,
            nickname: e.target.value,
        });
        // console.log('타켓 벨류 : ' + e.target.value);
        // console.log('바뀐 닉네임 : ' + createUser.nickname);
    };
    const onChangeCreatePin = (e) => {
        setCreateUser({
            ...createUser,
            pin: e.target.value,
        });
        // console.log('타켓 벨류 : ' + e.target.value);
        // console.log('바뀐 핀 : ' + createUser.pin);
    };

    const onChangeCreateType = (e) => {
        if (e.target.value == '부모') {
            setCreateUser({
                ...createUser,
                type: true,
            });
        } else if (e.target.value == '자식') {
            setCreateUser({
                ...createUser,
                type: false,
            });
        }
        // console.log('타켓 벨류 : ' + e.target.value);
        // console.log('바뀐 타입 : ' + createUser.type);
    };
    //onChange

    //버튼누르면 프로필 생성
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleClick = () => {
        setIsButtonClicked(true);
    };

    //profileCreate API데이터 받아오기
    const [createData, setCreateData] = useState([{}]);

    const [createUser, setCreateUser] = useState({
        nickname: '',
        pin: 0,
        profileImage: '',
        type: true,
        userId: userInfo.userId,
    });

    useEffect(() => {
        if (isButtonClicked) {
            // console.log('Profile Create Enter');
            // console.log('createUser 닉네임은 :' + createUser.nickname);
            if (createUser.type) {
                createUser.profileImage = '/src/assets/images/parentImg.jpg';
            } else {
                createUser.profileImage = '/src/assets/images/kidImg.jpg';
            }
            profileCreate(
                createUser,
                (createData) => {
                    setCreateData(createData.data);
                    // console.log(createData.data);
                },
                (fail) => {
                    // console.log(fail);
                }
            );
        }
        return () => {
            // console.log('Profile Create return');
        };
    }, [isButtonClicked]);

    //profileSelectAll API데이터 받아오기
    const [SelectAllData, setSelectAllData] = useState([{}]);

    const [user, setUser] = useState({
        profileId: 0,
        nickname: 'string',
        profileImage: 'string',
        type: true,
        userId: 1,
    });

    useEffect(() => {
        // console.log('Profile SelectAll Enter');
        profileSelectAll(
            userInfo.userId,
            (SelectAllData) => {
                setSelectAllData(SelectAllData.data);
                // console.log(SelectAllData.data);
            },
            (fail) => {
                // console.log(fail);
            }
        );
        return () => {
            // <div>console.log('Profile SelectAll return');</div>;
        };
    }, []);

    // profileUpdate API 데이터 받아오기 실험중 2024/02/07
    // const [updateData, setUpdateData] = useState([{}]);

    // const [updateUser, setUpdateUser] = useState({
    //   profileId: 0,
    //   nickname: "string",
    //   pin: 0,
    //   profileImage: "string"
    // });

    //   useEffect(() => {
    //   console.log('Profile Update Enter');
    //   profileUpdate(updateUser,
    //     (updateData) => {
    //       setUpdateData(updateData.data);
    //       console.log(updateData.data);
    //     },
    //     (fail) => {
    //       console.log(fail);
    //     }
    //   );
    //   return () => {
    //     <div>
    //     console.log('Profile Update return');
    //     </div>
    //   };
    // }, []);

    //실험 2024/02/07

    // profileDelete API데이터 받아오기(쓰지않는 코드)
    // const [deleteData, setDeleteData] = useState([{}]);

    // const [profile, serProfile] = useState({
    //     profileId: 1,
    //     nickname: "string",
    //     profileImage: "string",
    //     type: true,
    //     userId: 1
    //   });
    //   useEffect(() => {
    //   console.log('Profile Delete Enter');
    //   profileDelete(profile,
    //     (deleteData) => {
    //       setDeleteData(deleteData.data);
    //       console.log(deleteData.data);
    //     },
    //     (fail) => {
    //       console.log(fail);
    //     }
    //   );
    //   return () => {
    //     <div>
    //     console.log('Profile Delete return');
    //     </div>
    //   };
    // }, []);

    // 가상의 프로필 데이터 배열
    // const profiles = [
    //     { nickname: '봉미선', profile_image: parentImg },
    //     { nickname: '김철수', profile_image: kidImg },
    //     // 추가적인 프로필 데이터...
    // ];

    const [modalCreateOpen, setModalCreateOpen] = useState(false);

    const openModalCreate = () => setModalCreateOpen(true);
    const closeModalCreate = () => setModalCreateOpen(false);

    return (
        <>
            {SelectAllData.map}
            <div className={styles.profileContainer}>
                <div className={styles.profileBox}>
                    {SelectAllData.map((profile) => (
                        <UserProfile
                            key={profile.profileId}
                            //실험
                            profileId={profile.profileId}
                            //실험
                            nickname={profile.nickname}
                            profile_image={profile.profileImage}
                            userType={profile.type}
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
                                    <input type="text" onChange={onChangeCreateNickname} placeholder="닉네임" />

                                    <div className={styles.iconContainer}>
                                        <CgProfile />
                                    </div>
                                </div>

                                <div className={styles.profileInputContainer}>
                                    <input type="text" onChange={onChangeCreatePin} placeholder="비밀번호" />

                                    <div className={styles.iconContainer}>
                                        <RiLockPasswordFill />
                                    </div>
                                </div>

                                <div className={styles.profileInputRadioContainer}>
                                    <label htmlFor="true">
                                        부모&nbsp;
                                        <input type="radio" name="answer" value="부모" onChange={onChangeCreateType} />
                                    </label>
                                    &nbsp;&nbsp;
                                    <label htmlFor="false">
                                        자식&nbsp;
                                        <input type="radio" name="answer" value="자식" onChange={onChangeCreateType} />
                                    </label>
                                    <div className={styles.iconContainerFamily}>
                                        <RiParentLine />
                                    </div>
                                </div>

                                {/* <div className={styles.profileInputContainer}>
                                    <label htmlFor={styles.fileButton}>
                                        <div className={styles.profileDiv}>프로필 이미지</div>
                                    </label>
                                    <input type="file" id={styles.fileButton} />
                                    <div className={styles.iconContainer}>
                                        <FaRegImage />
                                    </div>
                                </div> */}

                                <button onClick={handleClick}>프로필 등록</button>
                            </form>
                        </div>
                    </ProfileModal>
                ) : null}
            </div>
        </>
    );
}
