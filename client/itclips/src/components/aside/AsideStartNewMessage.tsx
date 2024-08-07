// AsideStartNewMessage.tsx 는 메세지창 상단바에서 + 버튼을 눌렀을 때 출력되는 컴포넌트

import React, { useState, useEffect } from "react";

// components
import MessageBackButton from "./ui/MessageBackButton";

// apis
import { userSearch } from "../../api/searchApi";
import { createPrivateChatRoom, createGroupChatRoom, inviteToChatRoom } from "../../api/messageApi"; // 1:1 채팅, 그룹 채팅(방만 만들어지고 초대해야함)

// stores
import { authStore } from "../../stores/authStore";

interface SearchUser {
  id: number;
  email: string;
  nickname: string;
  birth: string;
  job: string;
  gender: boolean;
  bio: string;
  image: string;
  bookmarkListCount: number;
  roadmapCount: number;
  followerCount: number;
  followingCount: number;
  following: boolean;
  followers: boolean;
}

interface InviteUser {
  id: number;
  name: string;
}

interface InviteProps {
  onStartChat: (chatId: number) => any;
  onBack: () => void;
}

const AsideStartNewMessage: React.FC<InviteProps> = ({ onStartChat, onBack }) => {

  const myInfo = authStore(state => state.userInfo);

  const [ inviteUsers, setInviteUsers ] = useState<InviteUser[]>([]);
  const [ inputName, setInputName ] = useState("");
  const [ searchResults, setSearchResults ] = useState<SearchUser[]>([]);

  useEffect(() => {
    const searchUsers = async () => {
      if (inputName.trim() && myInfo?.id) {
        const results = await userSearch(myInfo.id, 1, inputName);
        setSearchResults(results.data);
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [inputName, myInfo?.id]);

  // 검색결과 유저 정보를 간단한 초대 정보로 변환
  const convertToInviteUser = (user: SearchUser): InviteUser => {
    return {
      id: user.id,
      name: user.nickname
    };
  };

  // 새 대화를 시작할 이름 추가
  const handleAddInviteUser = (user: SearchUser) => {
    const parseUser = convertToInviteUser(user);
    if (!inviteUsers.some(inviteUser => inviteUser.id === parseUser.id)) {
      setInviteUsers([...inviteUsers, parseUser]);
      setInputName("");
      setSearchResults([]);
    }
  };

  // 새 대화를 시작할 이름 삭제
  const handleRemoveInviteUser = (userId: number) => {
    setInviteUsers(inviteUsers.filter(user => user.id !== userId));
  };

  // 새 대화 시작
  const handleStartChat = async () => {
    if (inviteUsers.length === 0 || !myInfo?.id) return;

    let roomId;
    if (inviteUsers.length === 1) {
      const result = await createPrivateChatRoom(myInfo.id, inviteUsers[0].id);
      roomId = result.data.roomId;
    } else {
      const userIds = [myInfo.id, ...inviteUsers.map(user => user.id)];
      const result = await createGroupChatRoom({
        name: `그룹채팅방${Date.now()}`,
        userIds: userIds
      });
      roomId = result.data.roomId;
    }

    onStartChat(roomId);
  };

  return (
    <div className="p-4 max-w-sm mx-auto h-[35rem] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <MessageBackButton onBack={onBack} />
          <h2 className="text-xl font-bold ml-2">메세지 보낼 상대</h2>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="메세지 보낼 상대 이름"
          className="input input-bordered flex-1 mr-2"
        />
      </div>
      <div className="flex flex-col space-y-2 mb-4 max-h-40 overflow-y-auto">
        {searchResults.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div>
              <span className="font-bold">{user.nickname}</span>
              <span className="text-sm text-gray-500 ml-2">{user.email}</span>
            </div>
            <button onClick={() => handleAddInviteUser(user)} className="btn btn-primary btn-sm">추가</button>
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-2 mb-4">
        {inviteUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <span>{user.name}</span>
            </div>
            <button onClick={() => handleRemoveInviteUser(user.id)} className="btn btn-error btn-sm">x</button>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <button onClick={handleStartChat} className="btn btn-primary w-full">시작</button>
      </div>
    </div>
  );
};

export default AsideStartNewMessage;
