// Layouts
import Master from 'common/components/Layouts/Master';

// Components
import Loadable from 'common/components/Loadable';
import RouteRender from 'common/components/RouteRender';

// Pages
import Home from 'common/components/Pages/Home';

const routes = [
  {
    component: RouteRender(Master),
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/about',
        exact: true,
        component: Loadable(() =>
          import(/* webpackChunkName: 'about' */ './components/Pages/About'),
        ),
      },
      {
        path: '/error',
        component: Loadable(() =>
          import(/* webpackChunkName: 'errorPage' */ './components/Pages/ErrorPage'),
        ),
      },
      {
        path: '*',
        component: Loadable(() =>
          import(/* webpackChunkName: 'notFound' */ './components/Pages/NotFound'),
        ),
      },
    ],
  },
];

export default routes;
