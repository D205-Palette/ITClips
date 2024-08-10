import React, { useState, useEffect, useRef } from "react";

// components
import AsideMessage from "./AsideMessage";
import AsideMessageDetail from "./AsideMessageDetail";
import AsideStartNewMessage from "./AsideStartNewMessage";

// stores
import darkModeStore from "../../stores/darkModeStore";
import { asideStore } from "../../stores/asideStore";
import { authStore } from "../../stores/authStore";
import { chatStore } from "../../stores/chatStore";

const MessageLayout = () => {

  const userInfo = authStore(state => state.userInfo);

  const [showInvite, setShowInvite] = useState(null);
  const isDark = darkModeStore(state => state.isDark);
  const selectedChat = asideStore(state => state.selectedChat);
  const isMessageOpen = asideStore(state => state.isMessageOpen);
  const toggleMessage = asideStore(state => state.toggleMessage);
  const setSelectedChat = asideStore(state => state.setSelectedChat);
  const { updateMessageStatus, resetMessageCount } = chatStore();

  const messageLayoutRef = useRef<HTMLDivElement>(null);

  // 바깥을 클릭했을 때 메세지창 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (messageLayoutRef.current && !messageLayoutRef.current.contains(event.target as Node)) {
        toggleMessage();  // 메시지창을 닫습니다.
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleMessage]);

  // 채팅방을 고르는 함수
  const handleSelectChat = (roomId: any) => {
    setSelectedChat(roomId);
  };

  // 그냥 뒤로가기
  const handleBackToList = () => {
    setSelectedChat(null);
    setShowInvite(null);
  };

  // AsideMessageDetail에서 뒤로가기 했을 때
  const handleBackToListFromAsideMessageDetail = (roomId: number) => {
    if (userInfo.id) {
      setSelectedChat(null);
      updateMessageStatus(roomId, userInfo.id);
      resetMessageCount(roomId);
    }
  }
  
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
    <div
      ref={messageLayoutRef}
      className="bg-base-100 rounded-lg w-96 h-[42rem] overflow-hidden shadow-xl transition-all duration-300 border border-gray-200"
    >
      <div className="w-full h-full overflow-hidden flex flex-col">
        {selectedChat === null && showInvite === null && (
          <AsideMessage
            onSelectChat={handleSelectChat}
            onShowInvite={handleNewChat}
          />
        )}
        {selectedChat !== null && showInvite === null && (
          <AsideMessageDetail
            roomId={selectedChat}
            onBack={handleBackToList}
            onBackWithRead={handleBackToListFromAsideMessageDetail}
          />
        )}
        {selectedChat === null && showInvite !== null && (
          <AsideStartNewMessage onStartChat={handleChatStart} onBack={handleBackToList} />
        )}
      </div>
    </div>
  );
};

export default MessageLayout;