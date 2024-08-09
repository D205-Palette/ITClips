// MessageContainer.tsx 는 AsideMessageDetail.tsx 에서 대화한 메세지들을 출력하는 컴포넌트
import React from "react";
import { format, addHours, isAfter, subHours } from 'date-fns';

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

  // 새 메세지, 오래된 메세지 시간 변환
  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const nineHoursAgo = subHours(now, 9);
    
    if (isAfter(date, nineHoursAgo)) {
      return format(date, 'yyyy-MM-dd HH:mm');
    } else {
      const kstDate = addHours(date, 9);
      return format(kstDate, 'yyyy-MM-dd HH:mm');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 flex flex-col">
      {messages.map((message: Message) => {
        const isMyMessage = message.senderName === userInfo.nickname;
        return (
          <div key={`${message.id}-${message.createdAt}`} className={`chat ${isMyMessage ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-header">
              {message.senderName}
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className={`chat-bubble ${isMyMessage ? 'bg-sky-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
              {message.message}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageContainer;