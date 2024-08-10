// ChatRoomListContainer.tsx 는 AsideMessage.tsx 에서 채팅방들을 리스트로 보여주는 컴포넌트

import React from "react";
import { useShallow } from "zustand/react/shallow";

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
  
  return (
    <div className="h-full overflow-hidden">
      <ul
        className="space-y-2 h-full overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E0 #EDF2F7"
        }}  
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
    </div>
  );
};

export default ChatRoomListContainer;