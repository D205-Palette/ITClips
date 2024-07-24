import { createBrowserRouter } from 'react-router-dom';
import MyBookmarkList from './pages/MyView/MyBookmarkList';
import MyGroupBookmarkList from './pages/MyView/MyGroupBookmarkList';
import MyFavorites from './pages/MyView/MyFavorites';
import MyRoadmap from './pages/MyView/MyRoadmap';
import FeedView from './pages/FeedView'
import SearchView from './pages/SearchView'
import Intro from './pages/Intro';
import SignupView from './pages/SignUpView'
import App from './App';
import MyView from './pages/MyView/MyView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/my',
        element : <MyView />,
        children: [
            {
              path: '',
            },
            {
                path: 'groupbookmarklist',
              },
              {
                path: 'favorites',
              },
              {
                path: 'roadmap',
              },

        ],
      },
      {
        path: '/search',
      },
      {
        path: '/feed',
      },
      {
        path: '/intro',
      },
      {
        path: '/signup',
      },
    ],
  },
]);

export default router;