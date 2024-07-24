import React, { useState } from 'react';

const SearchBar = () => {
  const [searchCategory, setSearchCategory] = useState('유저');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['유저', '북마크리스트', '로드맵', '태그'];

  return (
    <div className="flex items-center space-x-2">
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">{searchCategory}</label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          {categories.map((category) => (
            <li key={category} onClick={() => setSearchCategory(category)}>
              <a>{category}</a>
            </li>
          ))}
        </ul>
      </div>
      <input 
        type="text" 
        placeholder="검색어를 입력하세요" 
        className="input input-bordered w-full" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-primary">검색</button>
    </div>
  );
};

export default SearchBar;