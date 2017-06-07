// Layouts
import Master from 'common/components/Layouts/Master';

// Pages
import About from 'common/components/Pages/About';
import ErrorPage from 'common/components/Pages/ErrorPage';
import NotFound from 'common/components/Pages/NotFound';

// Containers
import Login from 'common/containers/Login';
import Profile from 'common/containers/Profile';
import Home from 'common/containers/Home';

const routes = {
  path: '/',
  component: Master,
  indexRoute: { component: Home },
  childRoutes: [
    {
      path: 'about',
      component: About,
    },
    {
      path: 'error',
      component: ErrorPage,
    },
    {
      path: 'profile',
      component: Profile,
    },
    {
      path: 'login',
      component: Login,
    },
    {
      // not yet
      path: 'register',
      component: NotFound,
    },
    {
      path: '*',
      onEnter: (nextState, replace) => replace('/'),
    },
  ],
};

export default routes;
