// MessageListContainer.tsx 는 AsideMessage.tsx 에서 채팅방들을 리스트로 보여주는 컴포넌트

import React from "react";

interface ChatRoom {
  id: number;
  title: string;
  subtitle: string;
  hasNotification?: boolean;
}

interface ChildComponentProps {
  rooms: ChatRoom[];
  onClickMessage: (id: number) => any;
}

const MessageContainer: React.FC<ChildComponentProps> = ({ rooms, onClickMessage }) => {
  
  return (
    <div>
      <ul
        className="space-y-4 h-[26rem] overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E0 #EDF2F7"
        }}  
      >
        {rooms.map((room: ChatRoom) => (
          <li 
            key={room.id} 
            className="flex justify-between items-center bg-white hover:bg-sky-100 transition-colors duration-200 rounded-lg shadow-sm w-full px-3 py-2 cursor-pointer" 
            onClick={() => onClickMessage(room.id)}
          >
            <div className="p-3">
              <h3 className="font-semibold text-start">{room.title}</h3>
              <p className="text-sm text-sky-600 text-start message-content">{room.subtitle}</p>
            </div>
            {room.hasNotification && (
              <span className="badge badge-sm bg-sky-500 text-white m-2"></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageContainer;