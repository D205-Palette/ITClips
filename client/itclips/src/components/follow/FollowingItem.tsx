import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// image (임시)
import image from "../../assets/images/profile_image.png";

// apis
import { unfollow } from "../../api/followApi";

// components
import FollowingItemKebabDropdown from "./ui/FollowingItemKebabDropdown";

// stores
import { useFollowStore } from "../../stores/followStore";

interface Following {
  id: number;
  fromUserId: number;
  toUserId: number;
  nickname: string;
  profileImage: string;
  email: string;
}

interface Props {
  items: Following[];
}

const FollowingItem: React.FC<Props> = ({ items }) => {

  const [ followings, setFollowings ] = useState<Following[]>(items);
  const [ notification, setNotification ] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const { decrementFollowingCount } = useFollowStore();

  useEffect(() => {
    setFollowings(items);
  }, [items]);

  // 더보기 버튼 기능이 NavLink와 안겹치게 설정
  const handleNavLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 팔로잉 삭제 함수
  const rmFollowing = async (fromUserId: number, toUserId: number) => {
    try {
      await unfollow(fromUserId, toUserId);
      setFollowings(prevFollowings => 
        prevFollowings.filter(following => following.toUserId !== toUserId)
      );
      decrementFollowingCount();
      setNotification({ message: "팔로잉이 삭제되었습니다.", type: 'success' });
    } catch (error) {
      console.error("팔로잉 삭제 실패:", error);
      setNotification({ message: "팔로잉 삭제에 실패했습니다.", type: 'error' });
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
    <div className="space-y-4 relative">
      {followings.map((item) => (
        <div key={item.id}>
          <NavLink
            to={`/user/${item.id}`}
            className="flex items-center space-x-4 p-4 rounded-lg shadow"
          >
            <img src={image} alt={item.nickname} className="w-20 h-20 object-cover rounded" />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.nickname}</h3>
              <div className="flex space-x-4 mt-2">
                <p className="text-sm text-gray-400">{item.email}</p>
              </div>
            </div>

            <p className="text-gray-500">#관심사1 #관심사2 #관심사3</p>
            
            <div onClick={handleNavLink}>
              <FollowingItemKebabDropdown 
                onDeleteFollowing={() => rmFollowing(item.fromUserId, item.toUserId)}
              />
            </div>
          </NavLink>
        </div>
      ))}

      {notification && (
        <div 
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white shadow-lg z-50 transition-opacity duration-300`}
          style={{
            opacity: notification ? 1 : 0,
            visibility: notification ? 'visible' : 'hidden',
          }}
        >
          {notification.message}
        </div>
      )}

    </div>
  );
};

export default FollowingItem;