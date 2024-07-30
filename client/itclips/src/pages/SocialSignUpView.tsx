import React, { useState } from "react";
import {  
  FaAddressCard,
  FaRegCalendarAlt,
  FaTransgender,
  FaMale,
  FaFemale,
} from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import { navStore } from "../stores/navStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SocialSignUpView = () => {
  const { login } = navStore(); 
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nickname: "",
    birthday: "",
    job: "",
  });

  const { nickname, birthday, job } =
    userData;

  const [gender, setGender] = useState(""); // 성별 상태
  const [verificationCode, setVerificationCode] = useState("");
  
  const [isVerificationSuccess, setIsVerificationSuccess] = useState<
    boolean | null
  >(null);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);

   // 개발자 직업 목록 배열
   const jobOptions = [
    "풀스택 개발자",
    "프론트엔드 개발자",
    "백엔드 개발자",
    "미들티어 개발자",
    "데브옵스 엔지니어",
    "모바일 앱 개발자",
    "데이터 과학자",
    "데이터 엔지니어",
    "인공지능 엔지니어",
    "게임 개발자",
    "시스템 소프트웨어 개발자",
    "임베디드 시스템 개발자",
    "웹 디자이너",
    "QA 엔지니어",
    "기타", // 기타 직업 옵션 추가
  ];

  const isFormValid = () => {
    return (
      isNicknameValid === true // 닉네임 중복 체크 완료      
    );
  };

  // 성별 선택 핸들러
  const handleGenderSelect = (
    selectedGender: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // 기본 동작 방지
    setGender(selectedGender); // 성별 상태 업데이트
  };

  // 닉네임 중복 확인 핸들러
  const handleNicknameCheck = async () => {
    // 닉네임 중복 확인 로직 (예시: 항상 유효)
    try {
      // const response = await axios.get("/user/nickname", {
      //   params: { nickname },
      // });
      // setIsNicknameValid(response.data.isValid);
      setIsNicknameValid(true); // 임시로 유효 처리
    } catch (error) {
      setIsNicknameValid(false);
    }
  };

  // 입력 값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // 직업 선택 핸들러
  const handleJobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserData({
      ...userData,
      job: e.target.value,
    });
  };
  // 소셜 회원가입 제출
  const socialSignupSubmit = () => {
    login()
    navigate('/user/user:id')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100 p-5">
      <div className="w-full max-w-4xl border rounded-lg shadow-lg p-8">
        <h1 className="text-center text-3xl font-bold mb-8">소셜 회원가입</h1>

        <form onSubmit={socialSignupSubmit}>
          {/* 닉네임 입력창 */}
          <div className="flex items-center gap-3 mb-6">
            <FaAddressCard className="w-8 h-8" />
            <span className="text-red-500">*</span>
            <input
              name="nickname"
              type="text"
              className="input input-bordered w-full"
              placeholder="닉네임을 입력해주세요."
              onChange={handleInputChange}
              value={nickname}
            />
            <button
              type="button"
              className="btn btn-outline btn-primary"
              onClick={handleNicknameCheck}
            >
              중복 확인
            </button>
          </div>
          {isNicknameValid !== null && (
            <div
              className={`mb-6 ${
                isNicknameValid ? "text-green-500" : "text-red-500"
              }`}
            >
              {isNicknameValid
                ? "닉네임 중복 확인 완료."
                : "입력하신 닉네임은 사용 중입니다."}
            </div>
          )}

          {/* 생년월일 입력창 */}
          <div className="flex items-center gap-3 mb-6">
            <FaRegCalendarAlt className="w-8 h-8" />
            <input
              name="birthday"
              type="text"
              value={birthday}
              className="input input-bordered w-full"
              placeholder="YYYY-MM-DD"
              onChange={handleInputChange}
            />
          </div>

          {/* 직업 선택 */}
          <div className="flex items-center gap-3 mb-6">
            <MdOutlineWorkOutline className="w-8 h-8" />
            <select
              name="job"
              value={job}
              className="select select-bordered w-full"
              onChange={handleJobChange}
            >
              <option value="" disabled>직업을 선택해주세요.</option>
              {jobOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* 성별 선택 */}
          <div className="flex items-center gap-3 mb-6">
            <FaTransgender className="w-8 h-8" />
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

          {/* 제출 버튼 */}
          <div className="flex items-center justify-center mt-8">
            <button
              type="submit"
              className="btn btn-primary w-full max-w-xs"
              disabled={!isFormValid()}
            >
              소셜 회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocialSignUpView;
