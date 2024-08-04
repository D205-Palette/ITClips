import { useState } from "react";
import AsideMessage from "./AsideMessage";
import AsideMessageDetail from "./AsideMessageDetail";
import AsideStartNewMessage from "./AsideStartNewMessage";

// stores
import darkModeStore from "../../stores/darkModeStore";
import { asideStore } from "../../stores/asideStore";

const MessageLayout = () => {

  const [showInvite, setShowInvite] = useState(null);
  const isDark = darkModeStore(state => state.isDark);
  const selectedChat = asideStore(state => state.selectedChat);
  const isMessageOpen = asideStore(state => state.isMessageOpen);
  const setSelectedChat = asideStore(state => state.setSelectedChat);

  const handleSelectChat = (roomId: any) => {
    setSelectedChat(roomId);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
    setShowInvite(null);
  };
  
  // 새 채팅 초대 함수
  const handleNewChat = (state: any) => {
    setShowInvite(state);
  }

  // 새 채팅 시작 함수
  const handleChatStart = (chatId: any) => {
    // 현재 api 완료 안되서 채팅id로만 이동하는 흐름 정도만 구현
    handleBackToList();
    setSelectedChat(chatId);
  };

  if (!isMessageOpen) {
    return null;
  }

  return (
    <div className={`${ isDark ? "bg-base-300" : "bg-sky-100" } rounded-3xl w-80 h-[35rem]`}>
      {selectedChat === null && showInvite === null && (
        <AsideMessage onSelectChat={handleSelectChat} onShowInvite={handleNewChat} />
      )}
      {selectedChat !== null && showInvite === null && (
        <AsideMessageDetail chatId={selectedChat} onBack={handleBackToList} />
      )}
      {selectedChat === null && showInvite !== null && (
        <AsideStartNewMessage onStartChat={handleChatStart} onBack={handleBackToList} />
      )}
      {/* 둘다 값이 들어오는 경우는 없기 때문에 무시 (예외 처리) */}
    </div>
  );
};

export default MessageLayout;