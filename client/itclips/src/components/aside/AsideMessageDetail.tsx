import React, { useState } from "react";

import MessageBackButton from "./items/MessageBackButton";
import MessageInviteButton from "./items/MessageInviteButton";
import MessageContainer from "./items/MessageContainer";

interface Message {
  id: number;
  content: string;
  isSent?: boolean;
}

// AsideMessage에서 id값을가지고 데이터를 꺼내서 라우터로 AsideMessageDetail 컴포넌트로 넘겨줌

const AsideMessageDetail = ({ chatId, onBack }: any) => {
  // chatId는 넘겨받아서 axios로 데이터 다시 호출
  // chatId나 다른 데이터 넘겨받아서 axios로 채팅 내용 호출받으면 됨
  
  // 더미 데이터
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: '안녕하세요!', isSent: false },
    { id: 2, content: '안녕하세요~', isSent: true },
    { id: 3, content: '왜 연락하셨나요?', isSent: true },
    { id: 4, content: '궁금한게 있습니다!', isSent: false },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // 메세지 전송 버튼을 눌렀을 때 동작
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, content: inputMessage, isSent: true }]);
      setInputMessage('');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto h-[36rem] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {/* 뒤로가기 버튼 */}
          <MessageBackButton onBack={ onBack }/>
          {/* 채팅 제목(상대유저 이름) */}
          <h2 className="text-xl font-bold ml-2">고양친구</h2>
        </div>
        {/* 초대하기 버튼 */}
        <MessageInviteButton />
      </div>
      {/* 채팅 메시지 영역 */}
      <MessageContainer messages={messages} />
      {/* 메시지 입력 영역 */}
      <div className="flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="메세지를 입력해주세요"
          className="input input-bordered flex-1 mr-2"
        />
        <button onClick={handleSendMessage} className="btn btn-primary">전송</button>
      </div>
    </div>
  );
};

export default AsideMessageDetail;