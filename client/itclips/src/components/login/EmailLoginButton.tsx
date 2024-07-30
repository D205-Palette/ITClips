import React from "react";
import { navStore } from "../../stores/navStore";

export default function EmailLoginButton() {
  const { setLoginListOpen, setEmailLoginOpen } = navStore();

  const clickEmailLogin = () => {
    setLoginListOpen(false)
    setEmailLoginOpen(true)    
  }
  return (
    <button
      onClick={clickEmailLogin}
      type="button"
      className="btn btn-outline bg-base-100 w-3/4 "
    >
      <p>이메일 로그인</p>
    </button>
  );
}
