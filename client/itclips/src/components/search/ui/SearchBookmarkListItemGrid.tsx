import { NavLink } from "react-router-dom";
import React from "react";

// components
import SearchItemKebabDropdown from "./SearchItemKebabDropdown";

// images (임시)
import image from "../../../assets/images/profile_image.png";

interface BookmarkListItem {
  id: number;
  title: string;
  username: string;
  bookmarks: number;
  likes: number;
  createdAt: string;
  thumbnailUrl: string;
}

interface BookmarkListItemProps {
item: BookmarkListItem;
}

const SearchBookmarkListItemGrid: React.FC<BookmarkListItemProps> = ({ item }) => {

  // 더보기 버튼 기능이 NavLink와 안겹치게 설정
  const handleNavLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="relative">
      <NavLink
        to={`/bookmarklist/${item.id}`}
        className="block h-full"
      >
        <div className="relative">
          <img src={image} alt={item.title} className="w-full h-40 object-cover" />
          <div className="absolute top-2 right-2 z-10" onClick={handleNavLink}>
            <SearchItemKebabDropdown />
          </div>
        </div>
        <div className="p-3">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold truncate mb-1">{item.title}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-2 font-bold text-sky-500">{item.bookmarks}개</span>
              <p className="truncate text-gray-400">{item.username} 생성</p>
            </div>
            <div className="flex justify-end mt-2">
              <button className="btn btn-ghost btn-xs" onClick={handleNavLink}>❤️ {item.likes}</button>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SearchBookmarkListItemGrid;