import Master from '~/common/components/Master.jsx';
import About from '~/common/components/About.jsx';
import ErrorPage from '~/common/components/ErrorPage.jsx';
import NotFound from '~/common/components/NotFound.jsx';

// Container
import Login from '~/common/containers/Login.jsx';
import Profile from '~/common/containers/Profile.jsx';
import Home from '~/common/containers/Home.jsx';

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
