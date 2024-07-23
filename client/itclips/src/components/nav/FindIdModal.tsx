import React, { useState } from "react";
import axios from 'axios';
import { navStore } from '../../stores/navStore';

const FindIdModal = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // 상태 추가
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  const closeFindIdModal = navStore(state => state.closeFindIdModal);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // 이전 에러를 초기화

    try {
      await axios.post('/user/email', { email });
      console.log("Email submitted for verification", email);
      setIsEmailSent(true);
    } catch (error) {
      console.error("Failed to send verification email", error);
      // 입력한 이메일이 가입되지 않았거나 이메일을 잘못 입력한 경우
      setError("이메일 발송에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // 이전 에러를 초기화

    try {
      // 인증번호 확인 API 호출
      const response = await axios.get('/user/email', {
        params: { email, code: verificationCode }
      });
      console.log("Verification code submitted", response.data);
      // 인증 성공 시 추가 로직 (예: 성공 메시지, 사용자 인터페이스 업데이트)
    } catch (error) {
      console.error("Failed to verify code", error);
      setError("인증번호 확인에 실패했습니다. 올바른 인증번호를 입력했는지 확인해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeFindIdModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-base-100 p-8 rounded-lg shadow-lg relative w-[801px] h-[654px]">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          본인인증에 사용될 이메일을 입력해주세요.
        </h1>

        <form className="space-y-4 mb-4" onSubmit={handleEmailSubmit}>
          <div className="flex">
            <input
              type="email"
              required
              className="input input-bordered flex-grow"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary ml-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "발송 중..." : "인증번호 발송"}
            </button>
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

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "검증 중..." : "아이디 찾기"}
            </button>
          </form>
        )}

        {error && (
          <div className="text-red-500 mt-4">
            {error}
          </div>
        )}

        <button
          onClick={closeFindIdModal}
          className="absolute top-2 right-2 btn btn-ghost"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default FindIdModal;
