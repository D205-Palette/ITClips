import React, { useState, useRef, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
interface CategoryProps {
  selectCategory: (category: string) => void;
}

const SearchCategoryDropdown: React.FC<CategoryProps> = ({ selectCategory }) => {
  const [searchCategory, setSearchCategory] = useState<string>("카테고리");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (): void => setIsOpen(!isOpen);

  const categories: string[] = ["유저", "북마크리스트", "로드맵", "태그"];

  const handleCategory = (category: string) => {
    selectCategory(category);
    setSearchCategory(category);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="btn w-28 md:w-32 text-white bg-slate-400 hover:bg-black-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-1.5 md:py-2.5 text-center"
        type="button"
      >
        {searchCategory}
      </button>

      {isOpen && (
        <div className="absolute mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 md:w-44 z-50">
          <ul className="py-1 md:py-2 text-xs md:text-sm text-gray-700">
            {categories.map((category) => (
              <li key={category} onClick={() => handleCategory(category)}>
                <div className="text-center block px-2 md:px-4 py-1 md:py-2 hover:bg-gray-100">
                  {category}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchCategoryDropdown;