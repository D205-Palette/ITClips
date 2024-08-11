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
  const [ isLiked, setIsLiked ] = useState(item.isLiked);
  const [ likeCount, setLikeCount ] = useState(item.likeCnt);

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
      if (isLiked) {
        await unlikeRoadmap(item.id, userId);
        setLikeCount(prev => prev - 1);
      } else {
        await likeRoadmap(item.id, userId);
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <NavLink
        to={`/roadmap/${item.id}`}
        className="flex items-center space-x-4 flex-grow"
      >
        <img src={item.image === "default" ? noImage : item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <div className="flex space-x-4 mt-2">
            <span className="text-bold text-sky-500">{item.steps.length}개</span>
            <p className="text-sm text-gray-400">{item.userName} 생성</p>
          </div>
        </div>

        <p className="text-gray-500">리스트에 관한 설명</p>

        <button 
          className="btn btn-ghost btn-xs text-sm flex items-center" 
          onClick={handleLike}
        >
          {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
          <span className="ml-1">{likeCount}</span>
        </button>

        <div onClick={handleNavLink}>
          <SearchItemKebabDropdown id={item.id} whatContent="로드맵"/>
        </div>
      </NavLink>
    </div>
  );
};

export default SearchRoadmapItemList;