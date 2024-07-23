import React, { useState } from "react";
import { navStore } from "../../stores/navStore";
import FindPasswordCompleteModal from "./FindPasswordCompleteModal"


const FindPasswordModal = () => {
  const [username, setUsername] = useState(""); // 아이디 상태 추가
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태 추가
  const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(false); // 비밀번호 재설정 성공 상태 추가

  const { modalState } = navStore();
  const { closeFindPasswordModal } = modalState;

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", { username, email });

    try {
      // 이메일 인증 로직 (API 호출을 가정)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 모의 API 호출
      setIsEmailSent(true); // 이메일이 성공적으로 발송되었다고 가정
      setErrorMessage(null); // 에러 메시지 초기화
    } catch (error) {
      setErrorMessage("이메일 발송에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Verification code submitted", verificationCode);

    try {
      // 인증번호 확인 로직 (API 호출을 가정)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 모의 API 호출
      setIsPasswordResetSuccess(true); // 비밀번호 재설정 성공 상태 설정
      setErrorMessage(null); // 에러 메시지 초기화

    } catch (error) {
      setErrorMessage("인증번호 검증에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeFindPasswordModal();
    }
  };

  // 비밀번호 찾기 테스트 로직
  const handleTestEmailSuccess = () => {
    setIsEmailSent(true);
    setErrorMessage("이메일 발송 성공"); // 성공 메시지
  };

  const handleTestPasswordResetSuccess = () => {
    setIsPasswordResetSuccess(true);
    setErrorMessage("임시 비밀번호 발급 성공"); // 성공 메시지
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-base-100 p-8 rounded-lg shadow-lg relative w-[801px] h-[654px]">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          본인인증에 사용될 아이디와 이메일을 입력해주세요.
        </h1>

        <form className="space-y-4 mb-4" onSubmit={handleEmailSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              required
              className="input input-bordered w-full"
              placeholder="아이디를 입력해주세요."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="flex">
              <input
                type="email"
                required
                className="input input-bordered flex-grow"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary ml-2">
                인증번호 발송
              </button>
            </div>
          </div>
        </form>

        {isEmailSent && (
          <form className="space-y-4" onSubmit={handleVerificationSubmit}>
            <div className="form-control">
              <input
                type="text"
                required
                className="input input-bordered"
                placeholder="인증번호를 입력해주세요."
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              임시 비밀번호 발급 받기
            </button>
          </form>
        )}

        {errorMessage && (
          <div className={`mt-4 ${errorMessage.includes('성공') ? 'text-green-500' : 'text-red-500'}`}>
            {errorMessage}
          </div>
        )}

        <button
          onClick={closeFindPasswordModal}
          className="absolute top-2 right-2 btn btn-ghost"
        >
          ×
        </button>

        <div className="space-y-2">
          <button onClick={handleTestEmailSuccess} className="btn btn-secondary">
            이메일 발송 성공
          </button>
          
          <button onClick={handleTestPasswordResetSuccess} className="btn btn-secondary">
            임시비밀번호 발급 성공
          </button>
        </div>
      </div>

       {/* 아이디 찾기 성공 모달 렌더링 */}
       {isPasswordResetSuccess && (
        <FindPasswordCompleteModal />
      )}

    </div>
  );
};

export default FindPasswordModal;
