import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'react-router-redux';

import routes from 'common/routes';
import store, { history } from './store';

export default class Root extends Component {
  render() {
    if (!this.routeConfig) {
      this.routeConfig = routes;
    }

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </Provider>
    );
  }
}
