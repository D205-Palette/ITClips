import React from "react";
import "./index.css";
import { Outlet } from "react-router-dom";

import NavBar from "./components/nav/NavBar";

const App = () => {
  return (
    <div className="App relative">
      <header className="App-header">
        <NavBar />
      </header>

      <main className="absolute top-16 w-full  ">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
