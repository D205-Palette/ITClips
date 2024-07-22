import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";

// component
import NavBar from "./components/NavBar";

// View
import Intro from "./pages/Intro";
import SignUpView from "./pages/SignUpView";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavBar />
          <div className="container mx-auto px-4">
            <Routes>
              <Route path="/intro" element={<Intro />} />
              <Route path="/signup" element={<SignUpView />} />
            </Routes>
          </div>
        </header>

        <aside>
          
        </aside>

        <main>
        </main>

      </div>
    </BrowserRouter>
  );
};

export default App;
