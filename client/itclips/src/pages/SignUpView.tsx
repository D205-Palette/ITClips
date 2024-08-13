import React, { useState, useEffect } from "react";
import {
  emailLogin,
  checkUserInfo,
  checkEmail,
  sendVerificationCode,
  verifyVerificationCode,
  checkNickname,
  signup,
} from "../api/authApi";

// 아이콘
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
import { authStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import toastStore from "../stores/toastStore";
import darkModeStore from "../stores/darkModeStore";

const SignUpView = () => {
  const {
    login,
    userInfo,
    fetchUserInfo,
    fetchUserToken,
    fetchUserId,
    fetchRefreshToken,
  } = authStore();
  const navigate = useNavigate();

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
  const [isMale, setIsMale] = useState<boolean | null>(null); // 성별 상태
  const [verificationCode, setVerificationCode] = useState(""); // 인증번호
  const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 발송 상태
  const [isVerificationSuccess, setIsVerificationSuccess] = useState<
    boolean | null
  >(null); // 인증 성공 여부
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null); // 닉네임 유효성
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null); // 비밀번호 일치 여부
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null); // 이메일 형식 유효성
  const [verificationMessage, setVerificationMessage] = useState(""); // 인증 관련 메시지
  const [birthdayMessage, setBirthdayMessage] = useState(""); // 생년월일 관련 메시지
  const [isBirthdayValid, setIsBirthdayValid] = useState<boolean | null>(null); // 생년월일 유효성
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState<
    boolean | null
  >(null); // 비밀번호 길이 유효성
  const [isNicknameLengthValid, setIsNicknameLengthValid] = useState<
    boolean | null
  >(null); // 닉네임 길이 유효성
  const { globalNotification, setGlobalNotification } = toastStore();
