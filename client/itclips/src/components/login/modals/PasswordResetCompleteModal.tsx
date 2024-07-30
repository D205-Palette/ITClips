import React from "react";
import { useNavigate } from "react-router-dom";
import { navStore } from "../../../stores/navStore";

const PasswordResetCompleteModal = () => {
  const { setEmailLoginOpen, setPasswordResetOpen } = navStore();
  const navigate = useNavigate();
  const toLogin = () => {
    setPasswordResetOpen(false);
    setEmailLoginOpen(true);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="text-center bg-base-100 p-8 rounded-lg shadow-md w-full max-w-md border">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          임시비밀번호 받기 성공
        </h1>
        <button className="btn " onClick={toLogin}>
          로그인 하러 가기
        </button>
      </div>
    </div>
  );
};

export default PasswordResetCompleteModal;
