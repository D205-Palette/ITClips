// AsideProfile.tsx 는 나의 프로필 및 다른 유저의 프로필을 보여주는 컴포넌트
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
// apis
import { checkUserInfo } from "../../api/authApi";
import { getFollowingList, unfollow, follow } from "../../api/followApi";

// components
import ImageContainer from "./layout/ImageContainer";
import UserDetailInfo from "./layout/UserDetailInfo";

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
  const { userId } = authStore();
  const { isProfileChange, setIsProfileChange } = mainStore();
  // url에서 user_id 가져오기
  const params = useParams<{ userId?: string }>();
  const urlUserId = params.userId ? parseInt(params.userId, 10) : undefined;
  const { urlUserInfo, setUrlUserInfo, updateFollowCount } = profileStore();
  const isDark = darkModeStore((state) => state.isDark);
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


  useEffect(() => {
    // url 유저 정보 조회
    const fetchUserInfo = async (userId: number) => {
      try {
        if (urlUserId) {
          const response = await checkUserInfo(userId, urlUserId);
          setUrlUserInfo(response.data);
          setIsProfileChange(false);
        } else {
          const response = await checkUserInfo(userId, userId);
          setUrlUserInfo(response.data);
          setIsProfileChange(false);
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

  return (
    <div
      className={`${
        isDark ? "bg-base-300" : "bg-sky-50"
      } rounded-3xl px-8  py-6 flex flex-col gap-2`}
    >
      {/* 상단 영역: 채팅/설정 버튼 */}
      <div className="self-end  ">
        {myInfo.id !== urlUserId && urlUserId !== undefined ? (
          <button
            className={`text-white btn ${
              isFollow ? "btn-error" : "btn-info"
            } w-full  h-8  min-h-0  text-xs px-2 `}
            onClick={onClickFollow}
          >
            {isFollow ? "언팔로우" : "팔로우"}
          </button>
        ) : (
          <div className="md:hidden">{/* 빈 div로 공간 유지 */}</div>
        )}
      </div>

      {/* 중앙 영역: 이미지와 상세 정보 */}
      <div className="flex flex-row md:flex-col items-center justify-around md:mb-2">
        {/* 프로필 이미지 */}
        <div className="flex md:mb-4">
          <ImageContainer
            src={urlUserInfo?.image ? urlUserInfo.image : "default"}
            whatContent="프로필"
          />
        </div>

        {/* 상세 정보 */}
        <div className="md:w-full pl-4 md:pl-0 w-2/3">
          {myInfo && <UserDetailInfo {...urlUserInfo} />}
          <div className="flex flex-row gap-2 justify-center">
            <div className="flex flex-row  items-center gap-1">
              <div className="text-start text-gray-500 text-xs md:text-base">
                팔로워
              </div>
              <div className=" flex">
                <NavLink
                  to={
                    params.userId === undefined
                      ? `/user/${userId}/follow/follower`
                      : `/user/${params.userId}/follow/follower`
                  }
                >
                  <div className="flex items-center">
                    <button
                      id="followers"
                      className="text-start text-xs md:text-base font-bold hover:bg-sky-200 hover:rounded"
                    >
                      {urlUserInfo?.followerCount ?? 0}
                    </button>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="items-center flex flex-row gap-1 ">
              <div className=" text-start text-gray-500 text-xs md:text-base">
                팔로잉
              </div>
              <div className="">
                <NavLink
                  to={
                    params.userId === undefined
                      ? `/user/${userId}/follow/following`
                      : `/user/${params.userId}/follow/following`
                  }
                  className=""
                >
                  <div className="flex items-center">
                    <button
                      id="following"
                      className="text-start text-xs md:text-base font-bold hover:bg-sky-200 hover:rounded"
                    >
                      {urlUserInfo?.followingCount ?? 0}
                    </button>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>


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
