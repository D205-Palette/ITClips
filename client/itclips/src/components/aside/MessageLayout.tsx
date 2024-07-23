import { useState } from "react";
import AsideMessage from "./AsideMessage";
import AsideMessageDetail from "./AsideMessageDetail";

const MessageLayout = () => {

  const [ selectedChat, setSelectedChat ] = useState(null);

  const handleSelectChat = (chatId: any) => {
    setSelectedChat(chatId);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  return (
    <div className="bg-white">
      {!selectedChat ? (
        <AsideMessage onSelectChat={handleSelectChat} />
      ) : (
        <AsideMessageDetail chatId={selectedChat} onBack={handleBackToList} />
      )}
    </div>
  );
};

export default MessageLayout;