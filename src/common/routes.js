// Layouts
import Master from 'common/components/Layouts/Master';

// Components
import Loadable from 'common/components/Loadable';

// Containers
import Home from 'common/containers/Home';
import RouteRender from 'common/components/RouteRender';

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
        component: Loadable(
          () => import(/* webpackChunkName: 'about' */'./components/Pages/About'),
        ),
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
        component: Loadable(
          () => import(/* webpackChunkName: 'profile' */'./containers/Profile'),
        ),
      },
      {
        path: '/login',
        exact: true,
        component: Loadable(
          () => import(/* webpackChunkName: 'login' */'./containers/Login'),
        ),
      },
      {
        // not yet
        path: '/register',
        exact: true,
        component: Loadable(
          () => import(/* webpackChunkName: 'notFound' */'./components/Pages/NotFound'),
        ),
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
