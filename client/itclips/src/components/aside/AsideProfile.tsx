// AsideProfile.tsx 는 나의 프로필 및 다른 유저의 프로필을 보여주는 컴포넌트
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// apis
import { checkUserInfo } from "../../api/authApi";
import { getFollowCounts } from "../../api/followApi";

// icons
import { IoChatboxEllipsesOutline, IoSettingsOutline } from "react-icons/io5";

// components
import ImageContainer from "./layout/ImageContainer";
import UserDetailInfo from "./layout/UserDetailInfo";
import UserActivityInfo from "./layout/UserActivityInfo";
import ProfileSettingsModal from "./modals/ProfileSettingsModal";

// stores
import darkModeStore from "../../stores/darkModeStore";
import { authStore } from "../../stores/authStore";
import { useFollowStore } from "../../stores/followStore";

interface User {
  id?: number;
  nickname?: string;
  job?: string;
  bio?: string;
  gender?: boolean;
  email?: string;
  darkMode?: boolean;
  birth?: string;
}

interface FollowCounts {
  followerCount?: number;
  followingCount?: number;
}

const AsideProfile = () => {

  // 내 정보 가져오기
  const myInfo = authStore(state => state.userInfo);

  // url에서 user_id 가져오기
  const params = useParams<{ user_id?: string }>();
  const urlUserId = params.user_id ? parseInt(params.user_id, 10) : undefined;
  
  const [ urlUserInfo, setUrlUserInfo ] = useState<User>();
  const [ followCounts, setFollowCounts ] = useState<FollowCounts>();
  const { followerCount, followingCount, setFollowerCount, setFollowingCount } = useFollowStore();

  // url 유저 정보 조회
  const fetchUserInfo = async () => {
    if (urlUserId) {
      try {
        const response = await checkUserInfo(urlUserId);
        setUrlUserInfo(response.data);
        console.log(response);
      } catch (error) {
        console.error("유저 조회 실패", error);
      }
    }
  };
  
  useEffect(() => {
    fetchUserInfo();
  }, [urlUserId]);

  // url 유저 팔로우 수 조회
  const fetchFollowCount = async () => {
    if (urlUserId) {
      try {
        const response = await getFollowCounts(urlUserId);
        setFollowerCount(response.data.followerCount);
        setFollowingCount(response.data.followingCount);
      } catch (error) {
        console.error("유저 조회 실패", error);
      }
    }
  };
  
  useEffect(() => {
    fetchFollowCount();
  }, [urlUserId]);

  const isDark = darkModeStore(state => state.isDark);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // (임시) 팔로우 상태인지? - 팔로우 버튼 테스트
  const [isFollow, setIsFollow] = useState<boolean>(false);

  const onClickStartChat = (): void => {
    // 다른 유저 프로필의 채팅하기 버튼을 눌렀을 때
    // 기존에 채팅창이 있는지 확인하고 있으면 바로 해당 채팅창으로, 없으면 새 채팅창으로
    alert("채팅을 시작합니다.");
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
    <div className={`${ isDark ? "bg-base-300" : "bg-sky-100" } rounded-3xl w-80 p-8 flex flex-col items-center`}>
      {/* 다른 유저일때 채팅하기 버튼 또는 환경설정 활성화 */}
      {myInfo.id !== urlUserId ? (
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
      {myInfo && <UserDetailInfo {...urlUserInfo} />}
      {/* 자기인지 아닌지에 따라 활성화되는 팔로우 버튼 */}
      {myInfo.id !== urlUserId ? (
        <button
          className={`text-white btn ${isFollow ? 'btn-error' : 'btn-info'}`}
          onClick={onClickFollow}
        >
          {isFollow ? '언팔로우' : '팔로우'}
        </button>
      ) : (
        <div className="m-6"></div>
      )}
      {/* 팔로워, 팔로잉, 리스트, 북마크 수 출력 컨테이너 */}
      <UserActivityInfo followerCount={followerCount} followingCount={followingCount} />
      {/* 프로필 설정 모달 */}
      <ProfileSettingsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AsideProfile;