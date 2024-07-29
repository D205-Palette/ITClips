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
import RoadmapView from "./pages/RoadmapView";
import FollowView from "./pages/ProfileView/FollowView";

// const changeIsFollow = mainTabStore((state) => state.changeIsFollow)
import RoadMapView from "./pages/RoadmapView";
import Follower from "./pages/ProfileView/FollowFollower";
import Following from "./pages/ProfileView/FollowFollowing";

import SocialSignUpView from "./pages/SocialSignUpView";
import MyView from "./pages/MyView/MyView";

import LoginView from "./pages/LoginView";
import EmailLoginView from "./pages/EmailLoginView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 서비스 소개 페이지
      {
        path: 'user/:user_id',
        element : <ProfileView />,
        children: [
            {
              // path: 'bookmarklist',
              index:true,
              element : <MyBookmarkList />
              
            },
            {
              path: 'groupbookmarklist',
              element : <MyGroupBookmarkList />
              },
            {
              path: 'favorites',
              element: <MyFavorites />
            },
            {
              path: 'roadmap',
              element: <MyRoadmap />,
            },
            {
              path: 'roadmap/:roadmap_id',
              element: <RoadmapView />
            },
            {
              path:'follow',
              element: <FollowView />,
              children:[
                {
                  path: 'follower',
                  element: <Follower />
                },
                {
                  path: 'following',
                  element: <Following />
                },
    
              ]
            }
           
        ],
      },
      {
        path: 'bookmarklist/:bookmarklist_id',
        element: <MyBookmark />
      },
      // {
      //   path: 'bookmark/:bookmark_id',
      //   element: <SearchView />
      // },
      
      {
        path: 'search',
        element: <SearchView />
      },
      {
        path: 'feed',
        element: <FeedView />
      },
      {
        path: 'intro',
        element: <Intro />
      },
      {
        path: 'signup',
        element: <SignupView />
      },
      {
        path: "login",
        element: <LoginView/>,        
      // Email 로그인 페이지
      },

      
    ],
  },
]);

export default router;
