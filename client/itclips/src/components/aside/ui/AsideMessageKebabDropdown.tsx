import { useState, useEffect, useRef } from 'react';

// icons
import { VscKebabVertical } from "react-icons/vsc";

interface Props {
  roomId: number;
  onMenuItemClick: (action: string) => void;
}

const AsideMessageKebabDropdown: React.FC<Props> = ({ roomId, onMenuItemClick }) => {
  
  const [ isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);
  const categories: string[] = ["초대하기", "채팅방 나가기"];
  
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

  const handleMenu = (menu: string) => {
    onMenuItemClick(menu);
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
        <div className="absolute right-0 top-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 z-10">
          <ul className="py-2 text-sm text-gray-700">
            {categories.map((category) => (
              <li key={category} onClick={() => handleMenu(category)}>
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

export default AsideMessageKebabDropdown;