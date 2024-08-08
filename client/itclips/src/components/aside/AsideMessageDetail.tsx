// AsideMessageDetail.tsx 는 메세지창의 메세지 목록 중 하나를 클릭했을 때 그 메세지의 상세창 컴포넌트
import React, { useState, useEffect, useRef, useCallback } from "react";
// components
import MessageBackButton from "./ui/MessageBackButton";
import MessageContainer from "./layout/MessageContainer";
import AsideMessageKebabDropdown from "./ui/AsideMessageKebabDropdown";
import MessageInviteModal from "./modals/MessageInviteModal";

// stores
import { authStore } from "../../stores/authStore";
import { useWebSocketStore } from "../../stores/webSocketStore";
import { chatStore } from "../../stores/chatStore";

interface AsideMessageDetailProps {
  roomId: number;
  onBack: () => void;
  onBackWithRead: (roomId: number) => void;
}

interface Message {
  id: number;
  roomId: number;
  senderId: number;
  senderName: string;
  message: string;
  createdAt: string;
}

// AsideMessage에서 id값을가지고 데이터를 꺼내서 라우터로 AsideMessageDetail 컴포넌트로 넘겨줌

const AsideMessageDetail: React.FC<AsideMessageDetailProps> = ({ roomId, onBack, onBackWithRead }) => {
  
  const userInfo = authStore(state => state.userInfo);

  const { isConnected, stompClient } = useWebSocketStore();
  const { 
    currentRoomMessages, 
    currentRoomInfo, 
    fetchMessages, 
    fetchRoomInfo, 
    updateMessageStatus, 
    resetMessageCount,
    addMessage,
    leaveRoom
  } = chatStore();

  const [ inputMessage, setInputMessage ] = useState('');
  const [ notification, setNotification ] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [ isInviteModalOpen, setIsInviteModalOpen ] = useState(false);
  const [ isInputFocused, setIsInputFocused ] = useState(false);
  
  // 메시지 컨테이너에 대한 ref 생성
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  // 스크롤을 아래로 내리는 함수
  const scrollToBottom = useCallback(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    fetchMessages(roomId);
    fetchRoomInfo(roomId);
    
    const updateStatus = () => {
      if (userInfo && userInfo.id !== undefined) {
        updateMessageStatus(roomId, userInfo.id);
        resetMessageCount(roomId);
      } else {
        console.warn("User ID is undefined. Skipping message status update.");
      }
    };
  
    updateStatus();
  
    return () => {
      // 컴포넌트 언마운트 시에는 현재 채팅방의 읽음 처리만 수행
      if (userInfo && userInfo.id !== undefined) {
        updateMessageStatus(roomId, userInfo.id);
      }
    };
  }, [roomId, userInfo, fetchMessages, fetchRoomInfo, updateMessageStatus, resetMessageCount]);

  // 뒤로가기 버튼 클릭 핸들러
  const handleBackClick = () => {
    onBackWithRead(roomId);  // 읽음 처리와 함께 뒤로가기
  };

  // 엔터 키 입력 처리 함수
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && isInputFocused) {
      event.preventDefault(); // 기본 엔터 동작 방지
      handleSendMessage();
    }
  };

  // input 포커스 상태 변경 함수
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentRoomMessages, scrollToBottom]);

  // 채팅방 나가기
  const handleLeaveChat = async () => {
    if (userInfo.id && currentRoomInfo) {
      try {
        await leaveRoom(roomId, userInfo.id);
        setNotification({ message: `${currentRoomInfo.roomName} 채팅방을 나갔습니다.`, type: 'success' });
        onBack();
      } catch (error) {
        console.error("채팅방 나가기 실패:", error);
        setNotification({ message: "채팅방을 나가는데 실패했습니다.", type: 'error' });
      }
    }
  };

  const handleKebabMenuAction = (action: string) => {
    if (action === "초대하기") {
      setIsInviteModalOpen(true);
    } else if (action === "채팅방 나가기") {
      handleLeaveChat();
    }
  };

  const handleCloseInviteModal = () => {
    setIsInviteModalOpen(false);
  };

  // 메세지 전송 버튼을 눌렀을 때 동작
  const handleSendMessage = () => {
    if (isConnected && stompClient && roomId && userInfo.id && userInfo.nickname && inputMessage.trim()) {
      const now = new Date();
      const lastMessageId = currentRoomMessages.length > 0 
        ? Math.max(...currentRoomMessages.map(m => m.id))
        : 0;
      
      const newMessage = {
        id: lastMessageId + 1, // ID를 number 타입으로 생성
        roomId: roomId,
        senderId: userInfo.id,
        senderName: userInfo.nickname,
        message: inputMessage.trim(),
        createdAt: now.toISOString()
      };

      stompClient.publish({
        destination: `/api/pub/chat/message`,
        body: JSON.stringify(newMessage)
      });
      
      addMessage(newMessage);
      setInputMessage('');
    } else {
      alert('메시지를 전송할 수 없습니다. 연결 상태를 확인해주세요.');
    }
  };

  const handleNewMessage = useCallback((message: Message) => {
    addMessage(message);
  }, [addMessage]);

  useEffect(() => {
    fetchMessages(roomId);
    fetchRoomInfo(roomId);
    
    if (isConnected && stompClient) {
      const subscription = stompClient.subscribe(`/api/sub/chat/room/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        handleNewMessage(newMessage);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [roomId, fetchMessages, fetchRoomInfo, isConnected, stompClient, handleNewMessage]);

  return (
    <div className="p-4 max-w-sm mx-auto h-[35rem] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <MessageBackButton onBack={handleBackClick} />
          <h2 className="text-xl font-bold ml-2 truncate flex-shrink min-w-0 max-w-[180px]">{currentRoomInfo?.roomName}</h2>
        </div>
        <AsideMessageKebabDropdown
          roomId={roomId}
          onMenuItemClick={handleKebabMenuAction}
        />
      </div>
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E0 #EDF2F7"
        }}
      >
        <MessageContainer messages={currentRoomMessages} />
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="메세지를 입력해주세요"
          className="input input-bordered flex-1 mr-2"
        />
        <button onClick={handleSendMessage} className="btn bg-sky-500 text-slate-100 hover:bg-sky-700">전송</button>
      </div>
      {isInviteModalOpen && (
        <MessageInviteModal
          roomId={roomId}
          setNotification={setNotification}
          onClose={handleCloseInviteModal}
          isOpen={isInviteModalOpen}
        />
      )}
      {notification && (
        <div 
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white shadow-lg z-50 transition-opacity duration-300`}
          style={{
            opacity: notification ? 1 : 0,
            visibility: notification ? 'visible' : 'hidden',
          }}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default AsideMessageDetail;
