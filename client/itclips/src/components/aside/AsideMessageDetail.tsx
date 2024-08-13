// AsideMessageDetail.tsx 는 메세지창의 메세지 목록 중 하나를 클릭했을 때 그 메세지의 상세창 컴포넌트
import React, { useState, useEffect, useRef, useCallback } from "react";

// components
import MessageBackButton from "./ui/MessageBackButton";
import MessageContainer from "./layout/MessageContainer";
import AsideMessageKebabDropdown from "./ui/AsideMessageKebabDropdown";
import MessageInviteModal from "./modals/MessageInviteModal";

// stores
import { authStore } from "../../stores/authStore";
import { webSocketStore } from "../../stores/webSocketStore";
import { chatStore } from "../../stores/chatStore";
import darkModeStore from "../../stores/darkModeStore";
import toastStore from "../../stores/toastStore";

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
  const isDark = darkModeStore(state => state.isDark);
  const { globalNotification, setGlobalNotification } = toastStore();
  const { isConnected, stompClient } = webSocketStore();
  const { 
    currentRoomMessages, 
    currentRoomInfo, 
    fetchMessages, 
    fetchRoomInfo, 
    updateMessageStatus, 
    resetMessageCount,
    addMessage,
    leaveRoom,
    clearMessages,
    setCurrentRoomId
  } = chatStore();

  const [ inputMessage, setInputMessage ] = useState('');
  const [ notification, setNotification ] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [ isInviteModalOpen, setIsInviteModalOpen ] = useState(false);
  const [ isInputFocused, setIsInputFocused ] = useState(false);
  const updateStatusRef = useRef<(() => void) | null>(null); // 최신 updateReadStatus 함수를 참조하는 ref
  const inputRef = useRef<HTMLInputElement>(null);
  const [ isLoading, setIsLoading ] = useState(true);

  // 컴포넌트 마운트 시 입력 필드에 포커스
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 메세지 읽음 상태를 업데이트
  const updateReadStatus = useCallback(async () => {
    if (userInfo?.id) {
      try {
        await updateMessageStatus(roomId, userInfo.id);
      } catch (error) {
        console.error("Failed to update message status:", error);
      }
    }
  }, [roomId, userInfo?.id, updateMessageStatus]);

  // updateStatusRef.current를 최신 updateReadStatus 함수로 업데이트
  useEffect(() => {
    updateStatusRef.current = updateReadStatus;
  }, [updateReadStatus]);

  // 컴포넌트 언마운트 시 이벤트 리스너 제거 및 읽음 상태 업데이트
  useEffect(() => {
    const handleBeforeUnload = () => {
      updateStatusRef.current?.();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      updateStatusRef.current?.();
    };
  }, []);
  
  // 메시지 컨테이너에 대한 ref 생성
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  // 스크롤을 아래로 내리는 함수
  const scrollToBottom = useCallback(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, []);

  // 마운트 됐을 때 처음에 채팅방 정보 가져오기
  useEffect(() => {
    setIsLoading(true);
    clearMessages();
    setCurrentRoomId(roomId);
    
    const fetchData = async () => {
      if (userInfo && userInfo.id !== undefined) {
        await fetchMessages(roomId);
        await fetchRoomInfo(roomId);
        await updateMessageStatus(roomId, userInfo.id);
        resetMessageCount(roomId);
      } else {
        console.warn("User ID is undefined. Skipping data fetch and status update.");
      }
    };

    const timer = setTimeout(() => {
      fetchData().then(() => {
        setIsLoading(false);
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      if (userInfo && userInfo.id !== undefined) {
        updateMessageStatus(roomId, userInfo.id);
      }
      setCurrentRoomId(null);
    };
  }, [roomId, userInfo, fetchMessages, fetchRoomInfo, updateMessageStatus, resetMessageCount, clearMessages, setCurrentRoomId]);

  // 뒤로가기 버튼 클릭 핸들러 (읽음 상태 업데이트 후 onBackWithRead 호출)
  const handleBackClick = useCallback(() => {
    updateReadStatus().then(() => {
      onBackWithRead(roomId);
    });
  }, [updateReadStatus, onBackWithRead, roomId]);

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

  // 스크롤 아래로 내리기
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
    // 메시지가 비어있으면 함수 종료
    if (!inputMessage.trim()) {
      return;
    }

    // 나머지 조건 확인 및 메시지 전송 로직
    if (isConnected && stompClient && roomId && userInfo.id && userInfo.nickname) {
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
      setGlobalNotification({
        message: `메시지를 전송할 수 없습니다. 연결 상태를 확인해주세요.`,
        type: "error",
      });      
    }
  };

  return (
    <div className="flex flex-col h-full">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full bg-base-100">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="text-lg font-semibold mt-4 text-base-content">채팅방 로딩 중...</p>
          <p className="text-sm mt-2 text-base-content/70">잠시만 기다려 주세요</p>
        </div>
      ) : (
        <>
          <div className={`${ isDark ? "bg-base-200" : "bg-sky-200" } flex justify-between items-center p-4 border-b`}>
            <div className="flex items-center">
              <MessageBackButton onBack={handleBackClick} />
              <h2 className="text-xl font-bold ml-2 truncate flex-shrink min-w-0 max-w-[180px]">{currentRoomInfo?.roomName}</h2>
            </div>
            <AsideMessageKebabDropdown
              roomId={roomId}
              onMenuItemClick={handleKebabMenuAction}
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <MessageContainer messages={currentRoomMessages} />
          </div>
          <div className="p-4 bg-base-100 border-t border-gray-200">
            <div className="flex items-center w-full">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="메세지를 입력해주세요"
                className="input input-bordered flex-grow mr-2 min-w-0"
              />
              <button onClick={handleSendMessage} className="btn bg-sky-500 text-slate-100 hover:bg-sky-700 whitespace-nowrap">전송</button>
            </div>
          </div>
        </>
      )}
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
