import React, { useState } from 'react';

interface RealtimeItem {
  id: number;
  title: string;
  views: number;
  scraps: number;
  likes: number;
}

const RealtimeList = () => {
  
  const [sortBy, setSortBy] = useState<'views' | 'scraps' | 'likes'>('views');
  const trendingItems: RealtimeItem[] = [
    // 더미 데이터
    { id: 1, title: "리눅스 초급자를 위한", views: 5, scraps: 10, likes: 20 },
    { id: 2, title: "리눅스 중급자를 위한", views: 10, scraps: 5, likes: 20 },
    { id: 3, title: "리눅스 고급자를 위한", views: 20, scraps: 10, likes: 5 },
    { id: 4, title: "리눅스 고급자를 위한", views: 20, scraps: 10, likes: 5 },
    { id: 5, title: "리눅스 고급자를 위한", views: 20, scraps: 10, likes: 5 },
    { id: 6, title: "리눅스 고급자를 위한", views: 20, scraps: 10, likes: 5 },
    { id: 7, title: "리눅스 고급자를 위한", views: 20, scraps: 10, likes: 5 },
    { id: 8, title: "리눅스 고급자를 위한", views: 20, scraps: 10, likes: 5 },
    { id: 9, title: "리눅스 고급자를 위한", views: 20, scraps: 10, likes: 5 },
    { id: 10, title: "리눅스 고급자를 위한", views: 20, scraps: 10, likes: 5 },
  ];

  const sortedItems = trendingItems.sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="bg-base-100 p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-3">실시간 인기순위</h2>
      <div className="flex mb-3 border-b">
        <button 
          className={`mr-4 pb-2 text-sm ${
            sortBy === 'views' 
              ? 'text-blue-500 border-b-2 border-blue-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`} 
          onClick={() => setSortBy('views')}
        >
          조회수
        </button>
        <button 
          className={`mr-4 pb-2 text-sm ${
            sortBy === 'scraps' 
              ? 'text-blue-500 border-b-2 border-blue-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`} 
          onClick={() => setSortBy('scraps')}
        >
          스크랩수
        </button>
        <button 
          className={`mr-4 pb-2 text-sm ${
            sortBy === 'likes' 
              ? 'text-blue-500 border-b-2 border-blue-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`} 
          onClick={() => setSortBy('likes')}
        >
          좋아요수
        </button>
      </div>
      <ul className="space-y-2">
        {sortedItems.map((item, index) => (
          <li 
            key={item.id} 
            className="flex items-center py-2"
          >
            <span className="w-6 mr-3 text-sm">
              {index + 1}
            </span>
            <div className="hover:text-blue-500 text-sm">
              {item.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealtimeList;