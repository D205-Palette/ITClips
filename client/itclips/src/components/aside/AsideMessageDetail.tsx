// AsideMessageDetail.tsx 는 메세지창의 메세지 목록 중 하나를 클릭했을 때 그 메세지의 상세창 컴포넌트
import React, { useState, useEffect, useRef } from "react";

// components
import MessageBackButton from "./ui/MessageBackButton";
import MessageInviteButton from "./ui/MessageInviteButton";
import MessageContainer from "./layout/MessageContainer";

// apis
import { getChatRoomMessages } from "../../api/messageApi";

// stores
import { authStore } from "../../stores/authStore";
import { useWebSocketStore } from "../../stores/webSocketStore";

interface Message {
  roomId: number;
  senderId: string;
  senderName: string;
  message: string;
  createdAt: string;
}

interface AsideMessageDetailProps {
  roomId: number;
  onBack: () => void;
}

// AsideMessage에서 id값을가지고 데이터를 꺼내서 라우터로 AsideMessageDetail 컴포넌트로 넘겨줌

const AsideMessageDetail: React.FC<AsideMessageDetailProps> = ({ roomId, onBack }) => {

  const userInfo = authStore(state => state.userInfo)
  
  const [ inputMessage, setInputMessage  ] = useState('');
  const [ messages, setMessages ] = useState<Message[]>([]);
  const { isConnected, subscribe, stompClient } = useWebSocketStore();
  const [ notification, setNotification ] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  // 메시지 컨테이너에 대한 ref 생성
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤을 아래로 내리는 함수
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  // 메세지 내용 조회
  useEffect(() => {
    console.log(`채팅방 번호 : ${roomId}`);
    const fetchMessages = async () => {
      try {
        const response = await getChatRoomMessages(roomId);
        // 받아온 메시지를 날짜 기준으로 오름차순 정렬 (오래된 메시지가 위로)
        const sortedMessages = response.data.sort((a: Message, b: Message) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        setMessages(sortedMessages);
        setTimeout(scrollToBottom, 0);
      } catch (error) {
        console.error("메세지 불러오기 실패:", error);
      }
    };

    fetchMessages();

    let unsubscribe: () => void = () => {};

    if (isConnected) {
      unsubscribe = subscribe(`/api/sub/chat/room/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        // 새 메시지를 배열의 끝에 추가
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setTimeout(scrollToBottom, 0);
      });
    }

    return () => {
      unsubscribe();
    };
  }, [roomId, isConnected, subscribe]);

  // 메세지 전송 버튼을 눌렀을 때 동작
  const handleSendMessage = () => {
    if (isConnected && stompClient && roomId && userInfo.id && inputMessage.trim()) {
      stompClient.publish({
        destination: `/api/pub/chat/message`,
        body: JSON.stringify({
          roomId: roomId,
          senderId: userInfo.id,
          senderName: userInfo.nickname,
          message: inputMessage.trim()
        })
      });
      setInputMessage('');
    } else {
      alert('메시지를 전송할 수 없습니다. 연결 상태를 확인해주세요.');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto h-[35rem] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {/* 뒤로가기 버튼 */}
          <MessageBackButton onBack={ onBack }/>
          {/* 채팅 제목(상대유저 이름) */}
          <h2 className="text-xl font-bold ml-2">고양친구</h2>
        </div>
        {/* 초대하기 버튼 */}
        <MessageInviteButton roomId={roomId} setNotification={setNotification} />
      </div>
      {/* 채팅 메시지 영역 */}
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E0 #EDF2F7"
        }}
      >
        <MessageContainer messages={messages} />
      </div>
      {/* 메시지 입력 영역 */}
      <div className="flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="메세지를 입력해주세요"
          className="input input-bordered flex-1 mr-2"
        />
        <button onClick={handleSendMessage} className="btn btn-primary">전송</button>
      </div>

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
