import React, { useEffect } from "react";
import "./index.css";
import { Outlet, useLocation } from "react-router-dom";

import NavBar from "./components/nav/NavBar";
import { useWebSocketStore } from "./stores/webSocketStore";
import Footer from "./components/footer/Footer";

const App = () => {
  const connect = useWebSocketStore(state => state.connect);
  const disconnect = useWebSocketStore(state => state.disconnect);
  const location = useLocation();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

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
