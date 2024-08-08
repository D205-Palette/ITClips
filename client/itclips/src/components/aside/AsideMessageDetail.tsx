// AsideMessageDetail.tsx 는 메세지창의 메세지 목록 중 하나를 클릭했을 때 그 메세지의 상세창 컴포넌트
import React, { useState, useEffect, useRef } from "react";
import { toZonedTime } from 'date-fns-tz';
import { format, addHours, parseISO } from 'date-fns';

// components
import MessageBackButton from "./ui/MessageBackButton";
import MessageContainer from "./layout/MessageContainer";
import AsideMessageKebabDropdown from "./ui/AsideMessageKebabDropdown";
import MessageInviteModal from "./modals/MessageInviteModal";

// apis
import { getChatRoomMessages, getChatRoomInfo, leaveChatRoom, updateMessageStatusToRead } from "../../api/messageApi";

// stores
import { authStore } from "../../stores/authStore";
import { useWebSocketStore } from "../../stores/webSocketStore";

interface Message {
  id: number;
  roomId: number;
  senderId: number;
  senderName: string;
  message: string;
  createdAt: string;
}

interface ChatRoomInfo {
  roomId: number;
  roomName: string;
  userTitles: {
    id: number;
    nickName: string;
  }[];
}

interface AsideMessageDetailProps {
  roomId: number;
  onBack: () => void;
}

// AsideMessage에서 id값을가지고 데이터를 꺼내서 라우터로 AsideMessageDetail 컴포넌트로 넘겨줌

const AsideMessageDetail: React.FC<AsideMessageDetailProps> = ({ roomId, onBack }) => {
  
  const userInfo = authStore(state => state.userInfo)
  
  const [ roomInfo, setRoomInfo ] = useState<ChatRoomInfo | null>(null);
  const [ inputMessage, setInputMessage  ] = useState('');
  const [ messages, setMessages ] = useState<Message[]>([]);
  const { isConnected, subscribe, stompClient } = useWebSocketStore();
  const [ notification, setNotification ] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [ isInviteModalOpen, setIsInviteModalOpen ] = useState(false);
  
  // 시간 형식 변경
  function formatDateToKST(date: string | Date): string {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    const kstDate = toZonedTime(parsedDate, 'Asia/Seoul');
    return format(kstDate, 'yyyy-MM-dd HH:mm:ss');
  }

  // 서버 시간에서 9시간을 추가하는 함수
  function addNineHours(dateString: string | null): string {
    if (!dateString) {
      console.warn("Invalid date string received:", dateString);
      return new Date().toISOString(); // 현재 시간을 반환하거나 다른 기본값 설정
    }
    try {
      const date = parseISO(dateString);
      const nineHoursLater = addHours(date, 9);
      return format(nineHoursLater, 'yyyy-MM-dd HH:mm:ss');
    } catch (error) {
      console.error("Error parsing date:", error);
      return new Date().toISOString(); // 오류 발생 시 현재 시간을 반환하거나 다른 기본값 설정
    }
  }

  // 메시지 컨테이너에 대한 ref 생성
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // 메시지 읽음 처리 함수
  const markMessagesAsRead = async () => {
    if (userInfo.id) {
      try {
        await updateMessageStatusToRead(roomId, userInfo.id);
        console.log("Messages marked as read");
      } catch (error) {
        console.error("Failed to mark messages as read:", error);
      }
    }
  };

  // 컴포넌트 마운트 시 메시지 읽음 처리
  useEffect(() => {
    markMessagesAsRead();
  
    return () => {
      // 컴포넌트 언마운트 시 동기적으로 실행되는 함수
      const markMessagesAsReadOnUnmount = () => {
        if (userInfo.id) {
          updateMessageStatusToRead(roomId, userInfo.id)
            .then(() => console.log("Messages marked as read on unmount"))
            .catch((error) => console.error("Failed to mark messages as read on unmount:", error));
        }
      };
  
      markMessagesAsReadOnUnmount();
    };
  }, [roomId, userInfo.id]);

  // 스크롤을 아래로 내리는 함수
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  // 현재 채팅방 정보 조회
  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        const response = await getChatRoomInfo(roomId);
        setRoomInfo(response.data);
      } catch (error) {
        console.error("채팅방 정보 불러오기 실패:", error);
      }
    };

    fetchRoomInfo();
  }, [roomId]);

  // 채팅방 나가기
  const handleLeaveChat = async () => {
    if (userInfo.id && roomInfo) {
      try {
        await leaveChatRoom(roomId, userInfo.id);
        setNotification({ message: `${roomInfo.roomName} 채팅방을 나갔습니다.`, type: 'success' });
        onBack(); // AsideMessage 창으로 이동
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

  // 메시지 내용 조회
  useEffect(() => {
    console.log(`채팅방 번호 : ${roomId}`);
    const fetchMessages = async () => {
      try {
        const response = await getChatRoomMessages(roomId);
        const updatedMessages = response.data
        .map((message: Message) => ({
          ...message,
          createdAt: addNineHours(message.createdAt)
        }))
        .filter((message: Message) => message.createdAt !== null)
        .sort((a: Message, b: Message) => b.id - a.id); // id 기준 내림차순 정렬
        setMessages(updatedMessages.reverse());
        setTimeout(scrollToBottom, 0);
      } catch (error) {
        console.error("메세지 불러오기 실패:", error);
      }
    };

    fetchMessages();
  }, [roomId]); // roomId가 변경될 때만 실행

  // 웹소켓 구독 관리
  useEffect(() => {
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
    if (isConnected && stompClient && roomId && userInfo.id && userInfo.nickname && inputMessage.trim()) {

      const now = new Date();

      // 현재 메시지 목록에서 가장 큰 id 값 찾기
      const maxId = messages.reduce((max, message) => Math.max(max, message.id), 0);
      const newMessageId = maxId + 1;

      const newMessage = {
        id: newMessageId,
        roomId: roomId,
        senderId: userInfo.id,
        senderName: userInfo.nickname,
        message: inputMessage.trim(),
        createdAt: formatDateToKST(now)
      };

      stompClient.publish({
        destination: `/api/pub/chat/message`,
        body: JSON.stringify(newMessage)
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
          <h2 className="text-xl font-bold ml-2 truncate flex-shrink min-w-0 max-w-[180px]">{roomInfo?.roomName}</h2>
        </div>
        {/* 더보기 버튼 */}
        <AsideMessageKebabDropdown
          roomId={roomId}
          onMenuItemClick={handleKebabMenuAction}
        />
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
        <button onClick={handleSendMessage} className="btn bg-sky-500 text-slate-100 hover:bg-sky-700">전송</button>
      </div>
      {/* 채팅방 초대 모달 */}
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
