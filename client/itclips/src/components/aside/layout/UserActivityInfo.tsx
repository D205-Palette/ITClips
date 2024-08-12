// UserActivityInfo.tsx 는 유저의 정보(팔로워, 팔로잉, 리스트 갯수, 북마크 갯수)를 출력하고
// 팔로워, 팔로잉의 숫자를 누르면 팔로우 관리 창으로 이동하는 컴포넌트
import { useParams } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { profileStore } from "../../../stores/profileStore";
import { authStore } from "../../../stores/authStore";

const UserActivityInfo = () => {
  const params = useParams();
  const { urlUserInfo } = profileStore();
  const { userId } = authStore();

  return (
    <div className="w-full grid grid-cols-1 gap-y-1 md:gap-y-4 mt-0 md:mt-2 md:mb-8">
      <div className="grid grid-cols-12">
        <div className="col-start-4 col-span-5 text-start text-gray-500 text-xs md:text-base">
          팔로워
        </div>
        <div className="col-start-9">
          <NavLink
            to={
              params.userId === undefined
                ? `/user/${userId}/follow/follower`
                : `/user/${params.userId}/follow/follower`
            }
          >
            <button
              id="followers"
              className="text-start text-xs md:text-base font-bold hover:bg-sky-200 hover:rounded"
            >
              {urlUserInfo?.followerCount ?? 0}
            </button>
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-start-4 col-span-5 text-start text-gray-500 text-xs md:text-base">
          팔로잉
        </div>
        <div className="col-start-9">
          <NavLink
            to={
              params.userId === undefined
                ? `/user/${userId}/follow/following`
                : `/user/${params.userId}/follow/following`
            }
          >
            <button
              id="following"
              className="text-start text-xs md:text-base font-bold hover:bg-sky-200 hover:rounded"
            >
              {urlUserInfo?.followingCount ?? 0}
            </button>
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="hidden md:block col-start-4 col-span-5 text-start text-gray-500">
          리스트 개수
        </div>
        <div className="hidden md:block col-start-9 text-start font-bold">
          {urlUserInfo?.bookmarkListCount ?? 0}
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="hidden md:block col-start-4 col-span-5 text-start text-gray-500">
          로드맵 개수
        </div>
        <div className="hidden md:block col-start-9 text-start font-bold">
          {urlUserInfo?.roadmapCount ?? 0}
        </div>
      </div>
    </div>
  );
};

export default UserActivityInfo;
