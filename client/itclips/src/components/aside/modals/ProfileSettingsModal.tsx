import React, { useState, useEffect } from 'react';
import darkModeStore from '../../../stores/darkModeStore';

// icons
import { IoCloseOutline } from 'react-icons/io5';
import { FaMale, FaFemale } from "react-icons/fa";

// components
import JobCategoryDropdown from "../ui/JobCategoryDropdown";
import PasswordChangeModal from "./PasswordChangeModal";
import DeleteAccountModal from "./DeleteAccountModal";
import InterestCategoryDropdown from "../ui/InterestCategoryDropdown";

// apis
import { updateProfileImage, getMyInterest, addMyInterest, removeMyInterest, changePassword } from "../../../api/profileApi";

// stores
import { authStore } from "../../../stores/authStore";

// 프로필 모달 상태 props
interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Interest {
  id: number;
  title: string;
}

const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({ isOpen, onClose }) => {

  const userInfo = authStore(state => state.userInfo);

  // 임시 데이터들
  const [ name, setName ] = useState<string>("");
  const [ birth, setBirth ] = useState<string>("");
  const [ description, setDescription ] = useState<string>("");

  const isDark = darkModeStore(state => state.isDark)
  const [ jobCategory, setJobCategory ] = useState("직업");
  const [ gender, setGender ] = useState(""); // 성별 상태
  const [ isPasswordChangeModalOpen, setIsPasswordChangeModalOpen ] = useState<boolean>(false);
  const [ isDeleteAccountModalOpen, setIsDeleteAccountModalOpen ] = useState<boolean>(false);
  const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
  const [ isDuplicateNickname, setIsDuplicateNickname ] = useState<boolean | null>(null);

  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null);

  // 프로필 이미지 상태
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // 관심사 추가 함수
  const handleAddInterest = async (): Promise<void> => {
    if (selectedInterest && !interests.some(interest => interest.id === selectedInterest.id)) {
      try {
        await addMyInterest(userInfo.id ?? 0, selectedInterest.id);
        setInterests([...interests, selectedInterest]);
        setSelectedInterest(null);
      } catch (error) {
        console.error("Failed to add interest:", error);
      }
    }
  };
  
  // 관심사 제거 함수
  const handleRemoveInterest = async (interestId: number): Promise<void> => {
    try {
      await removeMyInterest(userInfo.id ?? 0, interestId);
      setInterests(interests.filter(interest => interest.id !== interestId));
    } catch (error) {
      console.error("Failed to remove interest:", error);
    }
  };
  
  // 관심사 목록 불러오기
  const fetchInterests = async () => {
    try {
      const response = await getMyInterest(userInfo.id ?? 0);
      setInterests(response.data);
    } catch (error) {
      console.error("Failed to fetch interests:", error);
    }
  };

  useEffect(() => {
    if (userInfo.id) {
      fetchInterests();
    }
  }, [userInfo.id]);

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

  // 비밀번호 변경 모달 로직
  const handlePasswordChange = async (oldPassword: string, newPassword: string) => {
    if (userInfo.email) {
      try {
        await changePassword(userInfo.email, oldPassword, newPassword);
        console.log('비밀번호가 성공적으로 변경되었습니다.');
        // 성공 메시지를 사용자에게 표시하는 로직 추가
      } catch (error) {
        console.error('비밀번호 변경 중 오류가 발생했습니다:', error);
        // 오류 메시지를 사용자에게 표시하는 로직 추가
      }
    } else {
      console.error('사용자 이메일이 없습니다.');
      // 오류 메시지를 사용자에게 표시하는 로직 추가
    }
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion confirmed');
    // 회원 탈퇴 로직 넣기
  };

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 body에 overflow: hidden 적용
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 overflow 스타일 제거
      document.body.style.overflow = 'unset';
    }

    // 컴포넌트가 언마운트될 때 overflow 스타일 제거
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateOldPassword = async (password: string) => {
    // 비밀번호 비교 로직 추가
    // 비밀번호가 같을경우 true, 다를경우 false
    return true;
  };

  // 프로필 이미지 선택 핸들러
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 프로필 이미지 변경 핸들러
  const handleImageChange = async () => {
    if (selectedFile && userInfo.email) {
      try {
        const profileImagePath = URL.createObjectURL(selectedFile);
        // 여기 추가 api 호출하기
        await updateProfileImage(userInfo.email, profileImagePath);
        console.log('프로필 이미지가 성공적으로 변경되었습니다.');
      } catch (error) {
        console.error('프로필 이미지 변경 중 오류가 발생했습니다:', error);
      }
    }
  };

  // 프로필 이미지 지우기 핸들러
  const handleImageDelete = () => {
    setProfileImage(null);
    setSelectedFile(null);
    // 프로필 이미지 삭제하는 로직 추가하기
    console.log('프로필 이미지가 삭제되었습니다.');
  };

  // 닉네임 중복 확인 핸들러
  const handleCheckNickname = async () => {
    try {
      // 닉네임 중복 확인 API 호출 (임의의 로직)
      // API 호출 결과에 따라 isDuplicate 값을 설정
      const isDuplicate = true; // true면 중복
      setIsDuplicateNickname(isDuplicate);
      console.log(isDuplicate ? '중복된 닉네임입니다.' : '사용 가능한 닉네임입니다.');
    } catch (error) {
      console.error('닉네임 중복 확인 중 오류가 발생했습니다:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-base-100 rounded-lg p-8 w-[800px] max-w-[90%]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">내 정보 변경</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoCloseOutline size={28} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* 프로필 이미지 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">프로필 이미지</label>
              <div className="flex items-start space-x-4"> {/* items-center에서 items-start로 변경 */}
                <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="btn btn-sm btn-outline w-full">
                    선택
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={handleImageChange}
                    className="btn btn-sm btn-primary w-full"
                    disabled={!selectedFile}
                  >
                    변경
                  </button>
                  <button
                    onClick={handleImageDelete}
                    className="btn btn-sm btn-outline btn-error w-full"
                    disabled={!profileImage}
                  >
                    지우기
                  </button>
                </div>
              </div>
            </div>

            {/* 관심사 설정 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">관심사 설정</label>
              <div className="flex w-full mb-2">
                <div className="flex flex-grow">
                  <InterestCategoryDropdown selectCategory={setSelectedInterest} />
                  <button 
                    onClick={handleAddInterest}
                    className="btn btn-primary min-h-[2.5rem] h-auto px-4 ml-2 flex-shrink-0"
                    disabled={!selectedInterest}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="border rounded-md p-2 h-[120px] overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {interests.length > 0 ? (
                    interests.map((interest) => (
                      <span key={interest.id} className="bg-base-300 px-3 py-1 rounded-full text-sm flex items-center">
                        {interest.title}
                        <button onClick={() => handleRemoveInterest(interest.id)} className="ml-2 hover:text-gray-700">
                          <IoCloseOutline size={18} />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">관심사를 추가해주세요.</span>
                  )}
                </div>
              </div>
            </div>

            <div>
              {/* 비밀번호 변경 버튼 */}
              <button
                className="btn btn-outline btn-sm mr-2"
                onClick={() => setIsPasswordChangeModalOpen(true)}
              >
                비밀번호 변경
              </button>
              {/* 회원탈퇴 버튼 */}
              <button
                className="btn btn-outline btn-sm text-red-500"
                onClick={() => setIsDeleteAccountModalOpen(true)}
              >
                회원탈퇴
              </button>
            </div>

          </div>

          {/* 여기서부터 오른쪽 영역 */}
          <div>
            {/* 닉네임 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">닉네임</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                    setIsDuplicateNickname(null); // 입력값이 변경되면 중복 확인 상태 초기화
                  }}
                  className="flex-grow px-3 py-2 border rounded-md bg-base-100"
                  placeholder="닉네임을 입력하세요"
                />
                <button
                  onClick={handleCheckNickname}
                  className="btn btn-outline"
                >
                  중복확인
                </button>
              </div>
              {isDuplicateNickname === true && (
                <p className="text-error text-sm mt-1">중복된 닉네임입니다.</p>
              )}
              {isDuplicateNickname === false && (
                <p className="text-success text-sm mt-1">사용 가능한 닉네임입니다.</p>
              )}
            </div>

            {/* 소개글 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">소개글</label>
              <textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md resize-none bg-base-100 h-20"
                placeholder="자기소개를 입력하세요"
              />
            </div>

            <div className="mb-6 flex items-stretch gap-4">
              {/* 생년월일 */}
              <div className="flex-shrink-0 flex flex-col">
                <label className="block text-sm font-medium mb-2">생년월일</label>
                <div className="flex-grow flex items-stretch">
                  <input
                    type="date"
                    value={birth}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirth(e.target.value)}
                    className="w-full px-3 border rounded-md bg-base-100 text-sm"
                    placeholder="생년월일을 입력하세요"
                  />
                </div>
              </div>

              {/* 직업 */}
              <div className="flex-grow flex flex-col">
                <label className="block text-sm font-medium mb-2">직업</label>
                <div className="flex-grow">
                  <JobCategoryDropdown selectCategory={selectCategory} />
                </div>
              </div>
            </div>

            {/* 성별 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">성별</label>
              <div className="flex items-center gap-4">
                <button
                  className={`btn ${gender === "male" ? "btn-primary" : "btn-outline"} flex-1`}
                  onClick={(event) => handleGenderSelect("male", event)}
                >
                  <FaMale className="w-6 h-6 mr-2" />
                  남성
                </button>
                <button
                  className={`btn ${gender === "female" ? "btn-primary" : "btn-outline"} flex-1`}
                  onClick={(event) => handleGenderSelect("female", event)}
                >
                  <FaFemale className="w-6 h-6 mr-2" />
                  여성
                </button>
              </div>
            </div>
          </div>

        </div>
        
        {/* 변경완료 버튼 */}
        <div className="flex justify-end items-center mt-6">
          <button className="btn btn-primary">변경 완료</button>
        </div>

        {/* 비밀번호 변경 모달 */}
        <PasswordChangeModal
          isOpen={isPasswordChangeModalOpen}
          onClose={() => setIsPasswordChangeModalOpen(false)}
          onSubmit={handlePasswordChange}
          validateOldPassword={validateOldPassword}
        />

        {/* 회원 탈퇴 모달 */}
        <DeleteAccountModal 
          isOpen={isDeleteAccountModalOpen}
          onClose={() => setIsDeleteAccountModalOpen(false)}
          onConfirm={handleDeleteAccount}
        />
      </div>
    </div>
  );
};

export default ProfileSettingsModal;