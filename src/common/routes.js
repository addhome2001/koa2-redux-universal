import Master from 'common/components/Master';
import About from 'common/components/About';
import ErrorPage from 'common/components/ErrorPage';
import NotFound from 'common/components/NotFound';

// Container
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
      path: '*',
      component: NotFound,
    },
  ],
};

export default routes;
