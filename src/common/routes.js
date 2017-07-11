// Layouts
import Master from 'common/components/Layouts/Master';

// Containers
import Home from 'common/containers/Home';

const routes = {
  path: '/',
  component: Master,
  indexRoute: { component: Home },
  childRoutes: [
    {
      path: 'about',
      getComponent(nextState, cb) {
        import(/* webpackChunkName: 'about' */'./components/Pages/About').then(about =>
          cb(null, about.default),
        );
      },
    },
    {
      path: 'error',
      getComponent(nextState, cb) {
        import(/* webpackChunkName: 'errorPage' */'./components/Pages/ErrorPage').then(errorPage =>
          cb(null, errorPage.default),
        );
      },
    },
    {
      path: 'profile',
      getComponent(nextState, cb) {
        import(/* webpackChunkName: 'profile' */'./containers/Profile').then(profile =>
          cb(null, profile.default),
        );
      },
    },
    {
      path: 'login',
      getComponent(nextState, cb) {
        import(/* webpackChunkName: 'login' */'./containers/Login').then(login =>
          cb(null, login.default),
        );
      },
    },
    {
      // not yet
      path: 'register',
      getComponent(nextState, cb) {
        import(/* webpackChunkName: 'notFound' */'./components/Pages/NotFound').then(notFound =>
          cb(null, notFound.default),
        );
      },
    },
    {
      path: '*',
      onEnter: (nextState, replace) => replace('/'),
    },
  ],
};

export default routes;
