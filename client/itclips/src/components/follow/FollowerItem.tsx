import React from "react";
import { NavLink } from "react-router-dom";

// components
import FollowerItemKebabDropdown from "./ui/FollowerItemKebabDropdown";

interface User {
  id: number;
  username: string;
  imageUrl: string;
  email: string;
  tag: string;
}

interface Props {
  items: User[];
}

const FollowerItem: React.FC<Props> = ({ items }) => {

  // 드롭다운 클릭 이벤트 핸들러
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id}>
          <NavLink to="/user/:user_id" className="flex items-center space-x-4 p-4 rounded-lg shadow">
            <img src={item.imageUrl} alt={item.username} className="w-20 h-20 object-cover rounded" />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.username}</h3>
              <p className="text-sm text-gray-600">{item.email}</p>
              <div className="flex space-x-4 mt-2">
                <span className="text-sm text-gray-500">{item.tag}</span>
              </div>
            </div>
            <div onClick={handleDropdownClick} className="text-gray-400 hover:text-gray-600">
              <FollowerItemKebabDropdown />
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default FollowerItem;