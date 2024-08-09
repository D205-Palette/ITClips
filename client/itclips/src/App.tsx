import React, { useEffect } from "react";
import "./index.css";
import { Outlet } from "react-router-dom";

import NavBar from "./components/nav/NavBar";

// stores
import { useWebSocketStore } from "./stores/webSocketStore";
import notificationStore from "./stores/notificationStore";
import { authStore } from "./stores/authStore";

// apis
import { connectNotificationStream } from "./api/notificationApi";

const App = () => {

  const connect = useWebSocketStore(state => state.connect);
  const disconnect = useWebSocketStore(state => state.disconnect);
  const { addNotification } = notificationStore();
  const userId = authStore(state => state.userId);

  // webSocket 연결
  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

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

  return (
    <div className="App relative">
      <header className="App-header">
        <NavBar />
      </header>

      <main className="absolute top-16 w-full">
        <Outlet />
      </main>

    </div>
  );
};

export default App;
