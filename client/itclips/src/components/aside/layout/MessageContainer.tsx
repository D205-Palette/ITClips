// MessageContainer.tsx 는 AsideMessageDetail.tsx 에서 대화한 메세지들을 출력하는 컴포넌트
import React from "react";

// stores
import { authStore } from "../../../stores/authStore";

interface Message {
  roomId: number;
  senderId: string;
  senderName: string;
  message: string;
  createdAt: string;
}

interface MessageContainerProps {
  messages: Message[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messages }) => {

  const userInfo = authStore(state => state.userInfo);

  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 flex flex-col">
      {messages.map((message: Message, index: number) => {
        const isMyMessage = message.senderName === userInfo.nickname;
        return (
          <div key={index} className={`chat ${isMyMessage ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-header">
              {message.senderName}
              <time className="text-xs opacity-50 ml-1">
                {message.createdAt}
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