// ProfileSettingsModal.tsx 는 AsideProfile.tsx 에서 톱니바퀴 모양의 설정 버튼을 눌렀을 때 출력되는 컴포넌트

import React, { useState } from 'react';
import darkModeStore from '../../../stores/darkModeStore';

// icons
import { IoCloseOutline } from 'react-icons/io5';
import {
  FaTransgender,
  FaMale,
  FaFemale,
} from "react-icons/fa";

// components
import JobCategoryDropdown from '../ui/JobCategoryDropdown';

// 프로필 모달 상태 props
interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({ isOpen, onClose }) => {

  // 임시 데이터들
  const [ name, setName ] = useState<string>("");
  const [ interests, setInterests ] = useState<string[]>(["JAVA", "Python"]);
  const [ newInterest, setNewInterest ] = useState<string>("");
  const [ description, setDescription ] = useState<string>("");
  const isDark = darkModeStore((state) => state.isDark)

  const [ jobCategory, setJobCategory ] = useState("직업");
  const [ gender, setGender ] = useState(""); // 성별 상태

  // 성별 선택 핸들러
  const handleGenderSelect = (
    selectedGender: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // 기본 동작 방지
    setGender(selectedGender); // 성별 상태 업데이트
  };

  // 카테고리 선택 정보 함수
  const selectCategory = (category: string) => {
    setJobCategory(category);
  };

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
      {/* <div className={(isDark ? "bg-slate-900" : "bg-white") + " rounded-lg p-6 w-96"}> */}
      <div className= "bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">내 정보 변경</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="flex justify-between">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">프로필 이미지</label>
            <div className="flex items-center space-x-2">
              {/* 여기에 나중에 프로필 이미지 출력 */}
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              {/* 프로필 이미지 변경 버튼 */}
              <button className="btn btn-outline btn-sm">변경</button>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">닉네임</label>
              <input
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="닉네임을 입력하세요"
              />
            </div>


            <div className="mb-4 space-y-2">
              <button className="btn btn-outline btn-sm">비밀번호 변경</button>
              <button className="btn btn-outline btn-sm text-red-500">회원탈퇴</button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">소개글</label>
          <textarea
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md resize-none"
            placeholder="자기소개를 입력하세요"
          />
        </div>

        {/* 생년월일 입력칸 */}
        <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">생년월일</label>
              <input
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="생년월일을 입력하세요"
              />
            </div>
        {/* 성별 선택칸 */}
        {/* 성별 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
          <div className="flex items-center gap-3 mb-2">
            <button
              className={`btn ${
                gender === "male" ? "btn-primary" : "btn-outline"
              } flex-1`}
              onClick={(event) => handleGenderSelect("male", event)}
            >
              <FaMale className="w-6 h-6 mr-1" />
              남성
            </button>
            <button
              className={`btn ${
                gender === "female" ? "btn-primary" : "btn-outline"
              } flex-1`}
              onClick={(event) => handleGenderSelect("female", event)}
            >
              <FaFemale className="w-6 h-6 mr-1" />
              여성
            </button>
          </div>
        </div>

        {/* 직업 카테고리 선택 */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">직업</label>
          <JobCategoryDropdown selectCategory={selectCategory} />
        </div>

        {/* 관심사 설정 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">관심사 설정</label>
          <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md">
            {interests.map((interest, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center">
                {interest}
                <button onClick={() => handleRemoveInterest(index)} className="ml-1 text-gray-500 hover:text-gray-700">
                  <IoCloseOutline size={16} />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={newInterest}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewInterest(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddInterest();
                }
              }}
              className="flex-grow min-w-[100px] px-2 py-1 text-sm border-none focus:outline-none"
              placeholder="새 관심사 입력 후 Enter"
            />
          </div>
        </div>

        <button className="btn btn-primary w-full">변경 완료</button>
      </div>
    </div>
  );
};

export default ProfileSettingsModal;