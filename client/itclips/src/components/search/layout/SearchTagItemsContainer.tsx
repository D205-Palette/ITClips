import React from "react";

// components
import SearchTagItemList from "../ui/SearchTagItemList";
import SearchTagItemGrid from "../ui/SearchTagItemGrid";

interface Tag {
  id: number;
  title: string;
  username: string;
  bookmarks: number;
  likes: number;
  createdAt: string;
  thumbnailUrl: string;
}

interface TagViewProps {
  items: Tag[];
  viewMode: 'grid' | 'list';
}

const SearchTagItemContainer: React.FC<TagViewProps> = ({ items, viewMode }) => {

  // 앨범 정렬
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-base-100 rounded-lg shadow overflow-hidden">
            <SearchTagItemGrid item={item} />
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
          <SearchTagItemList item={item} />
        </div>
      ))}
    </div>
  );
};

export default SearchTagItemContainer;