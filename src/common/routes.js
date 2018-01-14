// Layouts
import Master from 'common/components/Layouts/Master';

// Components
import Loadable from 'common/components/Loadable';
import RouteRender from 'common/components/RouteRender';

// Pages
import Home from 'common/components/Pages/Home';

// Containers
import AuthWrapper from 'common/containers/AuthWrapper';

const routes = [
  {
    component: RouteRender(Master),
    routes: [
      {
        path: '/',
        exact: true,
        component: RouteRender(Home),
      },
      {
        path: '/about',
        exact: true,
        component: AuthWrapper(Loadable(
          () => import(/* webpackChunkName: 'about' */'./components/Pages/About'),
        ), true),
      },
      {
        path: '/error',
        exact: true,
        component: Loadable(
          () => import(/* webpackChunkName: 'errorPage' */'./components/Pages/ErrorPage'),
        ),
      },
      {
        path: '/profile',
        exact: true,
        component: AuthWrapper(Loadable(
          () => import(/* webpackChunkName: 'profile' */'./components/Pages/Profile'),
        ), true),
      },
      {
        path: '/login',
        exact: true,
        component: AuthWrapper(Loadable(
          () => import(/* webpackChunkName: 'login' */'./components/Pages/Login'),
        ), false),
      },
      {
        path: '/register',
        exact: true,
        component: AuthWrapper(Loadable(
          () => import(/* webpackChunkName: 'register' */'./components/Pages/Register'),
        ), false),
      },
      {
        path: '/forgot',
        component: AuthWrapper(Loadable(
          () => import(/* webpackChunkName: 'forgot' */'./components/Pages/ForgotPassword'),
        ), false),
      },
      {
        path: '*',
        component: Loadable(
          () => import(/* webpackChunkName: 'notFound' */'./components/Pages/NotFound'),
        ),
      },
    ],
  },
];

export default routes;
