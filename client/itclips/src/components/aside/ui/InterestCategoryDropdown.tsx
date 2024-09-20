import React, { useState, useRef, useEffect } from "react";
import darkModeStore from "../../../stores/darkModeStore";
import { getInterestTag } from "../../../api/tagApi";

interface InterestCategory {
  id: number;
  title: string;
}

interface InterestProps {
  selectCategory: (category: InterestCategory) => void;
}

const InterestCategoryDropdown: React.FC<InterestProps> = ({ selectCategory }) => {
  const [searchCategory, setSearchCategory] = useState<string>("관심사 선택");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<InterestCategory[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDark = darkModeStore(state => state.isDark);

  const fetchCategories = async () => {
    try {
      const response = await getInterestTag();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleDropdown = (): void => setIsOpen(!isOpen);

  const handleCategory = (category: InterestCategory) => {
    selectCategory(category);
    setSearchCategory(category.title);
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
    <div className="inline-block relative w-full" ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="bg-base-100 border w-full hover:bg-black-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center justify-between"
        type="button"
      >
        <span className="truncate">{searchCategory}</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 left-0 bottom-full mb-1 bg-base-100 divide-y divide-gray-100 rounded-lg shadow w-11/12 max-h-48 overflow-y-auto">
          <ul className="py-1 text-sm text-gray-700">
            {categories.map((category) => (
              <li key={category.id} onClick={() => handleCategory(category)}>
                <div className={`${isDark ? "text-gray-200" : "text-gray-700"} text-center block px-3 py-1.5 hover:bg-gray-100 cursor-pointer`}>
                  {category.title}
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