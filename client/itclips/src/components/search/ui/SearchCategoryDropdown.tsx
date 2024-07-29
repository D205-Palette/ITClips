import React, { useState } from "react";

interface CategoryProps {
  selectCategory: (category: string) => void;
}

const SearchCategoryDropdown: React.FC<CategoryProps> = ({ selectCategory }) => {
  const [ searchCategory, setSearchCategory ] = useState<string>("카테고리");
  const [ isOpen, setIsOpen ] = useState<boolean>(false);

  const toggleDropdown = (): void => setIsOpen(!isOpen);

  const categories: string[] = ["유저", "북마크리스트", "로드맵", "태그"];

  const handleCategory = (category: string) => {
    selectCategory(category);
    setSearchCategory(category);
    setIsOpen(false);
  }

  return (
    <div>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="btn w-32 text-white bg-slate-400 hover:bg-black-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {searchCategory}
      </button>

      {isOpen && (
        <div className="absolute z-1 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {categories.map((category) => (
              <li key={category} onClick={() => handleCategory(category)}>
                <a href="#" className="text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchCategoryDropdown;