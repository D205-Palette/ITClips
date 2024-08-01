import { createBrowserRouter } from "react-router-dom";
import MyBookmarkList from "./pages/ProfileView/MyBookmarkList";
import MyGroupBookmarkList from "./pages/ProfileView/MyGroupBookmarkList";
import MyFavorites from "./pages/ProfileView/MyFavorites";
import MyRoadmap from "./pages/ProfileView/MyRoadmap";
import FeedView from "./pages/FeedView";
import SearchView from "./pages/SearchView";
import Intro from "./pages/Intro";
import SignupView from "./pages/SignUpView";
import App from "./App";
import ProfileView from "./pages/ProfileView";
import MyBookmark from "./pages/BookmarkView";
import RoadmapView from "./pages/RoadmapDetailView";
import FollowView from "./pages/ProfileView/FollowView";

// const changeIsFollow = mainTabStore((state) => state.changeIsFollow)
import RoadMapView from "./pages/RoadmapDetailView";
import Follower from "./pages/ProfileView/FollowFollower";
import Following from "./pages/ProfileView/FollowFollowing";

import SocialSignUpView from "./pages/SocialSignUpView";

import LoginView from "./pages/LoginView";
import { Children } from "react";
import OAuthNaver from "./components/login/oauth/OauthNaver";
import OauthGoogle from "./components/login/oauth/OauthGoogle";
import OauthKakao from "./components/login/oauth/OauthKakao";
import OauthGithub from "./components/login/oauth/OauthGithub";

import NewBookmarkLists from "./components/feed/NewBookmarkLists";
import NewRoadmaps from "./components/feed/NewRoadmaps";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 서비스 소개 페이지
      {
        path: "user/:user_id",
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
      {
        path: "roadmap/:roadmap_id",
        element: <RoadmapView />,
      },
      {
        path: "bookmarklist/:bookmarklist_id",
        element: <MyBookmark />,
      },
      // {
      //   path: 'bookmark/:bookmark_id',
      //   element: <SearchView />
      // },

      {
        path: "search",
        element: <SearchView />,
      },
      {
        path: "feed",
        element: <FeedView />,
        children: [
          {
            path: "newBookmarkLists",
            element: <NewBookmarkLists />,
          },
          {
            path: "newRoadmaps",
            element: <NewRoadmaps />,
          },
        ]
      },
      {
        path: "intro",
        element: <Intro />,
      },
      {
        path: "signup",
        element: <SignupView />,
      },
      {
        path: "socialsignup",
        element: <SocialSignUpView />,
      },
      {
        path: "login",
        element: <LoginView />,
        // Email 로그인 페이지
      },
      {
        path: "oauth/callback",
        children:[
          {
            path: "naver",
            element: <OAuthNaver/>            
          },
          {
            path: "google",
            element: <OauthGoogle/>
          },
          {
            path: "kakao",
            element: <OauthKakao/>
          },
          {
            path: "github",
            element: <OauthGithub/>
          },
        ] 
      },
    ],
  },
]);

export default router;
