// MessageHeader.tsx 는 AsideMessage.tsx의 상단바 컴포넌트

import React from "react";

// icons
import { FaPlus } from "react-icons/fa6";

interface MessageHeaderProps {
  onClickInvite: (state: number) => void;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ onClickInvite }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">메세지</h2>
      <button className="self-end btn btn-ghost btn-circle" onClick={ () => onClickInvite(1) }>
        <FaPlus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MessageHeader;