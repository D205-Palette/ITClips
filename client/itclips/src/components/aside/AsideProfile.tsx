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

  // 토스트 알람 메뉴
  useEffect(() => {
    if (globalNotification) {
      const timer = setTimeout(() => {
        setGlobalNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [globalNotification]);

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
          console.log(response);
        } else {
          const response = await checkUserInfo(userId, userId);
          setUrlUserInfo(response.data);
          setIsProfileChange(false)
          console.log(response);
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
        isDark ? "bg-base-300" : "bg-sky-100"
      } rounded-3xl w-80 p-8 flex flex-col items-center`}
    >
      {/* 피드 페이지에서 urlUserId가 undefined이므로 예외처리 */}
      {/* 다른 유저일때 채팅하기 버튼 또는 환경설정 활성화 */}
      {myInfo.id !== urlUserId && urlUserId !== undefined ? (
        <button
          className="btn btn-ghost btn-circle ms-16"
          onClick={onClickStartChat}
        >
          <IoChatboxEllipsesOutline className="h-8 w-8" />
        </button>
      ) : (
        <button className="btn btn-ghost btn-circle ms-16" onClick={openModal}>
          <IoSettingsOutline className="h-6 w-6" />
        </button>
      )}
      {/* 프로필 이미지 컨테이너 */}
      <ImageContainer src={urlUserInfo?.image ? urlUserInfo.image : 'default'} whatContent="프로필"/>

      {/* 닉네임, 이메일, 소개글 정보 컨테이너 */}
      {myInfo && <UserDetailInfo {...urlUserInfo} />}
      {/* 자기인지 아닌지에 따라 활성화되는 팔로우 버튼 */}
      {myInfo.id !== urlUserId && urlUserId !== undefined ? (
        <button
          className={`text-white btn ${isFollow ? "btn-error" : "btn-info"}`}
          onClick={onClickFollow}
        >
          {isFollow ? "언팔로우" : "팔로우"}
        </button>
      ) : (
        <div className="m-6"></div>
      )}
      {/* 팔로워, 팔로잉, 리스트, 북마크 수 출력 컨테이너 */}
      <UserActivityInfo />
      {/* 프로필 설정 모달 */}
      <ProfileSettingsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        updateAsideInfo={updateAsideInfo}
        setGlobalNotification={setGlobalNotification}
      />
      {/* 토스트 알람 */}
      {globalNotification && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md ${
            globalNotification.type === "success"
              ? "bg-green-500"
              : "bg-red-500"
          } text-white shadow-lg z-50 transition-opacity duration-300`}
        >
          {globalNotification.message}
        </div>
      )}
    </div>
  );
};

export default AsideProfile;
