// MessageInviteButton.tsx 는 AsideMessageDetail.tsx 컴포넌트에서 사용하는 + 버튼(초대)

import React, { useState, useRef, RefObject, useEffect } from "react";

// icons
import { FaPlus } from "react-icons/fa6";

// apis
import { userSearch } from "../../../api/searchApi";
import { inviteToChatRoom, getChatRoomInfo } from "../../../api/messageApi";

// stores
import { authStore } from "../../../stores/authStore";

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

interface ChatRoomInfo {
  roomId: number;
  roomName: string;
  userTitles: {
    id: number;
    nickName: string;
  }[];
}

interface MessageInviteButtonProps {
  roomId: number;
  setNotification: (notification: { message: string, type: 'success' | 'error' } | null) => void;
}

const MessageInviteButton: React.FC<MessageInviteButtonProps> = ({ roomId, setNotification }) => {

  const userInfo = authStore(state => state.userInfo);

  const modalRef: RefObject<HTMLDialogElement> = useRef(null);
  const [ keyword, setKeyword ] = useState("");
  const [ searchResults, setSearchResults ] = useState<SearchUser[]>([]);
  const [ selectedUser, setSelectedUser ] = useState<InviteUser | null>(null);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ roomUsers, setRoomUsers ] = useState<number[]>([]);
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

  const openModal = async () => {
    setIsModalOpen(true);
    modalRef.current?.showModal();
    setErrorMessage(null);

    // 모달이 열릴때 채팅방 정보 조회
    try {
      const response = await getChatRoomInfo(roomId);
      const roomInfo: ChatRoomInfo = response.data;
      setRoomUsers(roomInfo.userTitles.map(user => user.id));
    } catch (error) {
      console.error("채팅방 정보 조회 실패:", error);
    }
  };

  // 모달이 열릴 때 상태 초기화
  useEffect(() => {
    if (isModalOpen) {
      setKeyword("");
      setSearchResults([]);
      setSelectedUser(null);
      setErrorMessage(null);
    }
  }, [isModalOpen]);

  // 검색어가 변경될 때마다 에러 메시지 초기화
  useEffect(() => {
    setErrorMessage(null);
  }, [keyword]);

  // 유저 검색 로직
  useEffect(() => {
    const searchUsers = async () => {
      if (keyword.trim() && userInfo?.id) {
        try {
          const results = await userSearch(userInfo.id, 1, keyword);
          setSearchResults(results.data || []);
        } catch (error) {
          console.error("사용자 검색 실패:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [keyword, userInfo?.id]);

  // 검색결과 유저 정보를 간단한 초대 정보로 변환
  const convertToInviteUser = (user: SearchUser): InviteUser => {
    return {
      id: user.id,
      name: user.nickname
    };
  };

  // 유저 검색 결과에서 유저 선택해서 저장하는 로직
  const handleUserSelect = (user: SearchUser) => {
    if (roomUsers.includes(user.id)) {
      setErrorMessage("이미 현재 채팅방에 있는 유저입니다.");
      return;
    }
    const parseUser = convertToInviteUser(user);
    setSelectedUser(parseUser);
    setKeyword("");
    setSearchResults([]);
    setErrorMessage(null);
  };

  // 초대했을 때 동작
  const handleInvite = async () => {
    if (selectedUser) {
      if (roomUsers.includes(selectedUser.id)) {
        setNotification({ message: "이미 현재 채팅방에 있는 유저입니다.", type: 'error' });
        return;
      }
      try {
        await inviteToChatRoom(roomId, selectedUser.id);
        modalRef.current?.close();
        setSelectedUser(null);
        setNotification({ message: "사용자를 성공적으로 초대했습니다.", type: 'success' });
      } catch (error) {
        console.error("사용자 초대 실패:", error);
        setNotification({ message: "사용자 초대에 실패했습니다.", type: 'error' });
      }
    }
  };

  return (
    <div>
      <button className="btn btn-ghost btn-circle" onClick={openModal}>
        <FaPlus />
      </button>
      <dialog ref={modalRef} className="modal" onClose={() => setIsModalOpen(false)}>
        <div className="modal-box max-h-[80vh] flex flex-col">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4">초대하기</h3>
          <div className="flex-grow flex flex-col overflow-hidden">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="초대할 상대의 이름을 입력해주세요."
              className="input input-bordered w-full mb-2"
            />
            {errorMessage && (
              <p className="text-error text-sm mb-2">{errorMessage}</p>
            )}
            <div className="flex-grow overflow-y-auto mb-2">
              {searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className="cursor-pointer hover:bg-gray-100 p-2"
                  >
                    <div className="flex items-center">
                      <img src={user.image} alt={user.nickname} className="w-8 h-8 rounded-full mr-2 border-2" />
                      <div>
                        <span className="font-bold">{user.nickname}</span>
                        <span className="text-sm text-gray-600 ml-2">{user.email}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : keyword.trim() !== "" ? (
                <div className="text-center py-2 text-gray-500">
                  검색결과가 없습니다
                </div>
              ) : null}
            </div>
            {selectedUser && (
              <div className="mb-2">
                선택된 사용자: {selectedUser.name}
              </div>
            )}
            <button
              onClick={handleInvite}
              className="btn btn-primary w-full mt-2"
              disabled={!selectedUser}
            >
              초대
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MessageInviteButton;
