import React from "react";
import { NavLink } from "react-router-dom";

// images
import noImage from "../../../assets/images/noImg.gif"

// components
import SearchItemKebabDropdown from "./SearchItemKebabDropdown";

interface RecommendedItem {
  id: number;
  title: string;
  description: string;
  bookmarkCount: number;
  createdAt: string;
  likeCount: number;
  image: string;
  isLiked: boolean;
  tags: { title: string }[];
  users: { id: number; nickName: string }[];
}

interface RecommandedItemProps {
  item: RecommendedItem;
}

const RecommendedItemGrid: React.FC<RecommandedItemProps> = ({ item }) => {

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
          <img src={item.image === "default" ? noImage : item.image} alt={item.title} className="w-full h-40 object-cover" />
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
              <button className="btn btn-ghost btn-xs" onClick={handleNavLink}>❤️ {item.likeCount}</button>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default RecommendedItemGrid;