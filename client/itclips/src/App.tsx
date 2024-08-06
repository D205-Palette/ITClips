import React, { useEffect } from "react";
import "./index.css";
import { Outlet } from "react-router-dom";

import NavBar from "./components/nav/NavBar";
import { useWebSocketStore } from "./stores/webSocketStore";

const App = () => {

  const connect = useWebSocketStore(state => state.connect);
  const disconnect = useWebSocketStore(state => state.disconnect);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

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
