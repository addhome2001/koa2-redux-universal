/* eslint-disable no-underscore-dangle, no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app';

const render = (Root) => {
  ReactDOM.render(
    <AppContainer>
      <Root />
    </AppContainer>,
    document.getElementById('container'),
  );
};

render(App);

if (process.env.__DEV__) {
  // Waiting for React16
  // window.Perf = require('react-addons-perf');

  if (module.hot) {
    module.hot.accept('./app', () => {
      const NextApp = require('./app').default;
      render(NextApp);
    });
  }
}
