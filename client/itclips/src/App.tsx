import React, { useEffect } from "react";
import "./index.css";
import { Outlet } from "react-router-dom";

import NavBar from "./components/nav/NavBar";
import { useWebSocketStore } from "./stores/webSocketStore";
import Footer from "./components/footer/Footer";

const App = () => {

  const connect = useWebSocketStore(state => state.connect);
  const disconnect = useWebSocketStore(state => state.disconnect);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <div className="App min-h-full">
      <header className="App-header">
        <NavBar />
      </header>

      <aside>

      </aside>
      
      <main className="mt-16 w-full ">
        <Outlet />
      </main>
      
      <footer className="mt-16">
        <Footer/>
      </footer>

    </div>
  );
};

export default App;
