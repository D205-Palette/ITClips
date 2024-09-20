import React, { useState, FormEvent } from "react";

// components
import SearchCategoryDropdown from "./SearchCategoryDropdown";

interface ChildProps {
  handleCategory: (category: string, keyword: string) => void;
}

const SearchBar: React.FC<ChildProps> = ({ handleCategory }) => {
  
  const [ searchCategory, setSearchCategory ] = useState("카테고리");
  const [ searchKeyword, setSearchKeyword ] = useState("");

  const selectCategory = (category: string) => {
    setSearchCategory(category);
  };

  // 엔터키를 눌러도 검색되도록
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCategory(searchCategory, searchKeyword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      {/* 검색 카테고리 드롭다운 */}
      <SearchCategoryDropdown selectCategory={selectCategory} />
      {/* 검색바 */}
      <input 
        type="text" 
        placeholder="검색어를 입력하세요" 
        className="input input-bordered w-full text-xs md:text-sm py-1.5 md:py-2.5 px-2 md:px-5" 
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      {/* 검색 버튼 */}
      <button type="submit" className="btn bg-sky-500 hover:bg-sky-700 text-slate-100 text-xs md:text-sm py-1.5 md:py-2.5 px-2 md:px-5">검색</button>
    </form>
  );
};

export default SearchBar;