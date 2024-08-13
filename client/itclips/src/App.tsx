import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// styles
import "./index.css";

// components
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";

// stores
import { webSocketStore } from "./stores/webSocketStore";
import notificationStore from "./stores/notificationStore";
import { authStore } from "./stores/authStore";
import { chatStore } from "./stores/chatStore";
import toastStore from "./stores/toastStore";
// apis
import { connectNotificationStream } from "./api/notificationApi";

const App = () => {
  const navigate = useNavigate();
  const connect = webSocketStore((state) => state.connect);
  const disconnect = webSocketStore((state) => state.disconnect);
  const { addNotification, fetchNotifications } = notificationStore();
  const fetchRooms = chatStore((state) => state.fetchRooms);
  const updateTotalUnreadCount = chatStore(
    (state) => state.updateTotalUnreadCount
  );
  const { userId, isLoggedIn } = authStore();
  const location = useLocation();
  const { globalNotification, setGlobalNotification } = toastStore();

  // 로그인하지 않아도 접근 가능한 경로들
  const publicRoutes = ["/intro", "/", "/signup", "/socialsignup", "/login", "/oauth2/callback"];

  // 특정 경로에 따라 클래스 적용
  const isIntroPage = location.pathname === "/intro";

  // webSocket 연결하면서 채팅방 목록 조회 및 알림 가져오기
  useEffect(() => {
    const initializeChat = async () => {
      if (userId) {
        await fetchRooms(userId);
        updateTotalUnreadCount();
        connect();
        fetchNotifications(userId); // 로그인 시 알림 가져오기
      }
    };

    initializeChat();

    return () => disconnect();
  }, [connect, disconnect, fetchRooms, updateTotalUnreadCount, userId, fetchNotifications]);

  // 로그인 상태에 따른 리다이렉트 처리
  useEffect(() => {
    if (!userId && !publicRoutes.includes(location.pathname)) {
      // 현재 위치가 publicRoutes에 포함되지 않을 때만 리다이렉트
      navigate('/login', { replace: true });
      setGlobalNotification({
        message: "로그인 후 접근 가능한 페이지입니다.", // 알림 메시지 출력
        type: "error",
      });
    }
  }, [userId, location.pathname, navigate]); // 로그인 상태 변경 시 useEffect 실행

  // 토스트 알람 메뉴
  useEffect(() => {
    if (globalNotification) {
      const timer = setTimeout(() => {
        setGlobalNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [globalNotification]);

  // sse 연결
  useEffect(() => {
    if (userId) {
      const eventSource = connectNotificationStream(userId);

      eventSource.onmessage = (event) => {
        const newNotification = JSON.parse(event.data);
        addNotification({ ...newNotification, read: false }); // 새 알림을 읽지 않은 상태로 추가
      };

      return () => {
        eventSource.close();
      };
    }
  }, [userId, addNotification]);

  return (
    <div className="App flex flex-col justify-between min-h-screen">
      <header className="App-header">
        <NavBar />
      </header>

      <main className="mt-16 w-full min-h-96">
        <Outlet />
      </main>

      <footer
        className={`${isIntroPage ? "" : "mt-32"} ${
          isLoggedIn ? (window.innerWidth >= 768 ? "" : "mb-20") : ""
        }`}
      >
        <Footer />
      </footer>

      {/* 토스트 알림창 */}
      {globalNotification && (
        <div
          className={`fixed bottom-12 left-1/2 transform -translate-x-1/2 p-4 rounded-md ${
            globalNotification.type === "success"
              ? "bg-sky-400"
              : "bg-red-500"
          } text-white shadow-lg z-50 transition-opacity duration-300`}
        >
          {globalNotification.message}
        </div>
      )}
    </div>
  );
};

export default App;
