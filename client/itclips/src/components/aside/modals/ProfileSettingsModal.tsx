import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FileResizer from "react-image-file-resizer";

// icons
import { IoCloseOutline } from "react-icons/io5";
import { FaMale, FaFemale } from "react-icons/fa";

// components
import JobCategoryDropdown from "../ui/JobCategoryDropdown";
import PasswordChangeModal from "./PasswordChangeModal";
import DeleteAccountModal from "./DeleteAccountModal";
import InterestCategoryDropdown from "../ui/InterestCategoryDropdown";
import DeletedAccountModal from "./DeletedAccountModal";

// apis
import {
  updateProfileImage,
  getMyInterest,
  addMyInterest,
  removeMyInterest,
  deleteUserAccount,
  updateUserInfo,
  checkNicknameDuplication,
} from "../../../api/profileApi";
import { logoutApi, checkUserInfo } from "../../../api/authApi";

// stores
import darkModeStore from "../../../stores/darkModeStore";
import { authStore } from "../../../stores/authStore";
import mainStore from "../../../stores/mainStore";
// 기본 이미지
import noImg from "../../../assets/images/noImg.gif";

// 프로필 모달 상태 props
interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateAsideInfo: (updatedInfo: any) => void;
  setGlobalNotification: (
    notification: { message: string; type: "success" | "error" } | null
  ) => void;
}

interface Interest {
  id: number;
  title: string;
}

