import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkNickname,
  socialSignup,
  checkUserInfo,
} from "../api/authApi"; // 필요한 API 함수만 임포트합니다.
import { authStore } from "../stores/authStore";
import toastStore from "../stores/toastStore";

// 아이콘
import {
  FaAddressCard,
  FaRegCalendarAlt,
  FaTransgender,
  FaMale,
  FaFemale,
} from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";

const SocialSignupView = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동을 처리합니다.
  const { globalNotification, setGlobalNotification } = toastStore();
  // 사용자 입력 데이터 상태
  const [userData, setUserData] = useState({
    nickname: "",
    birthday: "",
    job: "",
  });

  // 개별 필드 추출
  const { nickname, birthday, job } = userData;

  // 추가 상태 변수
  const [isMale, setIsMale] = useState<boolean | null>(null); // 성별 상태
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null); // 닉네임 유효성
  const [birthdayMessage, setBirthdayMessage] = useState(""); // 생년월일 관련 메시지
  const [isBirthdayValid, setIsBirthdayValid] = useState<boolean | null>(null); // 생년월일 유효성
  

  // 개발자 직업 목록 배열
  const jobOptions = [
    "프론트엔드 개발자",
    "백엔드 개발자",
    "풀스택 개발자",
    "IOS 개발자",
    "안드로이드 개발자",
    "크로스플랫폼 개발자",
    "게임 프로그래머",
    "게임 디자이너",
    "데이터 사이언티스트",
    "데이터 엔지니어",
    "머신 러닝 엔지니어",
    "데브옵스 엔지니어",
    "시스템 관리자",
    "보안 엔지니어",
    "정보보안 분석가",
    "소프트웨어 아키텍트",
    "QA 엔지니어",
    "릴리즈 매니저",
    "기타",
  ];

  const { login, fetchUserToken, fetchUserId, fetchUserInfo, userId, fetchRefreshToken } = authStore();

  // 생년월일 유효성 검사
  useEffect(() => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD 형식
    if (birthday === "") {
      setBirthdayMessage("");
      setIsBirthdayValid(null);
    } else if (datePattern.test(birthday)) {
      setBirthdayMessage("생년월일 입력 완료");
      setIsBirthdayValid(true);
    } else {
      setBirthdayMessage("생년월일을 올바르게 입력해주세요 ex) YYYY-MM-DD");
      setIsBirthdayValid(false);
    }
  }, [birthday]);

  // 폼 유효성 검사
  const isFormValid = () => {
    return (
      nickname !== "" && // 닉네임 입력 완료
      isNicknameValid === true && // 닉네임 유효성
      job !== "" && // 직업 선택 완료
      isBirthdayValid === true && // 생년월일 유효성
      isMale !== null // 성별 선택 완료
    );
  };

  // 성별 선택 핸들러
  const handleGenderSelect = (
    selectedGender: boolean,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // 기본 동작 방지
    setIsMale((prevGender) =>
      prevGender === selectedGender ? null : selectedGender
    ); // 선택된 성별이 현재 성별과 같으면 비우고, 그렇지 않으면 업데이트
  };

  // 닉네임 중복 확인 핸들러
  const handleNicknameCheck = () => {
    setIsNicknameValid(null);
    checkNickname(nickname)
      .then((response) => {
        if (response.status === 200) {
          setIsNicknameValid(true);
        }
      })
      .catch((error) => {
        setIsNicknameValid(false);
      });
  };

  // 입력 값 변경 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // 소셜 회원가입 제출 핸들러
  const handleSocialSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userDataToSend = {
      nickname,
      birth: birthday,
      job,
      gender: isMale,
    };

    try {
      const response = await socialSignup(userId, userDataToSend);

      if (response.status === 200) {
        setGlobalNotification({
          message: "소셜 회원가입을 완료하였습니다.",
          type: "success",
        });        
        login(); // 로그인 상태 업데이트

        const userInfoResponse = await checkUserInfo(userId, userId);
        if (userInfoResponse.status === 200) {
          fetchRefreshToken(response.data.refreshToken); // 로컬 스토리지에 리프레시 토큰 업데이트
          fetchUserInfo(userInfoResponse.data); // 로컬 스토리지에 유저 정보 업데이트
          setGlobalNotification({
            message: `환영합니다 ${userInfoResponse.data.nickname}님!`,
            type: "success",
          });                  
          navigate(`/user/${response.data.userId}`); // 로그인 후 페이지 이동
        } else {
          throw new Error("유저 정보를 불러오는데 실패했습니다.");
        }
      } else {
        throw new Error("소셜 회원가입에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error: any) {
      console.error(error);
      setGlobalNotification({
        message: "소셜 회원가입에 실패하였습니다.  다시 시도해 주세요.",
        type: "error",
      });                       
    }
  };

  return (
    <div className="flex justify-center items-center bg-base-100">
      <div className="w-full max-w-4xl border rounded-lg shadow-lg p-6 bg-base-100">
        <h1 className="text-center text-2xl font-bold mb-6">소셜 회원가입</h1>

        <form onSubmit={handleSocialSignup}>
          {/* 닉네임 입력 및 중복 확인 버튼 */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex">
                <FaAddressCard className="w-8 h-8" />
                <span className="text-red-500 pl-1">*</span>
              </div>
              <input
                name="nickname"
                type="text"
                className="input input-bordered w-full text-xs md:text-sm"
                placeholder="닉네임을 입력해주세요."
                value={nickname}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn bg-sky-500 hover:bg-sky-700 text-slate-100"
                onClick={handleNicknameCheck}
                disabled={!nickname.trim()} // 닉네임이 빈 값일 때 버튼 비활성화
              >
                중복 확인
              </button>
            </div>
            {/* 닉네임 유효성 메시지 */}
            {isNicknameValid !== null && (
              <div
                className={`ml-14 text-xs md:text-sm ${
                  isNicknameValid ? "text-green-500" : "text-red-500"
                }`}
              >
                {isNicknameValid
                  ? "닉네임 중복 확인 완료."
                  : "입력하신 닉네임은 사용 중입니다."}
              </div>
            )}
          </div>

          {/* 생년월일 입력 */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <FaRegCalendarAlt className="w-8 h-8" />
              <div className="pl-1"></div>
              <input
                name="birthday"
                type="text"
                value={birthday}
                className="input input-bordered w-full text-xs md:text-sm"
                placeholder="생년월일을 입력해주세요. ex)YYYY-MM-DD"
                onChange={handleInputChange}
              />
            </div>
            {/* 생년월일 유효성 메시지 */}
            {birthdayMessage && (
              <div
                className={`ml-14 mt-2 text-xs md:text-sm ${
                  birthdayMessage.includes("입력 완료")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {birthdayMessage}
              </div>
            )}
          </div>

          {/* 직업 입력 */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <MdOutlineWorkOutline className="w-8 h-8" />
              <div className="pl-1"></div>
              <select
                name="job"
                value={job}
                onChange={handleInputChange}
                className="select input-bordered w-full max-w-xs text-xs md:text-sm"
              >
                <option value="" disabled>
                  직업을 선택해주세요.
                </option>
                {jobOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 성별 선택 */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <FaTransgender className="w-8 h-8" />
              <div className="pl-1"></div>
              <button
                className={`btn ${
                  isMale === true ? "bg-sky-500 hover:bg-sky-700 text-slate-100" : "btn-outline"
                } flex-1`}
                onClick={(event) => handleGenderSelect(true, event)}
              >
                <FaMale className="w-6 h-6 mr-1" />
                남성
              </button>
              <button
                className={`btn ${
                  isMale === false ? "bg-sky-500 hover:bg-sky-700 text-slate-100" : "btn-outline"
                } flex-1`}
                onClick={(event) => handleGenderSelect(false, event)}
              >
                <FaFemale className="w-6 h-6 mr-1" />
                여성
              </button>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex items-center justify-center mt-8">
            <button
              type="submit"
              className="btn bg-sky-500 hover:bg-sky-700 text-slate-100 w-full max-w-xs"
              disabled={!isFormValid()}
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocialSignupView;
