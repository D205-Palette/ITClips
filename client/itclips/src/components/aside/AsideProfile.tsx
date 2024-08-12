// AsideProfile.tsx 는 나의 프로필 및 다른 유저의 프로필을 보여주는 컴포넌트
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// apis
import { checkUserInfo } from "../../api/authApi";
import { getFollowingList, unfollow, follow } from "../../api/followApi";

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
import { profileStore } from "../../stores/profileStore";
import mainStore from "../../stores/mainStore";

interface UserInfo {
  id?: number;
  email?: string;
  nickname?: string;
  birth?: string;
  job?: string;
  image: string;
  gender?: boolean;
  darkMode?: boolean;
  bio?: string;
  bookmarkListCount?: number;
  roadmapCount?: number;
  followerCount?: number;
  followingCount?: number;
}

const AsideProfile = () => {
  // 내 정보 가져오기
  const myInfo = authStore((state) => state.userInfo);

  const {isProfileChange, setIsProfileChange} = mainStore()
  // url에서 user_id 가져오기
  const params = useParams<{ userId?: string }>();
  const urlUserId = params.userId ? parseInt(params.userId, 10) : undefined;
  const { urlUserInfo, setUrlUserInfo, updateFollowCount } = profileStore();
  const isDark = darkModeStore((state) => state.isDark);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [globalNotification, setGlobalNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);



 // 팔로우 상태인지?
 const [isFollow, setIsFollow] = useState<boolean>(false);

  const updateAsideInfo = (updatedInfo: UserInfo) => {
    setUrlUserInfo(updatedInfo);
  };

  useEffect(() => {
    // url 유저 정보 조회
    const fetchUserInfo = async (userId: number) => {
      try {
        if (urlUserId) {
          const response = await checkUserInfo(userId, urlUserId);
          setUrlUserInfo(response.data);
          setIsProfileChange(false)          
        } else {
          const response = await checkUserInfo(userId, userId);
          setUrlUserInfo(response.data);
          setIsProfileChange(false)          
        }
      } catch (error) {
        console.error("유저 조회 실패", error);
      }
    };

    // 팔로우 상태 확인
    const checkFollowStatus = async () => {
      if (myInfo.id && urlUserId && myInfo.id !== urlUserId) {
        try {
          const response = await getFollowingList(myInfo.id);
          const isFollowing = response.data.some(
            (follow: { toUserId: number }) => follow.toUserId === urlUserId
          );
          setIsFollow(isFollowing);
        } catch (error) {
          console.error("팔로우 상태 조회 실패", error);
        }
      }
    };

    if (urlUserId) {
      fetchUserInfo(urlUserId);
      checkFollowStatus();
    } else if (myInfo.id) {
      fetchUserInfo(myInfo.id);
      checkFollowStatus();
    }
  }, [urlUserId, myInfo.id, isProfileChange]); // urlUserId와 myInfo.id가 변경될 때마다 호출

  const onClickStartChat = (): void => {
    alert("채팅을 시작합니다.");
  };

  // 팔로우 or 언팔로우 버튼을 눌렀을 때 동작
  const onClickFollow = async (): Promise<void> => {
    if (myInfo.id && urlUserId) {
      if (isFollow) {
        try {
          await unfollow(myInfo.id, urlUserId);
          setIsFollow(false);
          updateFollowCount(false);
        } catch (error) {
          console.error("언팔로우 실패", error);
        }
      } else {
        try {
          await follow(myInfo.id, urlUserId);
          setIsFollow(true);
          updateFollowCount(true);
        } catch (error) {
          console.error("팔로우 실패", error);
        }
      }
    }
  };

  // 프로필 설정 모달 상태 관련
  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`${
        isDark ? "bg-base-300" : "bg-sky-50"
      } rounded-3xl p-2 md:p-8 flex flex-col`}
    >
      {/* 상단 영역: 채팅/설정 버튼 */}
      <div className="self-end md:mb-4">
        {myInfo.id !== urlUserId && urlUserId !== undefined ? (
          <button
            className="btn btn-ghost btn-circle"
            onClick={onClickStartChat}
          >
            <IoChatboxEllipsesOutline className="h-6 w-6 md:h-8 md:w-8" />
          </button>
        ) : (
          <button className="btn btn-ghost btn-circle" onClick={openModal}>
            <IoSettingsOutline className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        )}
      </div>

      {/* 중앙 영역: 이미지와 상세 정보 */}
      <div className="flex flex-row md:flex-col items-center justify-around md:mb-2">
        {/* 프로필 이미지 */}
        <div className="flex md:mb-4">
          <ImageContainer 
            src={urlUserInfo?.image ? urlUserInfo.image : 'default'} 
            whatContent="프로필"
          />
        </div>

        {/* 상세 정보 */}
        <div className="md:w-full pl-4 md:pl-0">
          {myInfo && <UserDetailInfo {...urlUserInfo} />}
        </div>
      </div>

      {/* 하단 영역: 팔로우 버튼과 활동 정보 */}
      <div className="flex flex-row md:flex-col justify-around">
        <div className="md:w-full md:flex md:justify-center md:mb-4">
          {myInfo.id !== urlUserId && urlUserId !== undefined ? (
            <button
              className={`text-white btn ${isFollow ? "btn-error" : "btn-info"} w-full md:w-auto h-8 md:h-10 min-h-0 md:min-h-[2.5rem] text-xs md:text-sm px-2 md:px-4`}
              onClick={onClickFollow}
            >
              {isFollow ? "언팔로우" : "팔로우"}
            </button>
          ) : (
            <div className="md:hidden">
              {/* 빈 div로 공간 유지 */}
            </div>
          )}
        </div>
        <div>
          <UserActivityInfo />
        </div>
      </div>

      {/* 프로필 설정 모달 */}
      <ProfileSettingsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        updateAsideInfo={updateAsideInfo}
        setGlobalNotification={setGlobalNotification}
      />

      {/* 토스트 알람 */}
     
    </div>
  );
};

export default AsideProfile;
