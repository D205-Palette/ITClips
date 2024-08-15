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

const RecommendedItemGrid: React.FC<RecommandedItemProps> = ({ item }) => {

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
    <div className="relative">
      <NavLink
        to={`/bookmarklist/${item.id}`}
        className="block h-full"
      >
        <div className="relative">
          <img src={item.image === "default" ? require(`../../../assets/images/noContent${item.id % 6}.png`) : item.image} alt={item.title} className="w-full h-40 object-cover" />
          <div className="absolute top-2 right-2 z-10" onClick={handleNavLink}>
            <SearchItemKebabDropdown id={item.id} whatContent="리스트"/>
          </div>
        </div>
        <div className="p-3">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold truncate mb-1">{item.title}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-2 font-bold text-sky-500">{item.bookmarkCount}개</span>
              <p className="truncate text-gray-400">
                {item.users.map((user, index) => (
                  <React.Fragment key={user.id}>
                    {user.nickName}
                    {index < item.users.length - 1 ? ', ' : ''} 
                  </React.Fragment>
                ))}
                {' '}생성
              </p>
            </div>
            <div className="flex justify-end mt-2">
              <button 
                className="btn btn-ghost btn-xs text-sm flex items-center" 
                onClick={handleLike}
              >
                {item.isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                <span className="ml-1">{item.likeCount}</span>
              </button>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default RecommendedItemGrid;