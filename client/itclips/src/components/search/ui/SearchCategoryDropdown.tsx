import React, { useState, useRef, useEffect } from "react";

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
    <div ref={dropdownRef} className="relative">  {/* relative 클래스 추가 */}
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="btn w-32 text-white bg-slate-400 hover:bg-black-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {searchCategory}
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 h-40 z-50">  {/* z-50 클래스 추가 */}
          <ul className="py-2 text-sm text-gray-700">
            {categories.map((category) => (
              <li key={category} onClick={() => handleCategory(category)}>
                <div className="text-center block px-4 py-2 hover:bg-gray-100">
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