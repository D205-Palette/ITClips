import React from "react";

interface Message {
  id: number;
  title: string;
  subtitle: string;
  hasNotification?: boolean;
}

interface ChildComponentProps {
  messages: Message[];
  onClickMessage: (id: number) => any;
}

const MessageContainer: React.FC<ChildComponentProps> = ({ messages, onClickMessage }) => {
  return (
    <div>
      <ul className="space-y-4 h-[26rem] overflow-y-auto">
        {messages.map((message: Message) => (
          <li key={message.id} className="flex justify-between items-center bg-aside-layout rounded w-100 px-3 py-2" onClick={() => onClickMessage(message.id)}>
            <div className="p-3">
              <h3 className="font-semibold text-start">{message.title}</h3>
              <p className="text-sm text-gray-500 text-start message-content">{message.subtitle}</p>
            </div>
            {message.hasNotification && (
              <span className="badge badge-sm badge-error m-5"></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageContainer;