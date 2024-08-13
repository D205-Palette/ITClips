import { NavLink } from "react-router-dom";
import React, { useState } from "react";

// components
import SearchItemKebabDropdown from "./SearchItemKebabDropdown";

// images
import noImage from "../../../assets/images/noImg.gif"

// icons
import { FaHeart, FaRegHeart } from "react-icons/fa";

// apis
import { likeRoadmap, unlikeRoadmap } from "../../../api/roadmapApi";

// stores
import { authStore } from "../../../stores/authStore";
import { searchStore } from "../../../stores/searchStore";

interface Step {
  id: number;
  listId: number;
  listTitle: string;
  order: string;
  check: boolean;
}

interface RoadmapItem {
  id: number;
  userId: number;
  userName: string;
  title: string;
  description: string;
  image: string;
  isPublic: number;
  createdAt: string;
  stepCnt: number;
  checkCnt: number;
  likeCnt: number;
  steps: Step[];
  isLiked: boolean;
}

interface RoadmapProps {
  item: RoadmapItem;
}

const SearchRoadmapItemList: React.FC<RoadmapProps> = ({ item }) => {

  const userId = authStore(state => state.userId);
  const { updateRoadmapItem } = searchStore();

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
        await unlikeRoadmap(item.id, userId);
        updateRoadmapItem(item.id, { isLiked: false, likeCnt: item.likeCnt - 1 });
      } else {
        await likeRoadmap(item.id, userId);
        updateRoadmapItem(item.id, { isLiked: true, likeCnt: item.likeCnt + 1 });
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
        to={`/roadmap/${item.id}`}
        className="flex items-center space-x-2 md:space-x-4 flex-grow"
      >
        <img src={item.image === "default" ? noImage : item.image} alt={item.title} className="w-14 h-14 md:w-20 md:h-20 object-cover rounded" />
        <div className="flex-grow">
          <h3 className="text-sm md:text-lg font-semibold">{item.title}</h3>
          <div className="flex space-x-2 md:space-x-4 mt-1 md:mt-2">
            <span className="text-xs md:text-sm font-bold text-sky-500">{item.steps.length}개</span>
            <p className="text-xs md:text-sm text-gray-400">{item.userName} 생성</p>
          </div>
        </div>

        <p className="text-xs md:text-sm text-gray-500 hidden sm:block">{truncateDescription(item.description)}</p>

        <button 
          className="btn btn-ghost btn-xs text-xs md:text-sm flex items-center" 
          onClick={handleLike}
        >
          {item.isLiked ? <FaHeart color="red" className="w-3 h-3 md:w-4 md:h-4" /> : <FaRegHeart className="w-3 h-3 md:w-4 md:h-4" />}
          <span className="ml-1">{item.likeCnt}</span>
        </button>

        <div onClick={handleNavLink}>
          <SearchItemKebabDropdown id={item.id} whatContent="로드맵"/>
        </div>
      </NavLink>
    </div>
  );
};

export default SearchRoadmapItemList;