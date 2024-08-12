import React from 'react';

const BookmarkSelector = ({ lists, onSelectList, loading }) => {
  return (
    <div className="bookmark-selector">
      <h2>북마크 리스트 선택</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {lists.map((list) => (
            <li key={list.id}>
              <button onClick={() => onSelectList(list.id)}>{list.title}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarkSelector;
