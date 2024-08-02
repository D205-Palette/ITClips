// HomeView.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Intro from "./Intro";
import { authStore } from "../stores/authStore";

export default function HomeView() {
  const { isLoggedIn, userInfo, userId } = authStore(); // Zustand 상태에서 사용자 정보 가져오기
  const navigate = useNavigate(); // useNavigate 훅 선언

  useEffect(() => {
    if (isLoggedIn && userInfo && userId ) {
      // 로그인 상태일 때 사용자 페이지로 리다이렉트
      navigate(`/user/${userId}`);
    }
  }, [isLoggedIn, userInfo, userId, navigate]); // 로그인 상태 변경 시 useEffect 실행

  return (
    <>
      {/* 로그인되지 않았을 때만 Intro 컴포넌트 렌더링 */}
      {!isLoggedIn && <Intro />}
    </>
  );
}
