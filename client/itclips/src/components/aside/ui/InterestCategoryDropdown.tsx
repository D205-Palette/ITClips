import React, { useState, useRef, useEffect } from "react";

// stores
import darkModeStore from "../../../stores/darkModeStore";

// apis
import { getInterestTag } from "../../../api/tagApi";

interface InterestProps {
  selectCategory: (category: string) => void;
}

const InterestCategoryDropdown: React.FC<InterestProps> = ({ selectCategory }) => {
  const [searchCategory, setSearchCategory] = useState<string>("관심사 선택");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDark = darkModeStore(state => state.isDark);

  // 카테고리 목록 가져오기
  const fetchCategories = async () => {
    try {
      const response = await getInterestTag();
      const titles = response.data.map((item: { title: string }) => item.title);
      setCategories(titles);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 드롭다운 메뉴가 열렸는지 확인
  const toggleDropdown = (): void => setIsOpen(!isOpen);

  // 카테고리 제어
  const handleCategory = (category: string) => {
    selectCategory(category);
    setSearchCategory(category);
    setIsOpen(false);
  }

  // 마우스 클릭을 메뉴 바깥에서 할 경우 자동으로 닫히게
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="inline-block relative flex-grow" ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="bg-base-100 border w-full hover:bg-black-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {searchCategory}
      </button>

      {isOpen && (
        <div className="absolute left-0 bottom-full mb-1 bg-base-100 divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 max-h-60 overflow-y-auto">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {categories.map((category) => (
              <li key={category} onClick={() => handleCategory(category)}>
                <div className={`${isDark && "text-gray-200"} text-center block px-4 py-2 hover:bg-gray-100`}>
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

export default InterestCategoryDropdown;