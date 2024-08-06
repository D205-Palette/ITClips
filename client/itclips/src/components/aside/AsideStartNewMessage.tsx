// AsideStartNewMessage.tsx 는 메세지창 상단바에서 + 버튼을 눌렀을 때 출력되는 컴포넌트

import React, { useState } from "react";

// components
import MessageBackButton from "./ui/MessageBackButton";

// apis
import { userSearch } from "../../api/searchApi";
import { createPrivateChatRoom, createGroupChatRoom, inviteToChatRoom } from "../../api/messageApi"; // 1:1 채팅, 그룹 채팅(방만 만들어지고 초대해야함)

// stores
import { authStore } from "../../stores/authStore";

// 창의 상태를 저장하는 부모컴포넌트의 state 불러와서 직접 조정

interface InviteProps {
  onStartChat: (chatId: number) => any;
  onBack: () => void;
}

const AsideStartNewMessage: React.FC<InviteProps> = ({ onStartChat, onBack }) => {

  const userInfo = authStore(state => state.userInfo);

  const [ inviteNames, setInviteNames ] = useState<string[]>([]);
  const [ inputName, setInputName ] = useState("");

  // 새 대화를 시작할 이름 추가
  const handleAddInviteNickname = () => {
    if (inputName.trim() && !inviteNames.includes(inputName)) {
      setInviteNames([...inviteNames, inputName]);
      setInputName("");
    }
  };

  // 새 대화를 시작할 이름 삭제
  const handleRemoveInviteNickname = (name: string) => {
    setInviteNames(inviteNames.filter(inviteName => inviteName !== name));
  };

  // 새 대화 시작
  const handleStartChat = (chatId: number) => {
    onStartChat(chatId);
  };

  return (
    <div className="p-4 max-w-sm mx-auto h-[35rem] flex flex-col">
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
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="메세지 보낼 상대 이름"
          className="input input-bordered flex-1 mr-2"
        />
        <button onClick={handleAddInviteNickname} className="btn btn-primary">추가</button>
      </div>
      {/* 초대할 상대 리스트 */}
      <div className="flex flex-col space-y-2 mb-4">
        {inviteNames.map((inviteName, index) => (
          <div key={index} className="flex items-center justify-between">
            <span>{inviteName}</span>
            <button onClick={() => handleRemoveInviteNickname(inviteName)} className="btn btn-error btn-sm">x</button>
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
