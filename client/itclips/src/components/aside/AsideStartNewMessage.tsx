import React, { useState } from "react";

import MessageBackButton from "./items/MessageBackButton";

interface InviteProps {
  onStart: () => void;
  onBack: () => void;
}

const AsideStartNewMessage: React.FC<InviteProps> = ({ onStart, onBack }) => {
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [inputEmail, setInputEmail] = useState("");

  const handleAddInviteEmail = () => {
    if (inputEmail.trim() && !inviteEmails.includes(inputEmail)) {
      setInviteEmails([...inviteEmails, inputEmail]);
      setInputEmail("");
    }
  };

  const handleRemoveInviteEmail = (email: string) => {
    setInviteEmails(inviteEmails.filter(inviteEmail => inviteEmail !== email));
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
        <button onClick={onStart} className="btn btn-primary w-full">시작</button>
      </div>
    </div>
  );
};

export default AsideStartNewMessage;
