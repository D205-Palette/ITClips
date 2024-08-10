import React, { useRef, useCallback } from 'react';

// icons
import { FaEnvelope } from 'react-icons/fa';

// stores
import { asideStore } from '../../stores/asideStore';
import { chatStore } from '../../stores/chatStore';

const MessageButton = () => {       

  const toggleMessage = asideStore(state => state.toggleMessage);
  const totalUnreadCount = chatStore(state => state.totalUnreadCount);

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    toggleMessage();
  }, [toggleMessage]);

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        aria-label="Message"
      >
        <FaEnvelope className="transition-colors duration-300 hover:text-gray-400"/>
        {totalUnreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalUnreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default MessageButton;
