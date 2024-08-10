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

const RecommendedItemList: React.FC<RecommandedItemProps> = ({ item }) => {

  // 더보기 버튼 기능이 NavLink와 안겹치게 설정
  const handleNavLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      <NavLink
        to={`/bookmarklist/${item.id}`}
        className="flex items-center space-x-4 flex-grow"
      >
        <img src={item.image === "default" ? noImage : item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <div className="flex space-x-4 mt-2">
            <span className="text-bold text-sky-500">{item.bookmarkCount}개</span>
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
        </div>

        <p className="text-gray-500">리스트에 관한 설명</p>

        <button className="btn btn-ghost btn-xs text-sm" onClick={handleNavLink}>❤️ {item.likeCount}</button>

        <div onClick={handleNavLink}>
          <SearchItemKebabDropdown whatContent="리스트" id={item.id}/>
        </div>
      </NavLink>
    </div>
  );
};

export default RecommendedItemList;