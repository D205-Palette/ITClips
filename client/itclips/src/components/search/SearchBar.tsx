import React, { useState } from 'react';

interface ChildProps {
  handleCategory: (category: string, keyword: string) => void;
}

const SearchBar: React.FC<ChildProps> = ({ handleCategory }) => {
  const [ searchCategory, setSearchCategory ] = useState("카테고리");
  const [ searchKeyword, setSearchKeyword ] = useState("");

  const categories = ["카테고리", "유저", "북마크리스트", "로드맵", "태그"];

  return (
    <div className="flex items-center space-x-2">
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1 w-32">{searchCategory}</label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
          {/* 검색 카테고리 드롭다운 */}
          {categories.map((category) => (
            <li key={category} onClick={() => setSearchCategory(category)} className="self-center">
              <a>{category}</a>
            </li>
          ))}
        </ul>
      </div>
      {/* 검색바 */}
      <input 
        type="text" 
        placeholder="검색어를 입력하세요" 
        className="input input-bordered w-full" 
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      {/* 검색 버튼 */}
      <button className="btn btn-primary" onClick={() => handleCategory(searchCategory, searchKeyword)}>검색</button>
    </div>
  );
};

export default SearchBar;