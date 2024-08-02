// MessageContainer.tsx 는 AsideMessageDetail.tsx 에서 대화한 메세지들을 출력하는 컴포넌트

import React from "react";

interface Message {
  id: number;
  content: string;
  isSent?: boolean;
}

interface MessageContainerProps {
  messages: Message[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4">
      {messages.map((message: Message) => (
        <div key={message.id} className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs p-3 rounded-lg text-black ${message.isSent ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;