import React from "react";
import { NavLink } from "react-router-dom";

// images
import noImage from "../../../assets/images/noImg.gif"

// components
import SearchItemKebabDropdown from "./SearchItemKebabDropdown";

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

interface RecommendedItem {
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

interface RecommandedItemProps {
  item: RecommendedItem;
}

const RecommendedItemList: React.FC<RecommandedItemProps> = ({ item }) => {

  const userId = authStore(state => state.userId);
  const { updateBookmarkItem } = searchStore();

  // 더보기 버튼 기능이 NavLink와 안겹치게 설정
  const handleNavLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  return (
    <div>
      <NavLink
        to={`/bookmarklist/${item.id}`}
        className="flex items-center space-x-2 md:space-x-4 flex-grow"
      >
        <img src={item.image === "default" ? noImage : item.image} alt={item.title} className="w-14 h-14 md:w-20 md:h-20 object-cover rounded" />
        <div className="flex-grow">
          <h3 className="text-sm md:text-lg font-semibold">{item.title}</h3>
          <div className="flex space-x-2 md:space-x-4 mt-1 md:mt-2">
            <span className="text-xs md:text-base font-bold text-sky-500">{item.bookmarkCount}개</span>
            <p className="truncate text-xs md:text-sm text-gray-400">
              {item.users.map((user, index) => (
                <React.Fragment key={user.id}>
                  {user.nickName}
                  {index < item.users.length - 1 ? ', ' : ''} 
                </React.Fragment>
              ))}
              {' '}생성
            </p>
          </div>
        </div>

        <p className="text-xs md:text-sm text-gray-500 hidden sm:block">리스트에 관한 설명</p>

        <button 
          className="btn btn-ghost btn-xs text-xs md:text-sm flex items-center" 
          onClick={handleLike}
        >
          {item.isLiked ? <FaHeart color="red" size={12} className="md:w-4 md:h-4" /> : <FaRegHeart size={12} className="md:w-4 md:h-4" />}
          <span className="ml-1">{item.likeCount}</span>
        </button>

        <div onClick={handleNavLink}>
          <SearchItemKebabDropdown whatContent="리스트" id={item.id}/>
        </div>
      </NavLink>
    </div>
  );
};

export default RecommendedItemList;