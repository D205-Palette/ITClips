import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OauthKakao() {
  // 주소 파싱
  const code = new URL(window.location.href).searchParams.get("code");
  
  const [loginuser, setLoginUser] = useState({})
  const [IsLogin, setIsLogin] = useState(false)  
  const [nickname, setNickname] = useState("");

  function onKakaoLogin(code:any) {
    setIsLogin(true)  
  }

  useEffect(() => {
      onKakaoLogin(code);
    }, []);

  return (
  <div>
    OauthKakao
    <p>주소창 코드 : {code}</p>
  </div>
  );
}
