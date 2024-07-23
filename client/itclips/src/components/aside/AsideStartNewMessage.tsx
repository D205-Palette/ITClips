import React, { useState } from "react";

import MessageBackButton from "./items/MessageBackButton";

// 창의 상태를 저장하는 부모컴포넌트의 state 불러와서 직접 조정

interface InviteProps {
  onStartChat: (chatId: number) => any;
  onBack: () => void;
}

const AsideStartNewMessage: React.FC<InviteProps> = ({ onStartChat, onBack }) => {
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [inputEmail, setInputEmail] = useState("");

  // 새 대화를 시작할 이메일 추가
  const handleAddInviteEmail = () => {
    if (inputEmail.trim() && !inviteEmails.includes(inputEmail)) {
      setInviteEmails([...inviteEmails, inputEmail]);
      setInputEmail("");
    }
  };

  // 새 대화를 시작할 이메일 삭제
  const handleRemoveInviteEmail = (email: string) => {
    setInviteEmails(inviteEmails.filter(inviteEmail => inviteEmail !== email));
  };

  // 새 대화 시작
  const handleStartChat = (chatId: number) => {
    onStartChat(chatId);
  };

  return (
    <div className="p-4 max-w-sm mx-auto h-[36rem] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {/* 뒤로가기 버튼 */}
          <MessageBackButton onBack={onBack} />
          {/* 제목 */}
          <h2 className="text-xl font-bold ml-2">메세지 보낼 상대</h2>
        </div>
      </div>
      {/* 초대할 상대 입력 영역 */}
      <div className="flex items-center mb-4">
        <input
          type="email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          placeholder="메세지 보낼 상대 이름"
          className="input input-bordered flex-1 mr-2"
        />
        <button onClick={handleAddInviteEmail} className="btn btn-primary">추가</button>
      </div>
      {/* 초대할 상대 리스트 */}
      <div className="flex flex-col space-y-2 mb-4">
        {inviteEmails.map((inviteEmail, index) => (
          <div key={index} className="flex items-center justify-between">
            <span>{inviteEmail}</span>
            <button onClick={() => handleRemoveInviteEmail(inviteEmail)} className="btn btn-error btn-sm">x</button>
          </div>
        ))}
      </div>
      {/* 시작 버튼 */}
      <div className="mt-auto">
        <button onClick={() => handleStartChat(1)} className="btn btn-primary w-full">시작</button>
      </div>
    </div>
  );
};

export default AsideStartNewMessage;
