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
      <ul className="space-y-4 h-[26rem] overflow-y-auto">
        {rooms.map((room: ChatRoom) => (
          <li key={room.id} className="flex justify-between items-center bg-base-100 rounded w-100 px-3 py-2" onClick={() => onClickMessage(room.id)}>
            <div className="p-3">
              <h3 className="font-semibold text-start">{room.title}</h3>
              <p className="text-sm text-gray-500 text-start message-content">{room.subtitle}</p>
            </div>
            {room.hasNotification && (
              <span className="badge badge-sm badge-error m-5"></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageContainer;