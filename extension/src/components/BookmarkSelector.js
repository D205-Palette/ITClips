import React from "react";

const BookmarkSelector = ({ lists, onSelectList, loading }) => {
  const handleSelectChange = (event) => {
    const selectedListId = event.target.value;
    if (selectedListId) {
      onSelectList(selectedListId);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold">북마크 추가하기</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select
          onChange={handleSelectChange}
          defaultValue=""
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            북마크 리스트 선택
          </option>
          {lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.title}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default BookmarkSelector;
