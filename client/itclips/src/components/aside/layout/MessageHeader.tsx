// MessageHeader.tsx 는 AsideMessage.tsx의 상단바 컴포넌트

import React from "react";

// icons
import { GoPlus } from "react-icons/go";

// components
import MessageCloseButton from "../ui/MessageCloseButton";

// stores
import { asideStore } from "../../../stores/asideStore";
import darkModeStore from "../../../stores/darkModeStore";

interface MessageHeaderProps {
  onClickInvite: (state: number) => void;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ onClickInvite }) => {

  const toggleMessage = asideStore(state => state.toggleMessage)
  const isDark = darkModeStore(state => state.isDark);

  return (
    <div className={`${ isDark ? "bg-base-200" : "bg-sky-200" } flex justify-between items-center p-4 border-b border-gray-200`}>
      <MessageCloseButton onBack={toggleMessage} />
      <h2 className="text-xl font-bold">메세지</h2>
      <button 
        className="btn btn-ghost btn-circle hover:bg-sky-100 transition-colors duration-200" 
        onClick={() => onClickInvite(1)}
      >
        <GoPlus className="h-6 w-6 text-sky-500" />
      </button>
    </div>
  );
};

export default MessageHeader;