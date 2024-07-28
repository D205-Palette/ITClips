import React, { useState } from "react";
import axios from "axios";
import { navStore } from "../../stores/navStore";
import FindPasswordCompleteModal from "./FindPasswordCompleteModal";

const FindPasswordModal: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState<boolean>(false);
  
  const togglePasswordReset = navStore((state) => state.togglePasswordReset);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/send-verification-code", { username, email });
      setIsEmailSent(true);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("이메일 발송에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/verify-code", { verificationCode });
      setIsPasswordResetSuccess(true);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("인증번호 검증에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      togglePasswordReset();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-base-100 p-8 rounded-lg shadow-lg relative w-[801px] h-[654px]">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          비밀번호 찾기
        </h1>

        <form className="space-y-4 mb-4" onSubmit={handleEmailSubmit}>
          <div className="space-y-4">            
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
          className="absolute top-2 right-2 btn btn-ghost"
          onClick={togglePasswordReset}
        >
          ×
        </button>
      </div>

      {isPasswordResetSuccess && (
        <FindPasswordCompleteModal />
      )}
    </div>
  );
};

export default FindPasswordModal;
