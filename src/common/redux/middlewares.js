/* eslint-disable no-underscore-dangle, no-undef */
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

const devMiddlewares = [];

if (process.env.__DEV__) {
  devMiddlewares.push(require('redux-logger')());
}

export default (history) => {
  const middlewares = [
    thunk,
    routerMiddleware(history),
    ...devMiddlewares,
  ];
  return applyMiddleware(...middlewares);
};
