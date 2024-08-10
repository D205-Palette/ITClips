// AsideMessage.tsx 는 메세지 컴포넌트 메인
import React, { useEffect } from "react";

// components
import MessageHeader from "./layout/MessageHeader";
import ChatRoomListContainer from "./layout/ChatRoomListContainer";

// stores
import { authStore } from "../../stores/authStore";
import { chatStore } from "../../stores/chatStore";

interface MessageListProps {
  onSelectChat: (id: number) => void;
  onShowInvite: (state: number) => void;
}

const AsideMessage: React.FC<MessageListProps> = ({ onSelectChat, onShowInvite }) => {

  const onClickMessage = (roomId: number) => {
    // 해당 메세지 대화창으로 이동하게 구현하기
    onSelectChat(roomId);
  }

  const onClickInvite = (state: number) => {
    onShowInvite(state);
  }

  return (
    <div className="flex flex-col h-full">
      <MessageHeader onClickInvite={onShowInvite} />
      <div className="flex-1 overflow-y-auto px-4">
        <ChatRoomListContainer onClickMessage={onSelectChat} />
      </div>
    </div>
  );
};

export default AsideMessage;