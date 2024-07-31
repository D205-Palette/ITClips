import React from "react";
import { NavLink } from "react-router-dom";

// components
import SearchItemKebabDropdown from "../ui/SearchItemKebabDropdown";

interface RecommandedItem {
  id: number;
  title: string;
  username: string;
  imageUrl: string;
  bookmarks: number;
  likes: number;
  createdAt: string;
}

interface Props {
  items: RecommandedItem[];
  viewMode: 'grid' | 'list';
}

const RecommendedItems: React.FC<Props> = ({ items, viewMode }) => {

  // 더보기 버튼 기능이 NavLink와 안겹치게 설정
  const handleKebabClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 앨범 정렬
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id}>
            <NavLink
              to={`/bookmarklist/${item.id}`}
              className="bg-base-100 rounded-lg shadow overflow-hidden"
            >
              <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{item.title}</h3>
                <p className="text-sm text-gray-600 truncate">{item.username}</p>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>북마크 {item.bookmarks}</span>
                  <span>❤️ {item.likes}</span>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    );
  }

  // 리스트 정렬
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 p-4 bg-base-100 rounded-lg shadow">
          <NavLink
            to={`/bookmarklist/${item.id}`}
            className="flex items-center space-x-4 flex-grow"
          >
            <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded" />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.username}</p>
              <div className="flex space-x-4 mt-2">
                <span className="text-sm text-gray-500">북마크 {item.bookmarks}</span>
                <span className="text-sm text-gray-500">좋아요 {item.likes}</span>
                <span className="text-sm text-gray-500">{item.createdAt}</span>
              </div>
            </div>
          </NavLink>
          <div onClick={handleKebabClick}>
            <SearchItemKebabDropdown />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedItems;