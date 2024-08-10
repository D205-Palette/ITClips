// MessageContainer.tsx 는 AsideMessageDetail.tsx 에서 대화한 메세지들을 출력하는 컴포넌트
import React, { useRef, useState, useEffect } from "react";
import { format, addHours, isAfter, subHours } from 'date-fns';

// icons
import { FaChevronUp, FaChevronDown  } from "react-icons/fa6";

// stores
import { authStore } from "../../../stores/authStore";

interface Message {
  id: number;
  roomId: number;
  senderId: number;
  senderName: string;
  message: string;
  createdAt: string;
}

interface MessageContainerProps {
  messages: Message[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messages }) => {

  const userInfo = authStore(state => state.userInfo);

  const containerRef = useRef<HTMLDivElement>(null);
  const [showTopArrow, setShowTopArrow] = useState(false);
  const [showBottomArrow, setShowBottomArrow] = useState(false);

  // 새 메세지, 오래된 메세지 시간 변환(출력만)
  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const nineHoursAgo = subHours(now, 9);
    
    if (isAfter(date, nineHoursAgo)) {
      return format(date, 'HH:mm');
    } else {
      const kstDate = addHours(date, 9);
      return format(kstDate, 'HH:mm');
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isAtTop = scrollTop === 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;

      setShowTopArrow(!isAtTop);
      setShowBottomArrow(!isAtBottom);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [messages]);

  useEffect(() => {
    // 새 메시지가 추가되면 스크롤을 맨 아래로 이동
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    handleScroll(); // 스크롤 위치 변경 후 화살표 상태 업데이트
  }, [messages]);

  return (
    <div className="flex flex-col h-full relative">
      {showTopArrow && (
        <div className="absolute top-0 left-0 right-0 flex justify-center bg-gradient-to-b from-base-100 to-transparent py-2 z-10">
          <FaChevronUp className="text-gray-400" size={20} />
        </div>
      )}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto scrollbar-hide space-y-4 p-4"
        onScroll={handleScroll}
      >
        {messages.map((message: Message) => {
          const isMyMessage = message.senderName === userInfo.nickname;
          return (
            <div key={`${message.id}-${message.createdAt}`} className={`chat ${isMyMessage ? 'chat-end' : 'chat-start'} w-full`}>
              <div className="chat-header mb-2">
                {message.senderName}
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className={`chat-bubble ${isMyMessage ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-800'} break-words max-w-[90%] whitespace-pre-wrap overflow-hidden`}>
                {message.message}
              </div>
            </div>
          );
        })}
      </div>
      {showBottomArrow && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-base-100 to-transparent py-2 z-10">
          <FaChevronDown className="text-gray-400" size={20} />
        </div>
      )}
    </div>
  );
};

export default MessageContainer;