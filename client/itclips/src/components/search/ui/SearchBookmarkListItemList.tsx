import { NavLink } from "react-router-dom";
import React from "react";

// components
import SearchItemKebabDropdown from "./SearchItemKebabDropdown";

// images (임시)
import image from "../../../assets/images/profile_image.png";

interface Tag {
  title: string;
}

interface User {
  id: number;
  nickName: string;
}

interface BookmarkListItem {
  id: number;
  title: string;
  description: string;
  bookmarkCount: number;
  likeCount: number;
  image: string;
  isLiked: boolean;
  tags: Tag[];
  users: User[];
}

interface BookmarkListItemProps {
item: BookmarkListItem;
}

const SearchBookmarkListItemList: React.FC<BookmarkListItemProps> = ({ item }) => {

  // 더보기 버튼 기능이 NavLink와 안겹치게 설정
  const handleNavLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // users의 nickName을 처리하는 함수
  const getUserNames = (users: User[]) => {
    if (users.length === 0) return "";
    if (users.length === 1) return users[0].nickName;
    return users.map(user => user.nickName).join(", ");
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
            <span className="text-bold text-sky-500">{item.bookmarkCount}개</span>
            <p className="text-sm text-gray-400">{getUserNames(item.users)} 생성</p>
          </div>
        </div>

        <p className="text-gray-500">{item.description}</p>

        <button className="btn btn-ghost btn-xs text-sm" onClick={handleNavLink}>❤️ {item.likeCount}</button>

        <div onClick={handleNavLink}>
          <SearchItemKebabDropdown id={item.id} whatContent='리스트'/>
        </div>
      </NavLink>
    </div>
  );
};

export default SearchBookmarkListItemList;