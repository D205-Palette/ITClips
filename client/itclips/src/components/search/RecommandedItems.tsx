import React from 'react';

interface Items {
  id: number;
  title: string;
  imageUrl: string;
  likes: number;
}

const RecommendedItems = () => {
  const bookmarks: Items[] = [
    // 더미 데이터
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="card bg-base-100 shadow-xl">
          <figure><img src={bookmark.imageUrl} alt={bookmark.title} /></figure>
          <div className="card-body">
            <h2 className="card-title">{bookmark.title}</h2>
            <p>좋아요: {bookmark.likes}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedItems;