import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from '~/common/routes';
import { store, history } from './store';

export default class Root extends Component {
  render() {
    if (!this.routeConfig) {
      this.routeConfig = routes;
    }

    return (
      <Provider store={ store }>
        <Router history={ history } routes={ this.routeConfig } />
      </Provider>
    );
  }
}
