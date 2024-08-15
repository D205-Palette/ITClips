import { NavLink } from "react-router-dom";
import React from "react";

// components
import SearchItemKebabDropdown from "./SearchItemKebabDropdown";

// images
import noImage from "../../../assets/images/noImg.gif"

// icons
import { FaHeart, FaRegHeart } from "react-icons/fa";

// apis
import { likeBookmarkList, unlikeBookmarkList } from "../../../api/bookmarkListApi";

// stores
import { authStore } from "../../../stores/authStore";
import { searchStore } from "../../../stores/searchStore";

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

  const userId = authStore(state => state.userId);
  const { updateBookmarkItem } = searchStore();

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

  // 좋아요 기능
  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (item.isLiked) {
        await unlikeBookmarkList(userId, item.id);
        updateBookmarkItem(item.id, { isLiked: false, likeCount: item.likeCount - 1 });
      } else {
        await likeBookmarkList(userId, item.id);
        updateBookmarkItem(item.id, { isLiked: true, likeCount: item.likeCount + 1 });
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  // 설명 텍스트를 30자로 제한하는 함수
  const truncateDescription = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div>
      <NavLink
        to={`/bookmarklist/${item.id}`}
        className="flex items-center space-x-2 md:space-x-4 flex-grow"
      >
        <img src={item.image === "default" ? require(`../../../assets/images/noContent${item.id % 6}.png`) : item.image} alt={item.title} className="w-14 h-14 md:w-20 md:h-20 object-cover rounded" />
        <div className="flex-grow">
          <h3 className="text-sm md:text-lg font-semibold">{item.title}</h3>
          <div className="flex space-x-2 md:space-x-4 mt-1 md:mt-2">
            <span className="text-xs md:text-base font-bold text-sky-500">{item.bookmarkCount}개</span>
            <p className="text-xs md:text-sm text-gray-400">{getUserNames(item.users)} 생성</p>
          </div>
        </div>

        <p className="text-xs md:text-sm text-gray-500 hidden sm:block">{truncateDescription(item.description)}</p>

        <button 
          className="btn btn-ghost btn-xs text-xs md:text-sm flex items-center" 
          onClick={handleLike}
        >
          {item.isLiked ? <FaHeart color="red" className="w-3 h-3 md:w-4 md:h-4" /> : <FaRegHeart className="w-3 h-3 md:w-4 md:h-4" />}
          <span className="ml-1">{item.likeCount}</span>
        </button>

        <div className="hidden md:block" onClick={handleNavLink}>
          <SearchItemKebabDropdown id={item.id} whatContent='리스트'/>
        </div>
      </NavLink>
    </div>
  );
};

export default SearchBookmarkListItemList;