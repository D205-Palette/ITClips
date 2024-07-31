import { NavLink } from "react-router-dom";
import React from "react";

// components
import SearchItemKebabDropdown from "../ui/SearchItemKebabDropdown";

// images (임시)
import image from "../../../assets/images/profile_image.png";

interface RoadmapItem {
  id: number;
  title: string;
  username: string;
  bookmarks: number;
  likes: number;
  createdAt: string;
  thumbnailUrl: string;
}

interface RoadmapProps {
  item: RoadmapItem;
}

const SearchRoadmapItemList: React.FC<RoadmapProps> = ({ item }) => {

  // 더보기 버튼 기능이 NavLink와 안겹치게 설정
  const handleNavLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      <NavLink
        to={`/bookmarklist/${item.id}`}
        className="flex items-center space-x-4 flex-grow"
      >
        <img src={image} alt={item.title} className="w-20 h-20 object-cover rounded" />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <div className="flex space-x-4 mt-2">
            <span className="text-bold text-sky-500">{item.bookmarks}개</span>
            <p className="text-sm text-gray-400">{item.username} 생성</p>
          </div>
        </div>

        <p className="text-gray-500">리스트에 관한 설명</p>

        <button className="btn btn-ghost btn-xs text-sm" onClick={handleNavLink}>❤️ {item.likes}</button>

        <div onClick={handleNavLink}>
          <SearchItemKebabDropdown />
        </div>
      </NavLink>
    </div>
  );
};

export default SearchRoadmapItemList;