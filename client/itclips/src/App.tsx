import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import "./index.css";
import { navStore } from "./stores/navStore";
import { asideStore } from "./stores/asideStore";

// component
import NavBar from "./components/nav/NavBar";
import AsideProfile from "./components/aside/AsideProfile"
import MessageLayout from "./components/aside/MessageLayout";
import AsideBookmarkList from "./components/aside/AsideBookmarkList";
// View
import Intro from "./pages/Intro";
import SignUpView from "./pages/SignUpView";
import MyView from "./pages/ProfileView";
import MyGroupBookmarkList from './pages/ProfileView/MyGroupBookmarkList';
import MyFavorites from './pages/ProfileView/MyFavorites';
import MyRoadmap from './pages/ProfileView/MyRoadmap';
import FeedView from './pages/FeedView'
import SearchView from './pages/SearchView'
import MyBookmarkList from "./pages/ProfileView/MyBookmarkList";
import tabStore from './stores/categoriesStore'
import MyBookmark from "./pages/BookmarkView";

const App = () => {
  const isMessageOpen = asideStore(state => state.isMessageOpen);
  const isLogin = navStore((state) => state.isLoggedIn);


  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>

      {/* Body단*/}
      {/* <Routes>

        <Route path="intro" element={<Intro />} />
        <Route path="signup" element={<SignUpView />} />
        
        my탭의 하위 라우터들
        <Route path="my" element={<MyView />}>
          <Route path="bookmarklist" element={<MyBookmarkList />} >
            <Route path="1" element={<MyBookmark />} />
          </Route>
          <Route path="groupbookmarklist" element={<MyGroupBookmarkList />} />
          <Route path="favorites" element={<MyFavorites />} />
          <Route path="roadmap" element={<MyRoadmap />} />
        </Route>

        <Route path="search" element={<SearchView />} />
        <Route path="feed" element={<FeedView />} />

      </Routes> */}
      <Outlet />

        

    </div>
  );
};

export default App;
