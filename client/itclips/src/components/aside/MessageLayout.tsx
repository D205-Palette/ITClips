import React, { useState, useEffect, useRef, useCallback } from "react";

// components
import AsideMessage from "./AsideMessage";
import AsideMessageDetail from "./AsideMessageDetail";
import AsideStartNewMessage from "./AsideStartNewMessage";

// stores
import { asideStore } from "../../stores/asideStore";
import { authStore } from "../../stores/authStore";
import { chatStore } from "../../stores/chatStore";

const MessageLayout = () => {

  const userInfo = authStore(state => state.userInfo);

  const [showInvite, setShowInvite] = useState(null);
  const selectedChat = asideStore(state => state.selectedChat);
  const isMessageOpen = asideStore(state => state.isMessageOpen);
  const toggleMessage = asideStore(state => state.toggleMessage);
  const setSelectedChat = asideStore(state => state.setSelectedChat);
  const { updateMessageStatus, resetMessageCount } = chatStore();

  const messageLayoutRef = useRef<HTMLDivElement>(null);

  // 바깥을 클릭했을 때 메세지창 닫기
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (messageLayoutRef.current && !messageLayoutRef.current.contains(event.target as Node)) {
      const messageButton = document.querySelector('button[aria-label="Message"]');
      if (messageButton && !messageButton.contains(event.target as Node)) {
        // 의도적인 지연 추가
        setTimeout(() => {
          toggleMessage();
        }, 0);
      }
    }
  }, [toggleMessage]);

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (isMessageOpen) {
        handleClickOutside(event);
      }
    };

    // 캡처 단계에서 이벤트 처리
    document.addEventListener('mousedown', handleGlobalClick, true);

    return () => {
      document.removeEventListener('mousedown', handleGlobalClick, true);
    };
  }, [isMessageOpen, handleClickOutside]);

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
  const handleChatStart = (roomId: any) => {
    handleBackToList();
    setSelectedChat(roomId);
  };

  if (!isMessageOpen) {
    return null;
  }

  return (
    <div
      ref={messageLayoutRef}
      className="bg-base-100 w-full h-[calc(100vh-var(--navbar-height)-5rem)] md:h-[42rem] overflow-hidden shadow-xl transition-all duration-300 border border-gray-200 md:w-96 md:rounded-3xl"
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