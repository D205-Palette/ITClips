import React from 'react';

interface BookmarkListItem {
  id: number;
  title: string;
  username: string;
  bookmarkCount: number;
  likeCount: number;
  createdAt: string;
  thumbnailUrl: string;
}

interface BookmarkListViewProps {
  items: BookmarkListItem[];
  viewMode: 'grid' | 'list';
}

const SearchBookmarkListItem: React.FC<BookmarkListViewProps> = ({ items, viewMode }) => {

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img src={item.thumbnailUrl} alt={item.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{item.title}</h3>
              <p className="text-sm text-gray-600 truncate">{item.username}</p>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>북마크 {item.bookmarkCount}</span>
                <span>❤️ {item.likeCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
          <img src={item.thumbnailUrl} alt={item.title} className="w-20 h-20 object-cover rounded" />
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.username}</p>
            <div className="flex space-x-4 mt-2">
              <span className="text-sm text-gray-500">북마크 {item.bookmarkCount}</span>
              <span className="text-sm text-gray-500">좋아요 {item.likeCount}</span>
              <span className="text-sm text-gray-500">{item.createdAt}</span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">•••</button>
        </div>
      ))}
    </div>
  );
};

export default SearchBookmarkListItem;