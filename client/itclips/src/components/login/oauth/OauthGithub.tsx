import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OauthGithub() {
    // 주소 파싱
    const code = new URL(window.location.href).searchParams.get("code");
  
    const [loginuser, setLoginUser] = useState({})
    const [IsLogin, setIsLogin] = useState(false)  
    const [nickname, setNickname] = useState("");
  
    function onGithubLogin(code:any) {
      setIsLogin(true)  
    }

    useEffect(() => {
        onGithubLogin(code);
      }, []);

    return (
    <div>
      OauthGithub
      <p>주소창 코드 : {code}</p>
    </div>
    );
}
