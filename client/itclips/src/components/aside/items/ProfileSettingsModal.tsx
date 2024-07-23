import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

// 프로필 모달 상태 props
interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({ isOpen, onClose }) => {
  // 임시 데이터들
  const [name, setName] = useState<string>('');
  const [interests, setInterests] = useState<string[]>(['JAVA', 'Python']);
  const [newInterest, setNewInterest] = useState<string>('');

  // 관심사 정보 추가 함수
  const handleAddInterest = (): void => {
    if (newInterest.trim() !== '') {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  // 관심사 제거 함수
  const handleRemoveInterest = (index: number): void => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">내 정보 변경</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">프로필 이미지</label>
          <div className="flex items-center space-x-2">
            {/* 여기에 나중에 프로필 이미지 출력 */}
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            {/* 프로필 이미지 변경 버튼 */}
            <button className="btn btn-outline btn-sm">변경</button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="mb-4 space-y-2">
          <button className="btn btn-outline btn-sm">비밀번호 변경</button>
          <button className="btn btn-outline btn-sm text-red-500">회원탈퇴</button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">관심사 설정</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {interests.map((interest, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center">
                {interest}
                <button onClick={() => handleRemoveInterest(index)} className="ml-1 text-gray-500 hover:text-gray-700">
                  <IoCloseOutline size={16} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newInterest}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewInterest(e.target.value)}
              className="flex-grow px-3 py-2 border rounded-l-md"
              placeholder="새 관심사 입력"
            />
            <button onClick={handleAddInterest} className="btn btn-primary rounded-l-none">+</button>
          </div>
        </div>

        <button className="btn btn-primary w-full">변경 완료</button>
      </div>
    </div>
  );
};

export default ProfileSettingsModal;