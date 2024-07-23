import React, { useState } from "react";

const FindIdModal = () => {
  const [username, setUsername] = useState(""); // 아이디 상태 추가
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", { username, email });
    // 여기에 이메일 인증 로직을 추가하세요.
    // 예: API 호출을 통해 인증 이메일 발송
    setIsEmailSent(true); // 이메일이 성공적으로 발송되었다고 가정
  };

  const handleVerificationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Verification code submitted", verificationCode);
    // 여기에 인증번호 확인 로직을 추가하세요.
    // 예: API 호출을 통해 인증번호 확인
  };

  return (
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
    </div>
  );
};

export default FindIdModal;