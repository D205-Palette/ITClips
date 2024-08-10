import React from "react";

// components
import RecommandedItemList from "../ui/RecommendedItemList";
import RecommandedItemGrid from "../ui/RecommendedItemGrid";

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

interface Props {
  items: RecommendedItem[];
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