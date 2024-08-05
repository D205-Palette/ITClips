import React from "react";

// components
import SearchBookmarkListItemList from "../ui/SearchBookmarkListItemList";
import SearchBookmarkListItemGrid from "../ui/SearchBookmarkListItemGrid";

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

interface BookmarkListViewProps {
  items: BookmarkListItem[];
  viewMode: 'grid' | 'list';
}

const SearchBookmarkListItemContainer: React.FC<BookmarkListViewProps> = ({ items, viewMode }) => {

  // 앨범 정렬
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-base-100 rounded-lg shadow overflow-hidden">
            <SearchBookmarkListItemGrid item={item} />
          </div>
        ))}
      </div>
    );
  }

  // 리스트 정렬
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="p-4 rounded shadow">
          <SearchBookmarkListItemList item={item} />
        </div>
      ))}
    </div>
  );
};

export default SearchBookmarkListItemContainer;