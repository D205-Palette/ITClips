import React from 'react';

function BookmarkList({ bookmarks }) {
  return (
    <ul>
      {bookmarks.map((bookmark, index) => (
        <li key={index}>
          <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
            {bookmark.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default BookmarkList;
