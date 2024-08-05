import React, { useState, useRef, useEffect } from "react";

// icons
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// stores
import darkModeStore from "../../../stores/darkModeStore";

interface JobProps {
  selectCategory: (category: string) => void;
}

const JobCategoryDropdown: React.FC<JobProps> = ({ selectCategory }) => {
  const [ searchCategory, setSearchCategory ] = useState<string>("프론트엔드 개발자");
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDark = darkModeStore(state => state.isDark);

  const toggleDropdown = (): void => setIsOpen(!isOpen);

  const categories: string[] = [
    "프론트엔드 개발자",
    "백엔드 개발자",
    "풀스택 개발자",
    "IOS 개발자",
    "안드로이드 개발자",
    "크로스플랫폼 개발자",
    "게임 프로그래머",
    "게임 디자이너",
    "데이터 사이언티스트",
    "데이터 엔지니어",
    "머신 러닝 엔지니어",
    "데브옵스 엔지니어",
    "시스템 관리자",
    "보안 엔지니어",
    "정보보안 분석가",
    "소프트웨어 아키텍트",
    "QA 엔지니어",
    "릴리즈 매니저",
    "기타",
  ];

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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="w-full bg-base-100 border hover:bg-black-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-left inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <span className="truncate">{searchCategory}</span>
        <div className="w-4 h-4 ml-2 flex-shrink-0">
          {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full bottom-full mb-1 bg-base-100 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 max-h-60 overflow-y-auto">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {categories.map((category) => (
              <li key={category} onClick={() => handleCategory(category)}>
                <div className={`${isDark && "text-gray-200"} block px-4 py-2 hover:bg-gray-100 cursor-pointer`}>
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

export default JobCategoryDropdown;