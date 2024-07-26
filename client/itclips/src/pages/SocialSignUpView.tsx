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
    job: "",
  });

  const { id, email, password, passwordCheck, nickname, birthday, job } =
    userData;

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
      isNicknameValid === true && // 닉네임 중복 체크 완료
      birthday.trim() !== "" && // 생년월일 입력 완료
      job.trim() !== "" && // 직업 입력 완료
      gender.trim() !== "" // 성별 선택 완료
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
    setIsNicknameValid(true);

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
    console.log(name, value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100 p-5">
      <div className="w-full max-w-4xl border rounded-lg shadow-lg p-8">
        <h1 className="text-center text-3xl font-bold mb-8">소셜 회원가입</h1>

        <form onSubmit={() => {}}>
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

export default SignUpView;
