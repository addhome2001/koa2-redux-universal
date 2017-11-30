// Layouts
import Master from 'common/components/Layouts/Master';

// Containers
import Home from 'common/containers/Home';
import About from 'common/components/Pages/About';
import ErrorPage from 'common/components/Pages/ErrorPage';
import Profile from 'common/containers/Profile';
import Login from 'common/containers/Login';
import NotFound from 'common/components/Pages/NotFound';
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
        component: About,
        // getComponent(nextState, cb) {
        //   import(/* webpackChunkName: 'about' */'./components/Pages/About').then(about =>
        //     cb(null, about.default),
        //   );
        // },
      },
      {
        path: '/error',
        exact: true,
        component: ErrorPage,
        // getComponent(nextState, cb) {
        //   import(/* webpackChunkName: 'errorPage' */'./components/Pages/ErrorPage').then(errorPage =>
        //     cb(null, errorPage.default),
        //   );
        // },
      },
      {
        path: '/profile',
        exact: true,
        component: Profile,
        // getComponent(nextState, cb) {
        //   import(/* webpackChunkName: 'profile' */'./containers/Profile').then(profile =>
        //     cb(null, profile.default),
        //   );
        // },
      },
      {
        path: '/login',
        exact: true,
        component: Login,
        // getComponent(nextState, cb) {
        //   import(/* webpackChunkName: 'login' */'./containers/Login').then(login =>
        //     cb(null, login.default),
        //   );
        // },
      },
      {
        // not yet
        path: '/register',
        exact: true,
        component: NotFound,
        // getComponent(nextState, cb) {
        //   import(/* webpackChunkName: 'notFound' */'./components/Pages/NotFound').then(notFound =>
        //     cb(null, notFound.default),
        //   );
        // },
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];

export default routes;
