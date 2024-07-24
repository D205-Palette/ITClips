// MessageLayout은 AsideMessage.tsx, AsideMessageDetail.tsx, AsideStartNewMessage.tsx를 묶어주는 역할

import { useState } from "react";

// components
import AsideMessage from "./AsideMessage";
import AsideMessageDetail from "./AsideMessageDetail";
import AsideStartNewMessage from "./AsideStartNewMessage";

const MessageLayout = () => {

  const [ selectedChat, setSelectedChat ] = useState(null);
  const [ showInvite, setShowInvite ] = useState(null);

  const handleSelectChat = (chatId: any) => {
    setSelectedChat(chatId);
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

  return (
    // selectedChat은 선택된 메세지 창이 있을 때 값이 들어간다
    // showInvite는 메세지 목록 화면에서 + 버튼을 눌렀을 때 값이 들어간다
    // 아래 조건은 아무것도 안했을 때 채팅목록을
    // 채팅 목록 중 하나를 클릭했을때 채팅 상세 페이지로
    // 채팅 목록에서 + 버튼을 눌렀을 때 새 채팅 화면으로 이동하도록 조건
    <div className="bg-white">
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