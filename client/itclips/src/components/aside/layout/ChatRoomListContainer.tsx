// ChatRoomListContainer.tsx 는 AsideMessage.tsx 에서 채팅방들을 리스트로 보여주는 컴포넌트

import React from "react";

interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string | null;
  lastModified: string | null;
  messageCnt: number;
}

interface ChildComponentProps {
  rooms: ChatRoom[];
  onClickMessage: (id: number) => any;
}

const ChatRoomListContainer: React.FC<ChildComponentProps> = ({ rooms, onClickMessage }) => {
  
  return (
    <div>
      <ul
        className="space-y-4 h-[28rem] overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E0 #EDF2F7"
        }}  
      >
        {rooms.map((room: ChatRoom) => (
          <li 
            key={room.id} 
            className="flex justify-between items-center bg-base-100 hover:bg-sky-100 transition-colors duration-200 rounded-lg shadow-sm w-full px-3 py-2 cursor-pointer" 
            onClick={() => onClickMessage(room.id)}
          >
            <div className="p-3">
              <h3 className="font-semibold text-start">{room.name}</h3>
              <p className="text-sm text-sky-600 text-start message-content">{room.lastMessage || "메세지가 없습니다."}</p>
            </div>
            {room.messageCnt > 0 && (
              <div className="badge badge-error badge-sm text-white min-w-[1.5rem] h-6 flex items-center justify-center">
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