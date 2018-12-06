import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader';

import routes from 'common/routes';
import store, { history } from './store';

class App extends Component {
  render() {
    if (!this.routeConfig) {
      this.routeConfig = routes;
    }

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {renderRoutes(this.routeConfig)}
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default hot(module)(App);
