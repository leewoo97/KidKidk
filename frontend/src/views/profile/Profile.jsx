import { useState } from "react";

import UserProfile from "../../components/userProfile";
import ProfileModal from "../../components/ProfileModal";

import styles from "./Profile.module.css";

import parentImg from "@images/parentImg.jpg";
import kidImg from "@images/kidImg.jpg";
import profilePlus from "@images/profilePlus.png";

export default function Profile() {
  // 가상의 프로필 데이터 배열
  const profiles = [
    { nickname: "봉미선", profile_image: parentImg },
    { nickname: "김철수", profile_image: kidImg },
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
            modalIsOpen={openModalCreate}
            closeModal={closeModalCreate}
            title="프로필 생성 모달"
            content="이것은 프로필 생성 모달입니다."
          >
            <p>프로필 등록</p>
            <form>
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <button>프로필 등록하기</button>
            </form>
          </ProfileModal>
        ) : null}
      </div>
    </>
  );
}
