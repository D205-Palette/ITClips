import { createBrowserRouter } from 'react-router-dom';
import MyBookmarkList from './pages/ProfileView/MyBookmarkList';
import MyGroupBookmarkList from './pages/ProfileView/MyGroupBookmarkList';
import MyFavorites from './pages/ProfileView/MyFavorites';
import MyRoadmap from './pages/ProfileView/MyRoadmap';
import FeedView from './pages/FeedView'
import SearchView from './pages/SearchView'
import Intro from './pages/Intro';
import SignupView from './pages/SignUpView'
import App from './App';
import ProfileView from './pages/ProfileView';
import MyBookmark from './pages/BookmarkView';
import RoadMapView from './pages/RoadmapView';
import Follower from './pages/FollowView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'user/:user_id',
        element : <ProfileView />,
        children: [
            {
              path: 'bookmarklist',
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
              element: <MyRoadmap />
            },
            {
              path: 'follower',
              element: <Follower />
            },
            {
              path: 'following',
              element: <Follower />
            },

        ],
      },
      {
        path: 'bookmarklist/:bookmarklist_id',
        element: <MyBookmark />
      },
      {
        path: 'bookmark/:bookmark_id',
        // element: <SearchView />
      },
      {
        path: 'roadmap/:roadmap_id',
        element: <RoadMapView />
      },
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
    ],
  },
]);

export default router;