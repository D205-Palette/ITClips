import React, { useState, useRef, useEffect } from "react";

// icons
import { VscKebabVertical } from "react-icons/vsc";

// stores
import { asideStore } from "../../../stores/asideStore";

const FollowerItemKebabDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);
  const toggleMessage = asideStore(state => state.toggleMessage);

  const categories: string[] = ["메세지 보내기", "삭제", "삭제 후 차단"];

  // 채팅 시작하는 함수
  const startSendMessage = () => {
    toggleMessage();
    // 열린 메세지 창에서 채팅 시작하는 로직 구현해야 함
  }

  const handleMenu = (menu: string) => {
    if (menu === "메세지 보내기") {
      startSendMessage();
    } else if (menu === "삭제") {
      // 팔로워 삭제 로직
    } else if (menu === "삭제 후 차단") {
      // 팔로워 삭제 후 차단 로직
    }
    setIsDropdownOpen(false);
  };

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

  return (
    <div className="self-end flex justify-end relative">
      <div className="relative" ref={dropdownRef}>
        {isDropdownOpen && (
          <div className="absolute right-full top-0 mr-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 z-10">
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
        <button
          id="dropdownDefaultButton"
          onClick={toggleDropdown}
          className="btn btn-ghost btn-circle text-center"
          type="button"
        >
          <VscKebabVertical />
        </button>
      </div>
    </div>
  );
};

export default FollowerItemKebabDropdown;