// AsideMessage.tsx 는 메세지 컴포넌트 메인
import React, { useEffect, useRef } from "react";

// components
import MessageHeader from "./layout/MessageHeader";
import ChatRoomListContainer from "./layout/ChatRoomListContainer";

// stores
import { authStore } from "../../stores/authStore";
import { useWebSocketStore } from "../../stores/webSocketStore";
import { chatStore } from "../../stores/chatStore";

// 채팅방 인터페이스
interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string | null;
  lastModified: string | null;
  messageCnt: number;
}

interface Message {
  id: number;
  roomId: number;
  senderId: number;
  senderName: string;
  message: string;
  createdAt: string;
}

interface MessageListProps {
  onSelectChat: (id: number) => void;
  onShowInvite: (state: number) => void;
}

const AsideMessage: React.FC<MessageListProps> = ({ onSelectChat, onShowInvite }) => {

  const userId = authStore(state => state.userId);
  const { stompClient, isConnected } = useWebSocketStore();
  const { rooms, fetchRooms, updateRoom } = chatStore();

  // 구독 정보를 저장할 ref
  const subscriptions = useRef<{ [key: number]: { unsubscribe: () => void } }>({});

  useEffect(() => {
    fetchRooms(userId);
  }, [userId, fetchRooms]);

  useEffect(() => {
    if (isConnected && stompClient) {
      subscribeToRooms(rooms);
    }
    
    return () => {
      // 컴포넌트 언마운트 시 안전하게 구독 해제
      Object.values(subscriptions.current).forEach(subscription => {
        try {
          subscription.unsubscribe();
        } catch (error) {
          console.error('Error unsubscribing:', error);
        }
      });
      subscriptions.current = {};
    };
  }, [isConnected, rooms, stompClient]);

  // 채팅방 연결 함수
  const subscribeToRooms = (rooms: ChatRoom[]) => {
    if (stompClient && isConnected) {
      rooms.forEach(room => {
        if (!subscriptions.current[room.id]) {
          const subscription = stompClient.subscribe(`/api/sub/chat/room/${room.id}`, (message) => {
            const messageBody = JSON.parse(message.body) as Message;
            updateRoomInfo(room.id, messageBody);
          });
          subscriptions.current[room.id] = subscription;
        }
      });
    } else {
      console.error('Unable to subscribe: STOMP client not connected');
    }
  };

  // 채팅방 정보 업데이트
  const updateRoomInfo = (roomId: number, message: Message) => {
    updateRoom(roomId, {
      lastMessage: message.message,
      lastModified: message.createdAt,
      messageCnt: (rooms.find(room => room.id === roomId)?.messageCnt || 0) + 1
    });
  };

  const onClickMessage = (roomId: number) => {
    // 해당 메세지 대화창으로 이동하게 구현하기
    onSelectChat(roomId);
  }

  const onClickInvite = (state: number) => {
    onShowInvite(state);
  }

  return (
    <div className="p-4 max-w-sm mx-auto h-[35rem] flex flex-col">
      {/* 메세지 헤더 영역 */}
      <MessageHeader onClickInvite={onClickInvite} />
      {/* 받은 메세지 영역 */}
      <ChatRoomListContainer 
        rooms={rooms} // 직접 data를 전달
        onClickMessage={onClickMessage}
      />
    </div>
  );
};

export default AsideMessage;