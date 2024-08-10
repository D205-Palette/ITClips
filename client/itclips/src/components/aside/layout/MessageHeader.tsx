// MessageHeader.tsx 는 AsideMessage.tsx의 상단바 컴포넌트

import React from "react";

// icons
import { GoPlus } from "react-icons/go";

// components
import MessageCloseButton from "../ui/MessageCloseButton";

// stores
import { asideStore } from "../../../stores/asideStore";

interface MessageHeaderProps {
  onClickInvite: (state: number) => void;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ onClickInvite }) => {

  const toggleMessage = asideStore(state => state.toggleMessage)

  const handleBackToList = () => {
    toggleMessage();
  };

  return (
    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
      <MessageCloseButton onBack={toggleMessage} />
      <h2 className="text-xl font-bold dark:text-white">메세지</h2>
      <button 
        className="btn btn-ghost btn-circle hover:bg-sky-100 dark:hover:bg-gray-700 transition-colors duration-200" 
        onClick={() => onClickInvite(1)}
      >
        <GoPlus className="h-6 w-6 text-sky-500 dark:text-sky-400" />
      </button>
    </div>
  );
};

export default MessageHeader;