import React, { useEffect } from "react";
import "./index.css";
import { Outlet, useLocation } from "react-router-dom";

// components
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";

// stores
import { useWebSocketStore } from "./stores/webSocketStore";
import notificationStore from "./stores/notificationStore";
import { authStore } from "./stores/authStore";
import { chatStore } from "./stores/chatStore";

// apis
import { connectNotificationStream } from "./api/notificationApi";

const App = () => {
  const connect = useWebSocketStore(state => state.connect);
  const disconnect = useWebSocketStore(state => state.disconnect);
  const { addNotification } = notificationStore();
  const fetchRooms = chatStore(state => state.fetchRooms);
  const userId = authStore(state => state.userId);
  const location = useLocation();

  // webSocket 연결
  useEffect(() => {
    if (userId) {
      connect();
      fetchRooms(userId);
    }
    return () => disconnect();
  }, [connect, disconnect, fetchRooms, userId]);

  // sse 연결
  useEffect(() => {
    if (userId) {
      const eventSource = connectNotificationStream(userId);

      eventSource.onmessage = (event) => {
        const newNotification = JSON.parse(event.data);
        addNotification(newNotification);
      };

      return () => {
        eventSource.close();
      };
    }
  }, [userId]);
  
  // 특정 경로에 따라 클래스 적용
  const isIntroPage = location.pathname === '/intro'; // '/intro'를 인트로 페이지 경로로 변경

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
