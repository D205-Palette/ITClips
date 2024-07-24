// AsideMessage.tsx 는 메세지 컴포넌트 메인

import React, { useState } from "react";

// components
import MessageHeader from "./layout/MessageHeader";
import MessageListContainer from "./layout/MessageListContainer";

interface MessageListProps {
  onSelectChat: (id: number) => void;
  onShowInvite: (state: number) => void;
}

const MessageList: React.FC<MessageListProps> = ({ onSelectChat, onShowInvite }) => {

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
    // 해당 메세지 대화창으로 이동하게 구현하기
    onSelectChat(id);
  }

  const onClickInvite = (state: number) => {
    onShowInvite(state);
  }

  return (
    <div className="rounded-3xl w-80 p-8 flex flex-col">
      {/* 메세지 헤더 영역 */}
      <MessageHeader onClickInvite = { onClickInvite } />
      {/* 받은 메세지 영역 */}
      <MessageListContainer 
        messages = { data }
        onClickMessage = { onClickMessage }
      />
    </div>
  );
};

export default MessageList;