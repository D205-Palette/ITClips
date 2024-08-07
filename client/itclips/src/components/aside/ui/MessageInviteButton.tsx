// MessageInviteButton.tsx 는 AsideMessageDetail.tsx 컴포넌트에서 사용하는 + 버튼(초대)

import React, { useState, useRef, RefObject, useEffect } from "react";

// icons
import { FaPlus } from "react-icons/fa6";

// apis
import { userSearch } from "../../../api/searchApi";
import { inviteToChatRoom } from "../../../api/messageApi";

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

interface MessageInviteButtonProps {
  roomId: number;
}

const MessageInviteButton: React.FC<MessageInviteButtonProps> = ({ roomId }) => {

  const userInfo = authStore(state => state.userInfo);

  const modalRef: RefObject<HTMLDialogElement> = useRef(null);
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ searchResults, setSearchResults ] = useState<SearchUser[]>([]);
  const [ selectedUser, setSelectedUser ] = useState<InviteUser | null>(null);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    modalRef.current?.close();
  };

  // 모달이 열릴 때 상태 초기화
  useEffect(() => {
    if (isModalOpen) {
      setSearchTerm("");
      setSearchResults([]);
      setSelectedUser(null);
    }
  }, [isModalOpen]);

  // 유저 검색 로직
  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.trim() && userInfo?.id) {
        try {
          const results = await userSearch(userInfo.id, 1, searchTerm);
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
  }, [searchTerm, userInfo?.id]);

  // 검색결과 유저 정보를 간단한 초대 정보로 변환
  const convertToInviteUser = (user: SearchUser): InviteUser => {
    return {
      id: user.id,
      name: user.nickname
    };
  };

  // 유저 검색 결과에서 유저 선택해서 저장하는 로직
  const handleUserSelect = (user: SearchUser) => {
    const parseUser = convertToInviteUser(user);
    setSelectedUser(parseUser);
    setSearchTerm("");
    setSearchResults([]);
  };

  // 초대했을 때 동작
  const handleInvite = async () => {
    if (selectedUser) {
      try {
        // 현재 채팅방 정보를 조회하는 로직을 추가해서 중복된 사용자 있는지 봐야됨

        await inviteToChatRoom(roomId, selectedUser.id);
        modalRef.current?.close();
        setSelectedUser(null);
        // 토스트메세지("사용자를 성공적으로 초대했습니다.");
      } catch (error) {
        console.error("사용자 초대 실패:", error);
        // 토스트메세지("사용자 초대에 실패했습니다.");
      }
    }
  };

  return (
    <div>
      <button className="btn btn-ghost btn-circle" onClick={openModal}>
        <FaPlus />
      </button>
      <dialog ref={modalRef} className="modal" onClose={() => setIsModalOpen(false)}>
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">초대하기</h3>
          <div className="modal-action flex-col">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="초대할 상대의 이름을 입력해주세요."
              className="input input-bordered w-full mb-2"
            />
            <div className="max-h-40 overflow-y-auto mb-2">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className="cursor-pointer hover:bg-gray-100 p-2"
                >
                  <div>
                    <span className="font-bold">{user.nickname}</span>
                    <span className="text-sm text-gray-500 ml-2">{user.email}</span>
                  </div>
                </div>
              ))}
            </div>
            {selectedUser && (
              <div className="mb-2">
                선택된 사용자: {selectedUser.name}
              </div>
            )}
            <button
              onClick={handleInvite}
              className="btn btn-primary w-full"
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
