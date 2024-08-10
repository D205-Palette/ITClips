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
    <div className="inline-block relative flex-grow" ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="bg-base-100 border w-full hover:bg-black-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {searchCategory}
      </button>

      {isOpen && (
        <div className="absolute left-0 bottom-full mb-1 bg-base-100 divide-y divide-gray-100 rounded-lg shadow w-full max-h-60 overflow-y-auto">
          <ul className="py-2 text-sm text-gray-700">
            {categories.map((category) => (
              <li key={category.id} onClick={() => handleCategory(category)}>
                <div className={`${isDark && "text-gray-200"} text-center block px-4 py-2 hover:bg-gray-100`}>
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