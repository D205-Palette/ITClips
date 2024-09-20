// AsideStartNewMessage.tsx 는 메세지창 상단바에서 + 버튼을 눌렀을 때 출력되는 컴포넌트

import React, { useState, useEffect } from "react";
import axios from "axios";

// components
import MessageBackButton from "./ui/MessageBackButton";

// apis
import { userSearch } from "../../api/searchApi";
import { createPrivateChatRoom, createGroupChatRoom } from "../../api/messageApi";

// stores
import { authStore } from "../../stores/authStore";
import darkModeStore from "../../stores/darkModeStore";

interface Notification {
  message: string;
  type: 'success' | 'error';
}

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
  const [ notification, setNotification ] = useState<Notification | null>(null);
  const isDark = darkModeStore(state => state.isDark);


  // 유저검색
  useEffect(() => {
    const searchUsers = async () => {
      if (inputName.trim() && myInfo?.id) {
        try {
          const results = await userSearch(myInfo.id, 1, inputName);
          setSearchResults(results.data);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            // 404 에러의 경우 검색 결과가 없다고 간주
            setSearchResults([]);
          } else {
            console.error("검색 중 오류 발생:", error);
            setSearchResults([]);
          }
        }
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

    try {
      let roomId;
      if (inviteUsers.length === 1) {
        const result = await createPrivateChatRoom(myInfo.id, inviteUsers[0].id);
        roomId = result.data.roomId;
      } else {
        const userIds = [myInfo.id, ...inviteUsers.map(user => user.id)];

        const result = await createGroupChatRoom({
          name: `${myInfo.nickname}님의 그룹채팅방`,
          userIds: userIds
        });
        roomId = result.data.roomId;
      }

      onStartChat(roomId);
      setNotification({ message: "채팅방이 생성되었습니다.", type: 'success' });
    } catch (error) {
      console.error("채팅방 생성 중 오류 발생:", error);
      setNotification({ message: "채팅방 생성에 실패했습니다.", type: 'error' });
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className={`${ isDark ? "bg-base-200" : "bg-sky-200" } p-4 border-b border-gray-200`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <MessageBackButton onBack={onBack} />
            <h2 className="text-xl font-bold ml-2 text-sky-700">메세지 보낼 상대</h2>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="메세지 보낼 상대 이름"
            className="input input-bordered w-full border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="space-y-2 mb-4">
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div 
                key={user.id} 
                className="flex items-center justify-between cursor-pointer hover:bg-sky-100 p-2 rounded transition duration-200"
                onClick={() => handleAddInviteUser(user)}
              >
                <div className="flex items-center">
                  <img src={user.image==='default'||user.image==null?require(`../../assets/images/noProfile${user.id % 6}.jpg`):user.image} alt={user.nickname} className="w-8 h-8 rounded-full mr-2 border-2 border-sky-300" />
                  <div>
                    <span className="font-bold text-sky-800">{user.nickname}</span>
                    <span className="text-sm text-sky-600 ml-2">{user.email}</span>
                  </div>
                </div>
              </div>
            ))
          ) : inputName.trim() !== "" ? (
            <div className="text-center py-2 text-sky-600">
              검색결과가 없습니다
            </div>
          ) : null}
        </div>
        <div className="space-y-2 mb-4">
          {inviteUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between bg-sky-100 p-2 rounded">
              <div className="flex items-center">
                <span className="font-bold text-sky-800">{user.name}</span>
              </div>
              <button 
                onClick={() => handleRemoveInviteUser(user.id)} 
                className="btn btn-sm bg-sky-500 hover:bg-sky-600 text-white border-none"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 mt-auto border-t border-gray-200">
        <button 
          onClick={handleStartChat} 
          className="btn w-full bg-sky-500 hover:bg-sky-600 text-white border-none"
        >
          시작
        </button>
      </div>

      {/* 알림 메시지 */}
      {notification && (
        <div 
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white shadow-lg z-50 transition-opacity duration-300`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default AsideStartNewMessage;
