import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';

export default ({ routes, store, location, context }) =>
  renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>,
  );
