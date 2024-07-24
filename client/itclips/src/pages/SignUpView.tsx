import React, { useState } from "react";
import {
  FaRegUser,
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

const SignUpView = () => {
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    birthday: "",
    job: ""
  });

  const { id, email, password, passwordCheck, nickname, birthday, job } = userData;

  const [gender, setGender] = useState(""); // 성별 상태  
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerificationSuccess, setIsVerificationSuccess] = useState<
    boolean | null
  >(null);  
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);

  const isFormValid = () => {
    return (
      isEmailSent === true && // 이메일 인증번호 발송 완료
      isVerificationSuccess === true && // 이메일 인증 완료
      password === passwordCheck && password !== "" && // 비밀번호 일치 및 비밀번호 입력 완료
      isNicknameValid === true && // 닉네임 중복 체크 완료
      birthday.trim() !== "" && // 생년월일 입력 완료
      job.trim() !== "" && // 직업 입력 완료
      gender.trim() !== "" // 성별 선택 완료
    )
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
  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEmailSent(true);
    setIsVerificationSuccess(null);
    // 이메일 인증 로직

    //   try {
    //     await axios.post("/user/email", { email });
    //     setIsEmailSent(true);
    //   } catch (error) {
    //     setIsEmailSent(false);
    //   }
  };

  // 인증번호 제출 핸들러
  const handleVerificationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsVerificationSuccess(true);

    // 인증번호 확인 로직
    // try {
    //   await axios.get("/user/idInquiry", {
    //     params: { email, code: verificationCode },
    //   });
    //   setIsVerificationSuccess(true);
    // } catch (error) {
    //   setIsVerificationSuccess(false);
    // }
  };

  // 비밀번호 확인 핸들러
  const handlePasswordChange = () => {
    if (password && passwordCheck) {
      setIsPasswordMatch(password === passwordCheck);
    }
  };

  // 닉네임 중복 확인 핸들러
  const handleNicknameCheck = async () => {
    setIsNicknameValid(true)

    // 닉네임 중복 확인 로직
    // try {
    //   const response = await axios.get("/user/nickname", {
    //     params: { nickname },
    //   });
    //   setIsNicknameValid(response.data.isValid);
    // } catch (error) {
    //   setIsNicknameValid(false);
    // }
  };

  // 입력 값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    console.log(name, value)
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-5">
      <div className="w-full max-w-4xl bg-base-100 rounded-lg shadow-lg p-8">
        <h1 className="text-center text-3xl font-bold mb-8">회원가입</h1>

        <form className="space-y-6" onSubmit={handleEmailSubmit}>

          {/* 이메일 입력창 */}

          <div className="flex items-center gap-3">
            <CiMail className="w-8 h-8 " />
            <input
              name="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="아이디로 사용될 이메일을 입력해주세요."
              value={email}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="btn btn-outline btn-primary"              
              disabled={!email}
            >
              본인 인증
            </button>
          </div>
        </form>

        {isEmailSent !== null && (
          <div className="mt-4">
            {isEmailSent ? (
              <div className="text-green-500">인증번호가 발송되었습니다.</div>
            ) : (
              <div className="text-red-500">
                인증번호 발송에 실패하였습니다.
              </div>
            )}
          </div>
        )}

        {isEmailSent && (
          <form className="space-y-4" onSubmit={handleVerificationSubmit}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 " />
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="인증번호를 입력해주세요."
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-outline btn-primary"
                disabled={!verificationCode}
              >
                인증번호 확인
              </button>
            </div>
          </form>
        )}

        {isVerificationSuccess !== null && (
          <div className="mt-4">
            {isVerificationSuccess ? (
              <div className="text-green-500">인증이 완료되었습니다.</div>
            ) : (
              <div className="text-red-500">
                본인 인증에 실패하였습니다. 인증번호를 다시 입력해주세요.
              </div>
            )}
          </div>
        )}

        {/* 비밀번호 입력창 */}
        <div className="relative flex items-center gap-3">
          <FaKey className="w-8 h-8 " />
          <input
            name="password"
            type="password"
            className="input input-bordered w-full"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative flex items-center gap-3">
          <div className="w-8 h-8 " />
          <input
            name="passwordCheck"
            type="password"
            className="input input-bordered w-full"
            placeholder="비밀번호를 한번 더 입력해주세요."
            value={passwordCheck}
            onChange={handleInputChange}
            onBlur={handlePasswordChange} // 비밀번호 확인
          />
        </div>
        {isPasswordMatch !== null && (
          <div
            className={`mt-2 ${
              isPasswordMatch ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPasswordMatch
              ? "비밀번호가 일치합니다."
              : "비밀번호가 일치하지 않습니다."}
          </div>
        )}

        {/* 닉네임 입력창 */}
        <div className="flex items-center gap-3">
          <FaAddressCard className="w-8 h-8 " />
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
            className={`mt-2 ${
              isNicknameValid ? "text-green-500" : "text-red-500"
            }`}
          >
            {isNicknameValid
              ? "닉네임 중복 확인 완료."
              : "입력하신 닉네임은 사용 중입니다."}
          </div>
        )}

        {/* 생년월일 입력창 */}
        <div className="flex items-center gap-3">
          <FaRegCalendarAlt className="w-8 h-8 " />

          <input           
            name="birthday" 
            type="text"
            value={birthday}
            className="input input-bordered w-full"
            placeholder="YYYY-MM-DD"
            onChange={handleInputChange}
          />
        </div>

        {/* 직업 입력창 */}
        <div className="flex items-center gap-3">
          <MdOutlineWorkOutline className="w-8 h-8 " />
          <input
            name="job"
            type="text"
            value={job}
            className="input input-bordered w-full"
            placeholder="직업을 입력해주세요."
            onChange={handleInputChange}
          />
        </div>

        {/* 성별 선택 */}
        <div className="flex items-center gap-3">
          <FaTransgender className="w-8 h-8 " />
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
          <button type="submit" className="btn btn-primary w-full max-w-xs" disabled={!isFormValid()}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpView;
