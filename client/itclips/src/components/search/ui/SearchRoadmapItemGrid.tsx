import { NavLink } from "react-router-dom";
import React from "react";

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

const SearchRoadmapItemGrid: React.FC<RoadmapProps> = ({ item }) => {

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

  return (
    <div className="relative">
      <NavLink
        to={`/roadmap/${item.id}`}
        className="block h-full"
      >
        <div className="relative">
          <img src={item.image === "default" ? require(`../../../assets/images/noContent${item.id % 6}.png`) : item.image} alt={item.title} className="w-full h-40 object-cover" />
          <div className="absolute top-2 right-2 z-10" onClick={handleNavLink}>
            <SearchItemKebabDropdown id={item.id} whatContent="로드맵"/>
          </div>
        </div>
        <div className="p-3">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold truncate mb-1">{item.title}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-2 font-bold text-sky-500">{item.steps.length}개</span>
              <p className="truncate text-gray-400">{item.userName} 생성</p>
            </div>
            <div className="flex justify-end mt-2">
              <button 
                className="btn btn-ghost btn-xs text-sm flex items-center" 
                onClick={handleLike}
              >
                {item.isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                <span className="ml-1">{item.likeCnt}</span>
              </button>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SearchRoadmapItemGrid;