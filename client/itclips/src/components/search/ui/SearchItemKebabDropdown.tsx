import { useState, useEffect, useRef } from 'react';
import { VscKebabVertical } from "react-icons/vsc";

const SearchItemKebabDropdown = () => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState<boolean>(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);
  const [ isUrlCopyModalOpen, setIsUrlCopyModalOpen ] = useState<boolean>(false);
  const [ isReportModalOpen, setIsReportModalOpen ] = useState<boolean>(false);
  const [ isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsUrlCopyModalOpen(true)
    } catch (error) {
      console.log(error);
    }
  }

  const categories: string[] = ["수정하기", "삭제하기", "url복사", "신고하기"];

  const handleMenu = (menu: string) => {
    if (menu === "수정하기") {
      setIsEditModalOpen(true);
    } else if (menu === "삭제하기") {
      setIsDeleteModalOpen(true);
    } else if (menu === "url복사") {
      handleCopyClipBoard();
    } else if (menu === "신고하기") {
      setIsReportModalOpen(true);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="self-end flex justify-end relative" ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="btn btn-ghost btn-circle text-center"
        type="button"
      >
        <VscKebabVertical />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 z-10">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {categories.map((category) => (
              <li key={category} onClick={() => handleMenu(category)}>
                <div className="text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {category}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* 모달 컴포넌트들... */}
    </div>
  );
};

export default SearchItemKebabDropdown;