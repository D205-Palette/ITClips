import React, { useState } from "react";
import { navStore } from "../../stores/navStore";

const FindIdCompleteModal = () => {
  // const { modalState } = navStore();
  // const { closeFindPasswordCompleteModal, closeFindPasswordModal } = modalState;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {      
      // closeFindPasswordModal();
    }
  };
  const toLogin = () => {
    // closeFindPasswordModal();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-base-100 p-8 rounded-lg shadow-lg relative w-[801px] h-[654px]">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          임시비밀번호 받기 성공
        </h1>
        <button className="btn " onClick={toLogin}>
          로그인 하러 가기
        </button>
      <button
          // onClick={closeFindPasswordModal}
          className="absolute top-2 right-2 btn btn-ghost"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default FindIdCompleteModal;
