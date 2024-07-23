import React, { useState } from "react";
import axios from "axios";
import { navStore } from "../../stores/navStore";
import FindIdCompleteModal from "./FindIdCompleteModal";

const FindIdModal = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string>("");

  const { modalState } = navStore();
  const { closeFindIdModal, openFindIdCompleteModal } = modalState;

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await axios.post("/user/email", { email });
      setIsEmailSent(true);
      setErrorMessage(true);
    } catch (error) {
      setErrorMessage(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await axios.get("/user/idInquiry", {
        params: { email, code: verificationCode },
      });
      setUserId(response.data.userId);
      openFindIdCompleteModal();
    } catch (error) {
      setErrorMessage(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeFindIdModal();
    }
  };


  // 아이디 찾기 테스트 로직
  const handleTestEmailSuccess = () => {
    setIsEmailSent(true);
    setErrorMessage(true);
  };

  const handleTestFindIdSuccess = () => {
    setUserId("testUserId");
  };

  return (
    <div>
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
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

          {errorMessage !== null && (
            <div
              className={`mt-4 ${
                errorMessage === true ? "text-green-500" : "text-red-500"
              }`}
            >
              {errorMessage === true
                ? "이메일로 인증번호를 발송했습니다. 확인 후 인증번호를 입력해주세요."
                : "인증번호 발송을 실패했습니다. 다시 시도해 주세요."}
            </div>
          )}

          <button
            onClick={closeFindIdModal}
            className="absolute top-2 right-2 btn btn-ghost"
          >
            ×
          </button>

          {/* 테스트 버튼 */}
          <div className="space-y-2">
            <button
              onClick={handleTestEmailSuccess}
              className="btn btn-secondary"
            >
              이메일 발송 성공
            </button>

            <button
              onClick={handleTestFindIdSuccess}
              className="btn btn-secondary"
            >
              아이디 찾기 성공
            </button>
          </div>
        </div>
      </div>

      {/* 아이디 찾기 성공 모달 렌더링 */}
      {userId && (
        <FindIdCompleteModal FindedId={userId} setUserId={setUserId} />
      )}
    </div>
  );
};

export default FindIdModal;
