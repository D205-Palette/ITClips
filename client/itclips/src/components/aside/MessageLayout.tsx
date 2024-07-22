import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AsideMessage from "./AsideMessage";
import AsideMessageDetail from "./AsideMessageDetail";

const MessageLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ selectedChat, setSelectedChat ] = useState(null);

  const handleSelectChat = (chatId: any) => {
    setSelectedChat(chatId);
    navigate(`/messages/${chatId}`, { replace: false });
  };

  const handleBackToList = () => {
    setSelectedChat(null);
    navigate("/messages");
  };

  return (
    <div>
      {!selectedChat ? (
        <AsideMessage onSelectChat={handleSelectChat} />
      ) : (
        <AsideMessageDetail chatId={selectedChat} onBack={handleBackToList} />
      )}
    </div>
  );
};

export default MessageLayout;