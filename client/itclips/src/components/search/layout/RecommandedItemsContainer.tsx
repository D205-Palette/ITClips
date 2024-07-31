import React from "react";

// components
import RecommandedItemList from "./RecommandedItemList";
import RecommandedItemGrid from "./RecommandedItemGrid";

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

const RecommendedItemsContainer: React.FC<Props> = ({ items, viewMode }) => {

  // 앨범 정렬
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-base-100 rounded-lg shadow overflow-hidden">
            <RecommandedItemGrid item={item} />
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
          <RecommandedItemList item={item} />
        </div>
      ))}
    </div>
  );
};

export default RecommendedItemsContainer;