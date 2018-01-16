import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import StaticRouter from 'react-router-dom/StaticRouter';

export default (view, store, location, context) =>
  renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        {view}
      </StaticRouter>
    </Provider>,
  );
