import React from "react";
import { NavLink } from "react-router-dom";

// components
import FollowerItemKebabDropdown from "./ui/FollowerItemKebabDropdown";

// images (임시)
import image from "../../assets/images/profile_image.png";

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

  // 더보기 버튼 기능이 NavLink와 안겹치게 설정
  const handleNavLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
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
          <FollowerItemKebabDropdown />
        </div>
      </NavLink>
        </div>
      ))}
    </div>
  );
};

export default FollowerItem;