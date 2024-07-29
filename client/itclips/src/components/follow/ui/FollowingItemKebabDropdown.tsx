import { useState } from 'react';
import { VscKebabVertical } from "react-icons/vsc";

// components

const FollowingItemKebabDropdown = () => {

  const [ isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);

  const categories: string[] = ["메세지 보내기", "삭제"];

  const handleMenu = (menu: string) => {
    if (menu === "메세지 보내기") {
      // 메세지 보내기 로직
    } else if (menu === "삭제") {
      // 팔로잉 삭제 로직
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="self-end flex justify-end relative">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="btn btn-ghost btn-circle text-center"
        type="button"
      >
        <VscKebabVertical />
      </button>

      {/* 드롭다운 메뉴 추가 */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 z-10"> {/* right-0과 top-full 추가 */}
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {categories.map((category) => (
              <li key={category} onClick={() => handleMenu(category)}>
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

export default FollowingItemKebabDropdown;