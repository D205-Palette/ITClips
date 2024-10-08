// React Router
import { createBrowserRouter } from "react-router-dom";

// Views
import Intro from "./pages/Intro";
import SignupView from "./pages/SignUpView";
import LoginView from "./pages/LoginView";
import SocialSignUpView from "./pages/SocialSignUpView";
import HomeView from "./pages/HomeView";
import FeedView from "./pages/FeedView";
import SearchView from "./pages/SearchView";
import ProfileView from "./pages/ProfileView";
import MyBookmarkList from "./pages/ProfileView/MyBookmarkList";
import MyGroupBookmarkList from "./pages/ProfileView/MyGroupBookmarkList";
import MyFavorites from "./pages/ProfileView/MyFavorites";
import MyRoadmap from "./pages/ProfileView/MyRoadmap";
import FollowView from "./pages/ProfileView/FollowView";
import Follower from "./components/follow/FollowerList";
import Following from "./components/follow/FollowingList";
import MyBookmark from "./pages/BookmarkView";
import RoadmapView from "./pages/RoadmapDetailView";
import RoadmapCreateView from "./pages/RoadmapCreateView";
import RoadmapEditView from "./pages/RoadmapEditView";

// Components
import App from "./App";
import Oauth2 from "./components/login/oauth/Oauth2";
import FeedBookmarkLists from "./components/feed/FeedBookmarkLists";
import FeedRoadmaps from "./components/feed/FeedRoadmaps";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 홈페이지
      {
        path: "",
        element: <HomeView />,
      },
      // 서비스 소개 페이지
      {
        path: "/intro",
        element: <Intro />,
      },
      // 로그인 후 홈페이지(MY)
      {
        path: "user/:userId",
        element: <ProfileView />,
        children: [
          {
            // path: 'bookmarklist',
            index: true,
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
          {
            path: "follow",
            element: <FollowView />,
            children: [
              {
                path: "follower",
                element: <Follower />,
              },
              {
                path: "following",
                element: <Following />,
              },
            ],
          },
        ],
      },
      // 로드맵 생성 페이지
      {
        path: "roadmap/create",
        element: <RoadmapCreateView/>
      },
      // 로드맵 상세 페이지
      {
        path: "roadmap/:roadmapId",
        element: <RoadmapView />,
      },
      // 로드맵 수정 페이지
      {
        path: "roadmap/:roadmapId/edit",
        element: <RoadmapEditView />,
      },
      // 북마크리스트 상세 페이지
      {
        path: "bookmarklist/:bookmarklistId",
        element: <MyBookmark />,
      },
      // 피드 페이지
      {
        path: "feed",
        element: <FeedView />,
        children: [
          {
            path: "",
            element: <FeedBookmarkLists />,
          },
          {
            path: "BookmarkLists",
            element: <FeedBookmarkLists />,
          },
          {
            path: "Roadmaps",
            element: <FeedRoadmaps />,
          },
        ],
      },
      // 검색 페이지
      {
        path: "search",
        element: <SearchView />,
      },
      // 일반 회원가입 페이지
      {
        path: "signup",
        element: <SignupView />,
      },
      // 소셜 회원가입 페이지
      {
        path: "socialsignup",
        element: <SocialSignUpView />,
      },
      // 로그인 페이지
      {
        path: "login",
        element: <LoginView />,
      },
      // 소셜 로그인 리다이렉트 페이지
      {
        path: "oauth2/callback",
        element: <Oauth2 />,
      },
    ],
  },
]);

export default router;
