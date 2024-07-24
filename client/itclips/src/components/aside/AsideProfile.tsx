// AsideProfile.tsx 는 나의 프로필 및 다른 유저의 프로필을 보여주는 컴포넌트

import React, { useState } from "react";

// icons
import { IoChatboxEllipsesOutline, IoSettingsOutline } from "react-icons/io5";

// components
import ImageContainer from "./layout/ImageContainer";
import DetailInfo from "./layout/DetailInfo";
import UserActivityInfo from "./layout/UserActivityInfo";
import ProfileSettingsModal from "./modals/ProfileSettingsModal";

const AsideProfile: React.FC = () => {
  // (임시) 팔로우 상태인지? - 팔로우 버튼 테스트
  const [isFollow, setIsFollow] = useState<boolean>(false);
  // (임시) 다른 유저의 정보인지? - 프로필 화면 테스트
  const [isOther, setIsOther] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onClickStartChat = (): void => {
    // 다른 유저 프로필의 채팅하기 버튼을 눌렀을 때
    // 기존에 채팅창이 있는지 확인하고 있으면 바로 해당 채팅창으로, 없으면 새 채팅창으로
  };

  // 팔로우 or 언팔로우 버튼을 눌렀을 때 동작
  const onClickFollow = (): void => {
    setIsFollow(!isFollow);
  };

  // 프로필 설정 모달 상태 관련
  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-aside-layout rounded-3xl w-80 p-8 flex flex-col items-center">
      {/* 다른 유저일때 채팅하기 버튼 또는 환경설정 활성화 */}
      {isOther ? (
        <button className="btn btn-ghost btn-circle ms-16" onClick={onClickStartChat}>
          <IoChatboxEllipsesOutline className="h-8 w-8" />
        </button>
      ) : (
        <button className="btn btn-ghost btn-circle ms-16" onClick={openModal}>
          <IoSettingsOutline className="h-6 w-6" />
        </button>
      )}
      {/* 프로필 이미지 컨테이너 */}
      <ImageContainer />
      {/* 닉네임, 이메일, 소개글 정보 컨테이너 */}
      <DetailInfo />
      {/* 자기인지 아닌지에 따라 활성화되는 팔로우 버튼 */}
      {isOther && (
        <button
          className={`text-white btn ${isFollow ? 'btn-error' : 'btn-info'}`}
          onClick={onClickFollow}
        >
          {isFollow ? '언팔로우' : '팔로우'}
        </button>
      )}
      {/* 팔로워, 팔로잉, 리스트, 북마크 수 출력 컨테이너 */}
      <UserActivityInfo />
      {/* 프로필 설정 모달 */}
      <ProfileSettingsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AsideProfile;