import React, { useState, useEffect } from "react";
import {
  FaKey,
  FaAddressCard,
  FaRegCalendarAlt,
  FaTransgender,
  FaMale,
  FaFemale,
} from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MdOutlineWorkOutline } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { navStore } from "../stores/navStore";

const SignUpView = () => {
  const navigate = useNavigate();
  const { login } = navStore();

  // 사용자 입력 데이터 상태
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    birthday: "",
    job: "",
  });

  // 개별 필드 추출
  const { email, password, passwordCheck, nickname, birthday, job } = userData;

  // 추가 상태 변수
  const [gender, setGender] = useState(""); // 성별 상태
  const [verificationCode, setVerificationCode] = useState(""); // 인증번호
  const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 발송 상태
  const [isVerificationSuccess, setIsVerificationSuccess] = useState<
    boolean | null
  >(null); // 인증 성공 여부
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null); // 닉네임 유효성
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null); // 비밀번호 일치 여부
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null); // 이메일 형식 유효성
  const [verificationMessage, setVerificationMessage] = useState(""); // 인증 관련 메시지

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

  // 이메일 형식 검증
  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(email));
  }, [email]);

  // 비밀번호 확인 핸들러
  useEffect(() => {
    if (password && passwordCheck) {
      setIsPasswordMatch(password === passwordCheck);
    } else {
      setIsPasswordMatch(null); // 비밀번호가 모두 입력되지 않은 경우
    }
  }, [password, passwordCheck]);

  // 폼 유효성 검사
  const isFormValid = () => {
    return (
      isVerificationSuccess === true && // 이메일 인증 완료
      isNicknameValid === true && // 닉네임 유효성
      password === passwordCheck && // 비밀번호 일치
      password !== "" && // 비밀번호 입력 완료
      isEmailValid === true // 이메일 형식 검증
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

  // 이메일 제출 핸들러
  const handleEmailSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      window.alert("이메일로 인증번호를 발송하였습니다.");
      // 이메일 인증 로직을 시뮬레이션합니다.
      // 실제 구현에서는 아래 주석을 제거하고 이메일 발송 요청을 해야 합니다.
      // await axios.post("/user/email", { email });

      // 이메일 발송 성공 시 상태 업데이트
      setIsEmailSent(true);
      setIsVerificationSuccess(null); // 인증 성공 상태 초기화
      setVerificationMessage(""); // 인증 메시지 초기화
    } catch (error) {
      // 이메일 발송 실패 시 상태 업데이트
      setIsEmailSent(false);
      setVerificationMessage("인증번호 발송에 실패하였습니다.");
    }
  };

  // 인증번호 제출 핸들러
  const handleVerificationSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      // 인증번호 확인 로직을 시뮬레이션합니다.
      // 실제 구현에서는 아래 주석을 제거하고 인증번호 확인 요청을 해야 합니다.
      // await axios.get("/user/idInquiry", {
      //   params: { email, code: verificationCode },
      // });

      // 인증번호 확인 성공 시 상태 업데이트
      setIsVerificationSuccess(true);
      setVerificationMessage("인증이 완료되었습니다.");
    } catch (error) {
      // 인증번호 확인 실패 시 상태 업데이트
      setIsVerificationSuccess(false);
      setVerificationMessage(
        "본인 인증에 실패하였습니다. 인증번호를 다시 입력해주세요."
      );
    }
  };

  // 닉네임 중복 확인 핸들러
  const handleNicknameCheck = async () => {
    setIsNicknameValid(null);

    // 닉네임 유효성 확인 로직
    try {
      // 닉네임 유효성 확인 로직을 시뮬레이션합니다.
      // 실제 구현에서는 아래 주석을 제거하고 API 요청을 해야 합니다.
      // const response = await axios.get("/user/nickname", {
      //   params: { nickname },
      // });
      // setIsNicknameValid(response.data.isValid);

      // 임시로 닉네임이 유효하다고 가정
      setIsNicknameValid(true);
    } catch (error) {
      // 닉네임 중복 확인 실패 시 상태 업데이트
      setIsNicknameValid(false);
    }
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

  // 회원 가입 제출
  const signup = () => {
    login();
    navigate("/user/user:id");
  };

  return (
    <div className="flex justify-center items-center bg-base-100 mt-5">
      <div className="w-full max-w-4xl border rounded-lg shadow-lg p-8 bg-base-100">
        <h1 className="text-center text-3xl font-bold mb-8">회원가입</h1>

        <form onSubmit={signup}>
          {/* 이메일 입력 및 본인 인증 버튼 */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex">
                <CiMail className="w-8 h-8" />
                <span className="text-red-500 pl-1">*</span>
              </div>
              <input
                name="email"
                type="email"
                className={`input input-bordered w-full`}
                placeholder="아이디로 사용될 이메일을 입력해주세요."
                value={email}
                onChange={handleInputChange}
              />
              <button
                onClick={handleEmailSubmit}
                type="button"
                className="btn btn-outline btn-primary"
                disabled={!email || isEmailValid === false}
              >
                본인 인증
              </button>
            </div>
          </div>

          {/* 인증번호 입력 및 확인 버튼 */}
          {isEmailSent && (
            <div className="space-y-4 mb-6">
              <div className="flex items-center ml-14 gap-3">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="인증번호를 입력해주세요."
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                  onClick={handleVerificationSubmit}
                  type="button"
                  className="btn btn-outline btn-primary"
                  disabled={!verificationCode}
                >
                  인증번호 확인
                </button>
              </div>
              {/* 인증 관련 메시지 */}
              {verificationMessage && (
                <div
                  className={`${
                    isVerificationSuccess
                      ? "text-green-500 ml-14"
                      : "text-red-500 ml-14"
                  }`}
                >
                  {verificationMessage}
                </div>
              )}
            </div>
          )}

          {/* 비밀번호 입력 및 확인 */}
          <div className="space-y-4 mb-6">
            <div className="relative flex items-center gap-3">
              <div className="flex">
                <FaKey className="w-8 h-8" />
                <span className="text-red-500 pl-1">*</span>
              </div>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative flex items-center ml-14 gap-3">
              <input
                name="passwordCheck"
                type="password"
                className="input input-bordered w-full"
                placeholder="비밀번호를 한번 더 입력해주세요."
                value={passwordCheck}
                onChange={handleInputChange}
                onBlur={() => {
                  // 비밀번호 확인 핸들러를 onBlur 이벤트에서 호출
                  if (password && passwordCheck) {
                    setIsPasswordMatch(password === passwordCheck);
                  }
                }}
              />
            </div>
            {/* 비밀번호 일치 여부 메시지 */}
            {isPasswordMatch !== null && (
              <div
                className={`ml-14 mt-2 ${
                  isPasswordMatch ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPasswordMatch
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다."}
              </div>
            )}
          </div>

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
                className="input input-bordered w-full"
                placeholder="닉네임을 입력해주세요."
                value={nickname}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn btn-outline btn-primary"
                onClick={handleNicknameCheck}     
                disabled={!nickname.trim()}  // 닉네임이 빈 값일 때 버튼 비활성화           
              >
                중복 확인
              </button>
            </div>
            {/* 닉네임 유효성 메시지 */}
            {isNicknameValid !== null && (
              <div
                className={`ml-14 ${
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
                className="input input-bordered w-full"
                placeholder="생년월일을 입력해주세요. (선택) ex)YYYY-MM-DD"
                onChange={handleInputChange}
              />
            </div>
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
                className="select input-bordered w-full max-w-xs"
              >
                <option value="" disabled>
                  직업을 입력해주세요 (선택)
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

          {/* 제출 버튼 */}
          <div className="flex items-center justify-center mt-8">
            <button
              type="submit"
              className="btn btn-primary w-full max-w-xs"
              disabled={!isFormValid()}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpView;
