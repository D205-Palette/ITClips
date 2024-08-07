// AsideMessageDetail.tsx 는 메세지창의 메세지 목록 중 하나를 클릭했을 때 그 메세지의 상세창 컴포넌트
import React, { useState, useEffect } from "react";

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

  // 메세지 내용 조회
  useEffect(() => {
    console.log(`채팅방 번호 : ${roomId}`);
    const fetchMessages = async () => {
      try {
        const response = await getChatRoomMessages(roomId);
        setMessages(response.data);
      } catch (error) {
        console.error("메세지 불러오기 실패:", error);
      }
    };

    fetchMessages();

    let unsubscribe: () => void = () => {};

    if (isConnected) {
      unsubscribe = subscribe(`/api/sub/chat/room/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
    }

    return () => {
      unsubscribe();
    };
  }, [roomId, isConnected, stompClient]);

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
        <MessageInviteButton />
      </div>
      {/* 채팅 메시지 영역 */}
      <MessageContainer messages={messages} />
      {/* 메시지 입력 영역 */}
      <div className="flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="메세지를 입력해주세요"
          className="input input-bordered flex-1 mr-2"
        />
        <button onClick={handleSendMessage} className="btn bg-sky-500 text-slate-100 hover:bg-sky-700">전송</button>
      </div>
    </div>
  );
};

export default AsideMessageDetail;
