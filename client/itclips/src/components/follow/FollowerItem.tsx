import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import noImg from "../../assets/images/noImg.gif"

// apis
import { removeFollower } from "../../api/followApi";

// components
import FollowerItemKebabDropdown from "./ui/FollowerItemKebabDropdown";

// stores
import { useFollowStore } from "../../stores/followStore";
import { authStore } from "../../stores/authStore";

interface Follower {
  id: number;
  fromUserId: number;
  toUserId: number;
  nickname: string;
  profileImage: string;
  email: string;
}

interface Props {
  items: Follower[];
}

const FollowerItem: React.FC<Props> = ({ items }) => {

  const userId = authStore(state => state.userId);
  const params = useParams<{ userId?: string }>();
  const urlUserId = params.userId ? parseInt(params.userId, 10) : undefined;
  const [followers, setFollowers] = useState<Follower[]>(items);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { decrementFollowerCount } = useFollowStore();

  useEffect(() => {
    setFollowers(items);
  }, [items]);

  // 더보기 버튼 기능이 NavLink와 안겹치게 설정
  const handleNavLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 팔로워 삭제 함수
  const rmFollower = async (fromUserId: number, toUserId: number) => {
    try {
      await removeFollower(fromUserId, toUserId);
      setFollowers((prevFollowers) =>
        prevFollowers.filter((follower) => follower.fromUserId !== fromUserId)
      );
      decrementFollowerCount();
      setNotification({ message: "팔로워가 삭제되었습니다.", type: "success" });
    } catch (error) {
      console.error("팔로워 삭제 실패:", error);
      setNotification({
        message: "팔로워 삭제에 실패했습니다.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="space-y-2 md:space-y-4 relative">
      {followers.map((item) => (
        <div key={item.id}>
          <NavLink
            to={`/user/${item.fromUserId}`}
            className="flex items-center space-x-2 md:space-x-4 p-2 md:p-4 rounded-lg shadow"
          >
            <img
              src={item.profileImage === "default" ? noImg : item.profileImage}
              alt={item.nickname}
              className="w-14 h-14 md:w-20 md:h-20 object-cover rounded"
            />
            <div className="flex-grow">
              <h3 className="text-sm md:text-lg font-semibold">{item.nickname}</h3>
              <div className="flex space-x-2 md:space-x-4 mt-1 md:mt-2">
                <p className="text-xs md:text-sm text-gray-400">{item.email}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-gray-500 hidden sm:block">#관심사1 #관심사2 #관심사3</p>

            {userId === urlUserId ? (
              <div onClick={handleNavLink}>
                <FollowerItemKebabDropdown
                  targetId={item.fromUserId}
                  onDeleteFollower={() =>
                    rmFollower(item.fromUserId, item.toUserId)
                  }
                />
              </div>
            ) : (
              <div className="w-4 md:w-8" />
            )}
          </NavLink>
        </div>
      ))}

      {notification && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-3 md:p-4 rounded-md ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white shadow-lg z-50 transition-opacity duration-300 text-xs md:text-base`}
          style={{
            opacity: notification ? 1 : 0,
            visibility: notification ? "visible" : "hidden",
          }}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default FollowerItem;
