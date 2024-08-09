import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

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

// apis
import { connectNotificationStream } from "./api/notificationApi";

const App = () => {
  const connect = webSocketStore(state => state.connect);
  const disconnect = webSocketStore(state => state.disconnect);
  const { addNotification, fetchNotifications } = notificationStore();
  const fetchRooms = chatStore(state => state.fetchRooms);
  const updateTotalUnreadCount = chatStore(state => state.updateTotalUnreadCount);
  const { userId, isLoggedIn } = authStore();
  const location = useLocation();
  // 특정 경로에 따라 클래스 적용
  const isIntroPage = location.pathname === '/intro'; // '/intro'를 인트로 페이지 경로로 변경

  // webSocket 연결하면서 채팅방 목록 조회 및 알림 가져오기
  useEffect(() => {
    const initializeChat = async () => {
      if (userId) {
        await fetchRooms(userId);
        updateTotalUnreadCount();
        connect();
        fetchNotifications(userId);  // 로그인 시 알림 가져오기
      }
    };

    initializeChat();

    return () => disconnect();
  }, [connect, disconnect, fetchRooms, updateTotalUnreadCount, userId, fetchNotifications]);

  // sse 연결
  useEffect(() => {
    if (userId) {
      const eventSource = connectNotificationStream(userId);

      eventSource.onmessage = (event) => {
        const newNotification = JSON.parse(event.data);
        addNotification({...newNotification, read: false});  // 새 알림을 읽지 않은 상태로 추가
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
      
      <main className="mt-16 w-full">
        <Outlet />
      </main>
      
      <footer className={isIntroPage ? "" : "mt-16"}>
        <Footer />
      </footer>

    </div>
  );
};

export default App;
