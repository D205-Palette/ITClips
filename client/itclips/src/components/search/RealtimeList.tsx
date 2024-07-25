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
    <div className="bg-base-100 shadow-xl">
      <div className="">
        <h2 className="">실시간 인기순위</h2>
        <div className="">
          <button className={`${sortBy === 'views' ? 'btn-active' : ''}`} onClick={() => setSortBy('views')}>조회수</button>
          <button className={`${sortBy === 'scraps' ? 'btn-active' : ''}`} onClick={() => setSortBy('scraps')}>스크랩수</button>
          <button className={`${sortBy === 'likes' ? 'btn-active' : ''}`} onClick={() => setSortBy('likes')}>좋아요수</button>
        </div>
        <ul className="bg-base-100 w-full">
          {/* 정렬된 인기 순위 목록 */}
          {sortedItems.map((item, index) => (
            <li key={item.id}>
              <a>{`${index + 1}. ${item.title}`}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RealtimeList;