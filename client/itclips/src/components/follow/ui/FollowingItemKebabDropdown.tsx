import React, { useState, useRef, useEffect } from "react";

// icons
import { VscKebabVertical } from "react-icons/vsc";

// stores
import { asideStore } from "../../../stores/asideStore";

import { useParams } from "react-router-dom";
import { authStore } from "../../../stores/authStore";
interface Props {
  targetId: number;
  onDeleteFollowing: () => void;
}

const FollowingItemKebabDropdown: React.FC<Props> = ({ targetId, onDeleteFollowing }) => {
const {userId} = authStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
const params = useParams()
  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);
  const toggleMessage = asideStore(state => state.toggleMessage);

  const categories: string[] = params.userId === String(userId) ? ["메세지 보내기", "삭제"] : ["메세지 보내기"]

  // 채팅 시작하는 함수
  const startSendMessage = () => {
    const startNewChat = asideStore.getState().startNewChat;
    startNewChat(userId, targetId);
  }

  const handleMenu = (menu: string) => {
    if (menu === "메세지 보내기") {
      startSendMessage();
    } else if (menu === "삭제") {
      onDeleteFollowing();
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
          <div className="absolute right-full top-0 mr-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 z-10">
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

export default FollowingItemKebabDropdown;