import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Intro from "./pages/Intro";
import SignupView from "./pages/SignUpView";
import SocialSignUpView from "./pages/SocialSignUpView";
import MyView from "./pages/MyView/MyView";
import MyBookmarkList from "./pages/MyView/MyBookmarkList";
import MyGroupBookmarkList from "./pages/MyView/MyGroupBookmarkList";
import MyFavorites from "./pages/MyView/MyFavorites";
import MyRoadmap from "./pages/MyView/MyRoadmap";
import FeedView from "./pages/FeedView";
import SearchView from "./pages/SearchView";
import LoginView from "./pages/LoginView"
import EmailLoginView from "./pages/EmailLoginView"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 서비스 소개 페이지
      {
        path: "/intro",
        element: <Intro />,
      },
      // 로그인 페이지
      {
        path: "login",
        element: <LoginView/>,        
      // Email 로그인 페이지
      },
      {
        path: "emaillogin",
        element: <EmailLoginView/>
      },
      // 일반 회원가입 페이지
      {
        path: "/signup",
        element: <SignupView />,
      },
      // 소셜 회원가입 페이지
      {
        path: "/socialsignup",
        element: <SocialSignUpView />,
      },
      // MY 페이지
      {
        path: "/my",
        element: <MyView />,
        children: [
          {
            path: "",
            element: <MyBookmarkList />,
          },
          {
            path: "groupbookmarklist",
            element: <MyGroupBookmarkList />,
          },
          {
            path: "favorites",
            element: <MyFavorites />,
          },
          {
            path: "roadmap",
            element: <MyRoadmap />,
          },
        ],
      },
      // 검색 페이지
      {
        path: "/search",
        element: <SearchView />,
      },
      // 피드 페이지
      {
        path: "/feed",
        element: <FeedView />,
      },
    ],
  },
]);

export default router;
