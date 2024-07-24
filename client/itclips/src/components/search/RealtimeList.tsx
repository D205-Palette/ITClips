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
  ];

  const sortedItems = trendingItems.sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">실시간 인기순위</h2>
        <div className="btn-group">
          <button className={`btn ${sortBy === 'views' ? 'btn-active' : ''}`} onClick={() => setSortBy('views')}>조회수</button>
          <button className={`btn ${sortBy === 'scraps' ? 'btn-active' : ''}`} onClick={() => setSortBy('scraps')}>스크랩수</button>
          <button className={`btn ${sortBy === 'likes' ? 'btn-active' : ''}`} onClick={() => setSortBy('likes')}>좋아요수</button>
        </div>
        <ul className="menu bg-base-100 w-full">
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