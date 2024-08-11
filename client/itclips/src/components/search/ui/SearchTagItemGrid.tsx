import { NavLink } from "react-router-dom";
import React, { useState } from "react";

// components
import SearchItemKebabDropdown from "./SearchItemKebabDropdown";

// images
import noImage from "../../../assets/images/noImage.png"

// icons
import { FaHeart, FaRegHeart } from "react-icons/fa";

// apis
import { likeBookmarkList, unlikeBookmarkList } from "../../../api/bookmarkListApi";

// stores
import { authStore } from "../../../stores/authStore";

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

interface TagProps {
  item: BookmarkListItem;
}

const SearchTagItemGrid: React.FC<TagProps> = ({ item }) => {

  const userId = authStore(state => state.userId);
  const [ isLiked, setIsLiked ] = useState(item.isLiked);
  const [ likeCount, setLikeCount ] = useState(item.likeCount);

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
      if (isLiked) {
        await unlikeBookmarkList(userId, item.id);
        setLikeCount(prev => prev - 1);
      } else {
        await likeBookmarkList(userId, item.id);
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  return (
    <div className="relative">
      <NavLink
        to={`/bookmarklist/${item.id}`}
        className="block h-full"
      >
        <div className="relative">
          <img src={item.image === "default" ? noImage : item.image} alt={item.title} className="w-full h-40 object-cover" />
          <div className="absolute top-2 right-2 z-10" onClick={handleNavLink}>
            <SearchItemKebabDropdown id={item.id} whatContent="태그"/>
          </div>
        </div>
        <div className="p-3">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold truncate mb-1">{item.title}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-2 font-bold text-sky-500">{item.bookmarkCount}개</span>
              <p className="text-sm text-gray-400">{getUserNames(item.users)} 생성</p>
            </div>
            <div className="flex justify-end mt-2">
              <button 
                className="btn btn-ghost btn-xs text-sm flex items-center" 
                onClick={handleLike}
              >
                {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                <span className="ml-1">{likeCount}</span>
              </button>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SearchTagItemGrid;