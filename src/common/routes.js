// Layouts
import Master from 'common/components/Layouts/Master';

// Components
import Loadable from 'common/components/Loadable';
import RouteRender from 'common/components/RouteRender';

// Containers
import Home from 'common/containers/Home';
import isAuthHOC from 'common/containers/isAuthHOC';

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
        component: isAuthHOC(Loadable(
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
        component: isAuthHOC(Loadable(
          () => import(/* webpackChunkName: 'profile' */'./containers/Profile'),
        ), true),
      },
      {
        path: '/login',
        exact: true,
        component: isAuthHOC(Loadable(
          () => import(/* webpackChunkName: 'login' */'./containers/Login'),
        ), false),
      },
      {
        // not yet
        path: '/register',
        exact: true,
        component: isAuthHOC(Loadable(
          () => import(/* webpackChunkName: 'notFound' */'./components/Pages/NotFound'),
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
