// AsideMessage.tsx 는 메세지 컴포넌트 메인
import React, { useState, useEffect } from "react";

// components
import MessageHeader from "./layout/MessageHeader";
import MessageListContainer from "./layout/MessageListContainer";

// apis
import { getChatRooms } from "../../api/messageApi";

// stores
import { authStore } from "../../stores/authStore";
import { useWebSocketStore } from "../../stores/webSocketStore";

// 채팅방 인터페이스
interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string | null;
  lastModified: string | null;
}

interface MessageListProps {
  onSelectChat: (id: number) => void;
  onShowInvite: (state: number) => void;
}

const AsideMessage: React.FC<MessageListProps> = ({ onSelectChat, onShowInvite }) => {

  const userId = authStore(state => state.userId);
  const [data, setData] = useState<ChatRoom[]>([]);
  const { stompClient, isConnected } = useWebSocketStore();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await getChatRooms(userId); // 사용자 채팅방 목록 가져오기
        setData(response.data); // API에서 반환된 데이터의 data 속성 사용
        subscribeToRooms(response.data);
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchChatRooms(); // 채팅방 목록 가져오기

    // isConnected가 true가 되면 구독을 시도합니다.
    if (isConnected) {
      subscribeToRooms(data);
    }

  }, [userId, isConnected]); // userId가 변경될 때마다 실행

  // 채팅방 연결 함수
  const subscribeToRooms = (rooms: ChatRoom[]) => {
    if (stompClient && isConnected) {
      rooms.forEach(room => {
        stompClient.subscribe(`/api/sub/chat/room/${room.id}`, (message) => {
          console.log('Message received:', message);
          const messageBody = JSON.parse(message.body);
          console.log('Received message:', messageBody);
          updateRoomLastMessage(room.id, messageBody.message);
        });
        console.log(`Subscribed to room: ${room.id}`);
      });
    } else {
      console.error('Unable to subscribe: STOMP client not connected');
    }
  };

  const updateRoomLastMessage = (roomId: number, lastMessage: string) => {
    setData(prevData => prevData.map(room => 
      room.id === roomId ? { ...room, lastMessage: lastMessage } : room
    ));
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
      <MessageListContainer 
        rooms={data.map(room => ({
          id: room.id,
          title: room.name,
          subtitle: room.lastMessage || '메시지가 없습니다.', // 마지막 메시지가 없을 경우 기본 메시지
        }))}
        onClickMessage={onClickMessage}
      />
    </div>
  );
};

export default AsideMessage;