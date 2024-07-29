import React from "react";

// components
import FollowingItemKebabDropdown from "./ui/FollowingItemKebabDropdown";

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

const FollowingItem: React.FC<Props> = ({ items }) => {

  // 리스트 정렬
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
          <img src={item.imageUrl} className="w-20 h-20 object-cover rounded" />
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{item.username}</h3>
            <p className="text-sm text-gray-600">{item.email}</p>
            <div className="flex space-x-4 mt-2">
              <span className="text-sm text-gray-500">북마크 {item.tag}</span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <FollowingItemKebabDropdown />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FollowingItem;