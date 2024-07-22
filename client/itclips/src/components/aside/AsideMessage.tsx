import React, { useState } from "react";

import MessageHeader from "./items/MessageHeader";
import MessageContainer from "./items/MessageContainer";

interface MessageListProps {
  onSelectChat: (id: number) => void;
}

const MessageList: React.FC<MessageListProps> = ({ onSelectChat }) => {

  // 더미 데이터
  const [ data ] = useState([
    { id: 1, title: '고양친구', subtitle: '궁금한게 있습니다' },
    { id: 2, title: '고양친구의친구', subtitle: '누구세요??' },
    { id: 3, title: '고양친구, 고양양', subtitle: '감사합니다', hasNotification: true },
    { id: 4, title: '고양친구, 고양양', subtitle: '왕감사', hasNotification: true },
    { id: 5, title: '고양친구, 고양양', subtitle: '찐감사', hasNotification: true },
    { id: 6, title: '고양친구, 고양양', subtitle: '너무감사', hasNotification: true },
    { id: 7, title: '고양친구, 고양양', subtitle: '완전감사', hasNotification: true },
  ]);

  // const addMessage = (newMassage: Message) => {
  //   setData(prevMessage => [...prevMessage, newMassage]);
  // }

  const onClickMessage = (id: number) => {
    // 해당 메세지 대화창으로 이동하게 구현하기 (라우터 이용해서 구현)
    onSelectChat(id);
  }

  return (
    <div className="rounded-3xl w-80 p-8 flex flex-col items-center">
      {/* 메세지 헤더 영역 */}
      <MessageHeader />
      {/* 받은 메세지 영역 */}
      <MessageContainer 
        messages = { data }
        onClickMessage = { onClickMessage }
      />
    </div>
  );
};

export default MessageList;