/* eslint-disable no-underscore-dangle, no-undef */
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

const devMiddleware = [];

if (process.env.__DEV__) {
  devMiddleware.push(require('redux-logger')());
}

export default (history) => {
  const middleware = [thunk, routerMiddleware(history), ...devMiddleware];
  return applyMiddleware(...middleware);
};