const {isDark} = darkModeStore()
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

  // 이메일 형식 검증
  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(email));
  }, [email]);

  // 비밀번호 확인 핸들러
  useEffect(() => {
    if (password && passwordCheck) {
      setIsPasswordMatch(password === passwordCheck);
      setIsPasswordLengthValid(password.length >= 8);
    } else {
      setIsPasswordMatch(null); // 비밀번호가 모두 입력되지 않은 경우
      setIsPasswordLengthValid(null); // 비밀번호 길이 검증 초기화
    }
  }, [password, passwordCheck]);

  // 닉네임 길이 검증
  useEffect(() => {
    if (nickname) {
      setIsNicknameLengthValid(nickname.length <= 10);
    } else {
      setIsNicknameLengthValid(null); // 닉네임이 입력되지 않은 경우 초기화
    }
  }, [nickname]);

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
      email !== "" && // 이메일 입력 완료
      isEmailValid === true && // 이메일 형식 검증
      isVerificationSuccess === true && // 이메일 인증 완료
      password !== "" && // 비밀번호 입력 완료
      password === passwordCheck && // 비밀번호 일치
      isPasswordLengthValid === true && // 비밀번호 길이 검증
      nickname !== "" && // 닉네임 입력 완료
      isNicknameValid === true && // 닉네임 유효성
      isNicknameLengthValid === true && // 닉네임 길이 검증
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

  // // 이메일 제출 핸들러
  const handleEmailSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 이메일 중복 체크
    checkEmail(email)
      .then((response) => {
        if (response.status === 200) {
          // 이메일 인증번호 발송 api 호출
          sendVerificationCode(email)
            .then((response) => {
              if (response.status === 200) {
                // 이메일 발송 성공 시 상태 업데이트
                setGlobalNotification({
                  message: "이메일로 인증번호를 발송하였습니다.",
                  type: "success",
                });
                setIsEmailSent(true);
                setIsVerificationSuccess(null); // 인증 성공 상태 초기화
                setVerificationMessage(""); // 인증 메시지 초기화
              } else {
                setGlobalNotification({
                  message: "이메일로 인증번호 발송을 실패하였습니다.",
                  type: "error",
                });
                setVerificationMessage("인증번호 발송을 실패하였습니다.");
              }
            })
            .catch((error) => {
              // 이메일 발송 실패 시 상태 업데이트
              setIsEmailSent(false);
              setVerificationMessage("인증번호 발송을 실패하였습니다.");
            });
        } else {
          // 이메일 중복 되었을 경우
          setVerificationMessage(
            "이메일이 중복 되었습니다. 다른 이메일을 입력해주세요."
          );
        }
      })
      .catch((error) => {
        setVerificationMessage(
          "이메일이 중복 되었습니다. 다른 이메일을 입력해주세요."
        );
        setGlobalNotification({
          message: "이메일이 중복 되었습니다. 다른 이메일을 입력해주세요.",
          type: "error",
        });
      });
  };

  // 인증번호 제출 핸들러
  const handleVerificationSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 이메일 인증번호 인증 api 호출
    verifyVerificationCode(email, verificationCode)
      .then((response) => {
        if (response.status === 200) {
          // 인증번호 확인 성공 시 상태 업데이트
          setIsVerificationSuccess(true);
          setVerificationMessage("인증이 완료되었습니다.");
        }
      })
      .catch((error) => {
        // 인증번호 확인 실패 시 상태 업데이트
        setIsVerificationSuccess(false);
        setVerificationMessage(
          "본인 인증에 실패하였습니다. 인증번호를 다시 입력해주세요."
        );
      });
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

  // 회원 가입 제출
  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userDataToSend = {
      email,
      password,
      nickname,
      birth: birthday,
      job,
      gender: isMale,
    };

    signup(userDataToSend)
      .then((response: any) => {
        if (response.status === 200) {
          setGlobalNotification({
            message: "회원가입을 완료하였습니다.",
            type: "success",
          });

          emailLogin(email, password)
            .then((response: any) => {
              if (response.status === 200) {
                fetchUserToken(response.data.accessToken); // 로컬 스토리지에 유저 토큰 업데이트
                fetchRefreshToken(response.data.refreshToken); // 로컬 스토리지에 리프레시 토큰 업데이트
                fetchUserId(response.data.userId); // 로컬 스토리지에 유저 아이디 업데이트
                checkUserInfo(response.data.userId, response.data.userId) // 유저 정보 불러 오기
                  .then((response) => {
                    fetchUserInfo(response.data); // 로컬 스토리지에 유저 정보 업데이트
                  });
                login(); // 로그인 상태 업데이트
                setGlobalNotification({
                  message: `환영합니다 ${userData.nickname}님!`,
                  type: "success",
                });
                navigate(`/user/${response.data.userId}`); // 로그인 후 페이지 이동
              }
            })
            .catch((error: any) => {});
        } else {
          return Promise.reject(
            new Error("회원가입에 실패했습니다. 다시 시도해 주세요.")
          );
        }
      })
      .catch((error: any) => {
        // 에러 처리
        setGlobalNotification({
          message: "회원가입에 실패하였습니다.",
          type: "error",
        });
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

  return (
    <div className="flex justify-center items-center bg-base-100">
      <div className="w-full max-w-4xl border rounded-lg shadow-lg p-6 bg-base-100">
        <h1 className="text-center text-2xl font-bold mb-6">회원가입</h1>

        <form onSubmit={handleSignupSubmit}>
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
                className={`input input-bordered w-full text-xs md:text-sm`}
                placeholder="아이디로 사용될 이메일을 입력해주세요."
                value={email}
                onChange={handleInputChange}
              />
              <button
                onClick={handleEmailSubmit}
                type="button"
                className="btn bg-sky-500 hover:bg-sky-700 text-slate-100"
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
                  className="input input-bordered w-full text-xs md:text-sm"
                  placeholder="인증번호를 입력해주세요."
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                  onClick={handleVerificationSubmit}
                  type="button"
                  className="btn bg-sky-500 hover:bg-sky-700 text-slate-100"
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
                className="input input-bordered w-full text-xs md:text-sm"
                placeholder="비밀번호를 입력해주세요. (최소 8자 이상)"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative flex items-center ml-14 gap-3">
              <input
                name="passwordCheck"
                type="password"
                className="input input-bordered w-full text-xs md:text-sm"
                placeholder="비밀번호를 한번 더 입력해주세요."
                value={passwordCheck}
                onChange={handleInputChange}
                onBlur={() => {
                  // 비밀번호 확인 핸들러를 onBlur 이벤트에서 호출
                  if (password && passwordCheck) {
                    setIsPasswordMatch(password === passwordCheck);
                    setIsPasswordLengthValid(password.length >= 8);
                  }
                }}
              />
            </div>
            {/* 비밀번호 유효성 메시지 */}
            {isPasswordLengthValid !== null && (
              <div
                className={`ml-14 mt-2 text-xs md:text-sm ${
                  isPasswordLengthValid ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPasswordLengthValid
                  ? "비밀번호 길이가 유효합니다."
                  : "비밀번호는 최소 8자 이상이어야 합니다."}
              </div>
            )}
            {/* 비밀번호 일치 여부 메시지 */}
            {isPasswordMatch !== null && (
              <div
                className={`ml-14 mt-2 text-xs md:text-sm ${
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
                className="input input-bordered w-full text-xs md:text-sm"
                placeholder="닉네임을 입력해주세요. (최대 10자 이내)"
                value={nickname}
                onChange={(e) => {
                  handleInputChange(e);
                  setIsNicknameValid(null); // 닉네임 입력이 변경될 때 중복 확인 상태를 초기화
                }}
              />
              <button
                type="button"
                className="btn bg-sky-500 hover:bg-sky-700 text-slate-100"
                onClick={handleNicknameCheck}
                disabled={!nickname.trim() || isNicknameLengthValid === false} // 닉네임이 빈 값이거나 길이 제한을 통과하지 못했을 때 버튼 비활성화
              >
                중복 확인
              </button>
            </div>
            {/* 닉네임 길이 유효성 메시지 */}
            {isNicknameLengthValid !== null && (
              <div
                className={`ml-14 mt-2 text-xs md:text-sm ${
                  isNicknameLengthValid ? "text-green-500" : "text-red-500"
                }`}
              >
                {isNicknameLengthValid
                  ? "닉네임 길이가 유효합니다."
                  : "닉네임은 최대 10자 이하이어야 합니다."}
              </div>
            )}
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
            <div className="flex items-center gap-3 ">
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
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpView;
