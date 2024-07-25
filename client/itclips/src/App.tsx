import React from "react";
import "./index.css";
import { Outlet } from "react-router-dom";

import NavBar from "./components/nav/NavBar";

const App = () => {  
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
