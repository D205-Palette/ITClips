import React, { useState } from 'react';

// AsideMessage에서 id값을가지고 데이터를 꺼내서 라우터로 AsideMessageDetail 컴포넌트로 넘겨줌

const AsideMessageDetail = ({ chatId, onBack }: any) => {
  // chatId는 넘겨받아서 axios로 데이터 다시 호출
  // chatId나 다른 데이터 넘겨받아서 axios로 채팅 내용 호출받으면 됨
  
  // 더미 데이터
  const [messages, setMessages] = useState([
    { id: 1, text: '안녕하세요!', isSent: false },
    { id: 2, text: '안녕하세요~', isSent: true },
    { id: 3, text: '왜 연락하셨나요?', isSent: true },
    { id: 4, text: '궁금한게 있습니다!', isSent: false },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // 메세지 전송 버튼을 눌렀을 때 동작
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputMessage, isSent: true }]);
      setInputMessage('');
    }
  };

  return (
    <div className="bg-aside-layout p-4 max-w-sm mx-auto h-[32rem] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button className="btn btn-ghost btn-circle" onClick={onBack}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-bold ml-2">고양친구</h2>
        </div>
        <button className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      
      {/* 채팅 메시지 영역 */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-3 rounded-lg ${message.isSent ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
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