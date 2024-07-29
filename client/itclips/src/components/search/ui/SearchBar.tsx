import React, { useState } from 'react';

// components
import SearchCategoryDropdown from "./SearchCategoryDropdown";

interface ChildProps {
  handleCategory: (category: string, keyword: string) => void;
}

const SearchBar: React.FC<ChildProps> = ({ handleCategory }) => {
  const [ searchCategory, setSearchCategory ] = useState("카테고리");
  const [ searchKeyword, setSearchKeyword ] = useState("");

  // const categories = ["카테고리", "유저", "북마크리스트", "로드맵", "태그"];

  const selectCategory = (category: string) => {
    setSearchCategory(category);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* 검색 카테고리 드롭다운 */}
      <SearchCategoryDropdown selectCategory={selectCategory} />
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