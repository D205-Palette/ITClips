import React from "react";
import MainTab from "./components/MainTab";
import { Route, Routes } from "react-router-dom";
import MyView from "./pages/MyView";
import "./index.css";
import { useStore } from "./stores/authStore";

// component
import NavBar from "./components/NavBar";
import AsideProfile from "./components/aside/AsideProfile";
import AsideBookmarkList from "./components/aside/AsideBookmarkList";
import AsideMessage from "./components/aside/AsideMessage";
// View
import Intro from "./pages/Intro";
import SignUpView from "./pages/SignUpView";

const App = () => {
  const isLogin = useStore((state) => state.isLoggedIn);

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <div className="container mx-auto px-4">
          <Routes>
            {isLogin ? (
              <Route path="/myview" element={<MyView />} />
            ) : (
              <>
                <Route path="/intro" element={<Intro />} />
                <Route path="/signup" element={<SignUpView />} />{" "}
              </>
            )}
          </Routes>
        </div>
      </header>

      <div className="grid grid-cols-8 gap-4">
        <div id="aside" className="col-start-2 col-span-2">
          <AsideMessage />
        </div>

        <div id="Main" className="col-start-4 col-span-4">
          <MainTab />
          <MyView />
        </div>
      </div>
    </div>
  );
};

export default App;
