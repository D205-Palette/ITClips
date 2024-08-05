import { NavLink } from "react-router-dom";
import React from "react";

// components
import SearchItemKebabDropdown from "./SearchItemKebabDropdown";

// images (임시)
import image from "../../../assets/images/profile_image.png";

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

  // 더보기 버튼 기능이 NavLink와 안겹치게 설정
  const handleNavLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      <NavLink
        to={`/roadmap/${item.id}`}
        className="flex items-center space-x-4 flex-grow"
      >
        <img src={image} alt={item.title} className="w-20 h-20 object-cover rounded" />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <div className="flex space-x-4 mt-2">
            <span className="text-bold text-sky-500">{item.steps.length}개</span>
            <p className="text-sm text-gray-400">{item.userName} 생성</p>
          </div>
        </div>

        <p className="text-gray-500">리스트에 관한 설명</p>

        <button className="btn btn-ghost btn-xs text-sm" onClick={handleNavLink}>❤️ {item.likeCnt}</button>

        <div onClick={handleNavLink}>
          <SearchItemKebabDropdown id={item.id} whatContent="로드맵"/>
        </div>
      </NavLink>
    </div>
  );
};

export default SearchRoadmapItemList;