const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  updateAsideInfo,
  setGlobalNotification,
}) => {
  const userInfo = authStore((state) => state.userInfo);
  const fetchUserInfo = authStore((state) => state.fetchUserInfo);
  const logout = authStore((state) => state.logout);
  const { setIsProfileChange } = mainStore();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const isDark = darkModeStore((state) => state.isDark);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDuplicateNickname, setIsDuplicateNickname] = useState<
    boolean | null
  >(null);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState<boolean>(false);
  const [isDeletedAccountModalOpen, setIsDeletedAccountModalOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(
    null
  );

  // 수정된 유저 정보를 담기
  const [nickname, setNickname] = useState(userInfo.nickname || "");
  const [bio, setBio] = useState(userInfo.bio || "");
  const [birthDate, setBirthDate] = useState(userInfo.birth || "");
  const [job, setJob] = useState(userInfo.job || "");
  const [genderBoolean, setGenderBoolean] = useState(userInfo.gender || false);

  useEffect(() => {
    setIsDuplicateNickname(null);
  }, [isOpen]);

  // 유저 정보의 변화를 감지 (수정)
  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname || "");
      setBio(userInfo.bio || "");
      setBirthDate(userInfo.birth || "");
      setJob(userInfo.job || "");
      setGenderBoolean(userInfo.gender || false);
      setProfileImage(userInfo.image!);
    }
  }, []);

  // 프로필 이미지 상태
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // 모달이 열릴 때 스크롤 안되게 설정
  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 body에 overflow: hidden 적용
      document.body.style.overflow = "hidden";
    } else {
      // 모달이 닫힐 때 overflow 스타일 제거
      document.body.style.overflow = "unset";
    }

    // 컴포넌트가 언마운트될 때 overflow 스타일 제거
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const resizeFile = (file: File): Promise<File> =>
    new Promise((resolve, reject) => {
      FileResizer.imageFileResizer(
        file,
        200, // 이미지 너비
        200, // 이미지 높이
        "SVG", // 파일 형식 - SVG 대신 JPEG로 변경
        100, // 이미지 퀄리티
        0,
        (uri) => {
          if (uri) {
            resolve(uri as File); // Promise를 사용하여 비동기 처리
          } else {
            reject(new Error("Resizing failed"));
          }
        },
        "file" // 출력 타입
      );
    });
  // 프로필 이미지 선택 핸들러
  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const compressedFile = await resizeFile(file);
      await setSelectedFile(compressedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);
    }
  };

  // 프로필 이미지 변경 핸들러
  const handleImageChange = async () => {
    if (selectedFile && userInfo.email) {
      try {
        // const profileImagePath = URL.createObjectURL(selectedFile);
        // 여기 추가 api 호출

        const profileImageResponse = await updateProfileImage(
          userInfo.email,
          `${userInfo.id}-profileImg`
        );

        if (profileImageResponse.status === 200) {
          setGlobalNotification({
            message: "프로필 이미지가 성공적으로 변경되었습니다.",
            type: "success",
          });
          axios.put(`${profileImageResponse.data.url}`, selectedFile, {
            headers: {
              "Content-Type": selectedFile.type,
            }, // 파일의 MIME 타입 설정
          });
        }
        // setIsProfileChange(true);
      } catch (error) {
        setGlobalNotification({
          message: "프로필 이미지 변경 중 오류가 발생했습니다.",
          type: "error",
        });
      }
    }
  };

  // 프로필 이미지 지우기 핸들러
  const handleImageDelete = async () => {
    // 프로필 이미지 삭제하는 로직 추가하기
    try {
      if (userInfo.email) {
        const profileImageResponse = await updateProfileImage(
          userInfo.email,
          `default`
        );
        setProfileImage(null);
        setSelectedFile(null);
        setGlobalNotification({
          message: "프로필 이미지가 삭제되었습니다.",
          type: "success",
        });
      }
      // setIsProfileChange(true)
    } catch (error) {
      setGlobalNotification({
        message: "프로필 이미지 변경 중 오류가 발생했습니다",
        type: "error",
      });
    }
  };

  // 관심사 목록 불러오기
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await getMyInterest(userInfo.id ?? 0);
        setInterests(response.data);
      } catch (error) {
        console.error("Failed to fetch interests:", error);
      }
    };

    if (userInfo.id) {
      fetchInterests();
    }
  }, [userInfo.id]);

  // 관심사 추가 함수
  const handleAddInterest = async (): Promise<void> => {
    if (
      selectedInterest &&
      !interests.some((interest) => interest.id === selectedInterest.id)
    ) {
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
      setInterests(interests.filter((interest) => interest.id !== interestId));
    } catch (error) {
      console.error("Failed to remove interest:", error);
    }
  };

  // 회원 탈퇴 핸들러
  const handleDeleteAccount = async () => {
    if (userInfo.id) {
      try {
        await deleteUserAccount(userInfo.id);
        await logoutApi();
        logout();
        setIsDeleteAccountModalOpen(false);
        setIsDeletedAccountModalOpen(true);
      } catch (error) {
        console.error("회원 탈퇴 중 오류가 발생했습니다:", error);
      }
    }
  };

  // 회원 탈퇴 확인
  const handleDeletedAccountModalClose = () => {
    setIsDeletedAccountModalOpen(false);
    navigate("/intro"); // 회원 탈퇴 완료 후 intro 페이지로 리다이렉트
    onClose(); // ProfileSettingsModal 닫기
  };

  // 닉네임 중복 확인 핸들러
  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      setNotification({ message: "닉네임을 입력해주세요.", type: "error" });
      return;
    }

    try {
      const response = await checkNicknameDuplication(nickname);
      setIsDuplicateNickname(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 409) {
          setIsDuplicateNickname(true);
        } else {
          console.error("닉네임 중복 확인 중 오류가 발생했습니다:", error);
        }
      } else {
        console.error("예상치 못한 오류가 발생했습니다:", error);
      }
    }
  };

  // 변경 완료 버튼 로직
  const handleUpdateProfile = async () => {
    if (!userInfo.id || !userInfo.email) {
      console.error("사용자 정보가 없습니다.");
      setGlobalNotification({
        message: "사용자 정보가 없습니다.",
        type: "error",
      });
      return;
    }

    // 닉네임이 변경되었고, 중복 확인이 되지 않았을 때만 체크
    if (
      nickname !== userInfo.nickname &&
      (isDuplicateNickname === null || isDuplicateNickname === true)
    ) {
      setGlobalNotification({
        message: "닉네임 중복 확인을 해주세요.",
        type: "error",
      });
      return;
    }

    const updatedUserInfo = {
      ...userInfo,
      nickname: nickname,
      birth: birthDate,
      job: job,
      gender: genderBoolean,
      bio: bio,
    };

    try {
      await updateUserInfo(userInfo.id, updatedUserInfo);
      fetchUserInfo(updatedUserInfo);
      // updateAsideInfo(updatedUserInfo);
      setGlobalNotification({
        message: "프로필 정보가 성공적으로 업데이트되었습니다.",
        type: "success",
      });
      onClose();
    } catch (error) {
      console.error("프로필 정보 업데이트 중 오류가 발생했습니다:", error);
      setGlobalNotification({
        message: "프로필 정보 업데이트에 실패했습니다.",
        type: "error",
      });
    }
    setIsProfileChange(true);
  };

  const handleCloseModal = async () => {
    // 프로필 수정 후 닫을 때 유저정보 갱신
    if (userInfo.id !== undefined) {
      const userInfoResponse = await checkUserInfo(userInfo.id, userInfo.id);
      setIsProfileChange(true);
      fetchUserInfo(userInfoResponse.data);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-base-100 md:rounded-lg w-full md:w-[800px] max-w-full md:max-h-[90vh] flex flex-col">
        {/* 모바일 디자인 (md 미만) */}
        <div className="md:hidden h-[calc(100vh-var(--navbar-height)-5rem)] flex flex-col">
          <div
            className={`${
              isDark ? "bg-base-200" : "bg-sky-200"
            } p-4 border-b flex justify-between items-center`}
          >
            <h2 className="text-xl font-bold">내 정보 변경</h2>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          <div className="overflow-y-auto flex-grow p-4">
            <div className="grid grid-cols-1 gap-4">
              {/* 프로필 이미지 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  프로필 이미지
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 border bg-gray-200 rounded-full overflow-hidden">
                    {profileImage === "default" || profileImage === null ? (
                      <img
                        src={noImg}
                        alt="noImg"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={profileImage}
                        alt="profileImg"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="btn btn-xs btn-outline w-full">
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
                      className="btn btn-xs bg-sky-500 text-slate-100 hover:bg-sky-700 w-full"
                      disabled={!selectedFile}
                    >
                      변경
                    </button>
                    <button
                      onClick={handleImageDelete}
                      className="btn btn-xs btn-outline btn-error w-full"
                      disabled={!profileImage}
                    >
                      지우기
                    </button>
                  </div>
                </div>
              </div>

              {/* 관심사 설정 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  관심사 설정
                </label>
                <div className="flex w-full mb-2">
                  <InterestCategoryDropdown
                    selectCategory={setSelectedInterest}
                  />
                  <button
                    onClick={handleAddInterest}
                    className="btn btn-info btn-xs min-h-[2rem] h-auto px-2 ml-2 flex-shrink-0"
                    disabled={!selectedInterest}
                  >
                    +
                  </button>
                </div>
                <div className="border rounded-md p-2 h-[100px] overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {interests.length > 0 ? (
                      interests.map((interest) => (
                        <span
                          key={interest.id}
                          className="bg-base-300 px-2 py-1 rounded-full text-xs flex items-center"
                        >
                          {interest.title}
                          <button
                            onClick={() => handleRemoveInterest(interest.id)}
                            className="ml-1 hover:text-gray-700"
                          >
                            <IoCloseOutline size={16} />
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">
                        관심사를 추가해주세요.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 닉네임 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">닉네임</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                      setIsDuplicateNickname(null);
                    }}
                    className="flex-grow px-2 py-1 border rounded-md bg-base-100 text-sm"
                    placeholder="닉네임을 입력하세요"
                  />
                  <button
                    onClick={handleCheckNickname}
                    className="btn btn-outline btn-xs"
                  >
                    중복확인
                  </button>
                </div>
                {isDuplicateNickname === true && (
                  <p className="text-error text-xs mt-1">
                    중복된 닉네임입니다.
                  </p>
                )}
                {isDuplicateNickname === false && (
                  <p className="text-success text-xs mt-1">
                    사용 가능한 닉네임입니다.
                  </p>
                )}
              </div>

              {/* 소개글 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">소개글</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md resize-none bg-base-100 h-16 text-sm"
                  placeholder="자기소개를 입력하세요"
                />
              </div>

              {/* 생년월일 및 직업 */}
              <div className="mb-4 flex flex-col gap-4">
                <div className="flex-grow flex flex-col">
                  <label className="block text-sm font-medium mb-2">
                    생년월일
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-2 border rounded-md bg-base-100 text-xs"
                    placeholder="생년월일을 입력하세요"
                  />
                </div>
                <div className="flex-grow flex flex-col">
                  <label className="block text-sm font-medium mb-2">직업</label>
                  <JobCategoryDropdown
                    selectCategory={setJob}
                    initialValue={job}
                  />
                </div>
              </div>

              {/* 성별 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">성별</label>
                <div className="flex items-center gap-4">
                  <button
                    className={`btn btn-xs ${
                      genderBoolean
                        ? "bg-sky-500 hover:bg-sky-700 text-slate-100"
                        : ""
                    } flex-1`}
                    onClick={() => setGenderBoolean(true)}
                  >
                    <FaMale className="w-4 h-4 mr-1" />
                    남성
                  </button>
                  <button
                    className={`btn btn-xs ${
                      !genderBoolean
                        ? "bg-sky-500 hover:bg-sky-700 text-slate-100"
                        : ""
                    } flex-1`}
                    onClick={() => setGenderBoolean(false)}
                  >
                    <FaFemale className="w-4 h-4 mr-1" />
                    여성
                  </button>
                </div>
              </div>

              {/* 비밀번호 변경 및 회원탈퇴 버튼 */}
              <div className="mb-4">
                <button
                  className="btn btn-outline btn-xs mr-2"
                  onClick={() => setIsPasswordChangeModalOpen(true)}
                >
                  비밀번호 변경
                </button>
                <button
                  className="btn btn-outline btn-xs text-red-500"
                  onClick={() => setIsDeleteAccountModalOpen(true)}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <button
              className="btn bg-sky-500 text-slate-100 hover:bg-sky-700 w-full"
              onClick={handleUpdateProfile}
            >
              변경 완료
            </button>
          </div>
        </div>

        {/* 데스크톱 디자인 (md 이상) */}
        <div className="hidden md:flex md:flex-col rounded-lg">
          <div
            className={`${
              isDark ? "bg-base-200" : "bg-sky-200"
            } rounded-t-lg p-6 border-b`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">내 정보 변경</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoCloseOutline size={28} />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-grow p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* 왼쪽 열 */}
              <div>
                {/* 프로필 이미지 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    프로필 이미지
                  </label>
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 border bg-gray-200 rounded-full overflow-hidden">
                      {profileImage === "default" || profileImage === null ? (
                        <img
                          src={noImg}
                          alt="noImg"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={profileImage}
                          alt="profileImg"
                          className="w-full h-full object-cover"
                        />
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
                        className="btn btn-sm bg-sky-500 text-slate-100 hover:bg-sky-700 w-full"
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
                  <label className="block text-sm font-medium mb-2">
                    관심사 설정
                  </label>
                  <div className="flex w-full mb-2">
                    <div className="flex flex-grow">
                      <InterestCategoryDropdown
                        selectCategory={setSelectedInterest}
                      />
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
                          <span
                            key={interest.id}
                            className="bg-base-300 px-3 py-1 rounded-full text-sm flex items-center"
                          >
                            {interest.title}
                            <button
                              onClick={() => handleRemoveInterest(interest.id)}
                              className="ml-2 hover:text-gray-700"
                            >
                              <IoCloseOutline size={18} />
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">
                          관심사를 추가해주세요.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    className="btn btn-outline btn-sm mr-2"
                    onClick={() => setIsPasswordChangeModalOpen(true)}
                  >
                    비밀번호 변경
                  </button>
                  <button
                    className="btn btn-outline btn-sm text-red-500"
                    onClick={() => setIsDeleteAccountModalOpen(true)}
                  >
                    회원탈퇴
                  </button>
                </div>
              </div>

              {/* 오른쪽 열 */}
              <div>
                {/* 닉네임 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    닉네임
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => {
                        setNickname(e.target.value);
                        setIsDuplicateNickname(null);
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
                    <p className="text-error text-sm mt-1">
                      중복된 닉네임입니다.
                    </p>
                  )}
                  {isDuplicateNickname === false && (
                    <p className="text-success text-sm mt-1">
                      사용 가능한 닉네임입니다.
                    </p>
                  )}
                </div>

                {/* 소개글 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    소개글
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md resize-none bg-base-100 h-20"
                    placeholder="자기소개를 입력하세요"
                  />
                </div>

                <div className="mb-6 flex items-stretch gap-4">
                  {/* 생년월일 */}
                  <div className="flex-shrink-0 flex flex-col">
                    <label className="block text-sm font-medium mb-2">
                      생년월일
                    </label>
                    <div className="flex-grow flex items-stretch">
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-3 border rounded-md bg-base-100 text-sm"
                        placeholder="생년월일을 입력하세요"
                      />
                    </div>
                  </div>

                  {/* 직업 */}
                  <div className="flex-grow flex flex-col">
                    <label className="block text-sm font-medium mb-2">
                      직업
                    </label>
                    <div className="flex-grow">
                      <JobCategoryDropdown
                        selectCategory={setJob}
                        initialValue={job}
                      />
                    </div>
                  </div>
                </div>

                {/* 성별 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">성별</label>
                  <div className="flex items-center gap-4">
                    <button
                      className={`btn ${
                        genderBoolean
                          ? "btn bg-sky-500 hover:bg-sky-700 text-slate-100"
                          : "btn"
                      } flex-1`}
                      onClick={() => setGenderBoolean(true)}
                    >
                      <FaMale className="w-6 h-6 mr-2" />
                      남성
                    </button>
                    <button
                      className={`btn ${
                        !genderBoolean
                          ? "btn bg-sky-500 hover:bg-sky-700 text-slate-100"
                          : "btn"
                      } flex-1`}
                      onClick={() => setGenderBoolean(false)}
                    >
                      <FaFemale className="w-6 h-6 mr-2" />
                      여성
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 변경완료 버튼 */}
          <div className="p-6 border-t">
            <div className="flex justify-end">
              <button
                className="btn bg-sky-500 text-slate-100 hover:bg-sky-700"
                onClick={handleUpdateProfile}
              >
                변경 완료
              </button>
            </div>
          </div>
        </div>

        {/* 모달 컴포넌트들 */}
        <PasswordChangeModal
          isOpen={isPasswordChangeModalOpen}
          onClose={() => setIsPasswordChangeModalOpen(false)}
          setNotification={setNotification}
        />

        <DeleteAccountModal
          isOpen={isDeleteAccountModalOpen}
          onClose={() => setIsDeleteAccountModalOpen(false)}
          onConfirm={handleDeleteAccount}
        />

        <DeletedAccountModal
          isOpen={isDeletedAccountModalOpen}
          onDeleteModalClose={() => setIsDeletedAccountModalOpen(false)}
          onDeletedModalClose={handleDeletedAccountModalClose}
        />
      </div>

      {/* 토스트 알람 */}
      {notification && (
        <div
          className={`fixed bottom-20 md:bottom-4 left-1/2 transform -translate-x-1/2 p-3 md:p-4 rounded-md ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white shadow-lg z-50 transition-opacity duration-300 text-sm md:text-base`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsModal;
