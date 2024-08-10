// ChatRoomListContainer.tsx 는 AsideMessage.tsx 에서 채팅방들을 리스트로 보여주는 컴포넌트

import React, { useRef, useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

// icons
import { FaChevronUp, FaChevronDown  } from "react-icons/fa6";

// stores
import { chatStore } from "../../../stores/chatStore";

interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string | null;
  lastModified: string | null;
  messageCnt: number;
}

interface ChildComponentProps {
  onClickMessage: (id: number) => any;
}

const ChatRoomListContainer: React.FC<ChildComponentProps> = ({ onClickMessage }) => {

  const rooms = chatStore(useShallow(state => state.rooms));

  const listRef = useRef<HTMLUListElement>(null);
  const [showTopArrow, setShowTopArrow] = useState(false);
  const [showBottomArrow, setShowBottomArrow] = useState(false);

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      setShowTopArrow(scrollTop > 0);
      setShowBottomArrow(scrollTop + clientHeight < scrollHeight);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [rooms]);
  
  return (
    <div className="h-full overflow-hidden relative">
      {showTopArrow && (
        <div className="absolute top-0 left-0 right-0 flex justify-center bg-gradient-to-b from-base-100 to-transparent py-2">
          <FaChevronUp className="text-gray-400" size={20} />
        </div>
      )}
      <ul
        ref={listRef}
        className="space-y-2 h-full overflow-y-auto scrollbar-hide"
        onScroll={handleScroll}
      >
        {rooms.map((room: ChatRoom) => (
          <li 
            key={room.id} 
            className="flex justify-between items-center bg-base-100 hover:bg-sky-50 transition-colors duration-200 rounded-lg shadow-xl w-full px-3 py-2 cursor-pointer"
            onClick={() => onClickMessage(room.id)}
          >
            <div className="p-3 flex-1 min-w-0">
              <h3 className="font-semibold text-start truncate">{room.name}</h3>
              <p className="text-sm text-sky-600 text-start message-content truncate">
                {room.lastMessage || "메세지가 없습니다."}
              </p>
            </div>
            {room.messageCnt > 0 && (
              <div className="badge badge-error badge-sm text-white min-w-[1.5rem] h-6 flex items-center justify-center flex-shrink-0">
                {room.messageCnt}
              </div>
            )}
          </li>
        ))}
      </ul>
      {showBottomArrow && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-base-100 to-transparent py-2">
          <FaChevronDown className="text-gray-400" size={20} />
        </div>
      )}
    </div>
  );
};

export default ChatRoomListContainer;