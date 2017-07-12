/* eslint-disable no-underscore-dangle, no-undef */
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import clientMiddleware from 'common/redux/middlewares/client';
import api, { checkStatus } from 'common/utils/api';

const devMiddlewares = [];

if (process.env.__DEV__) {
  devMiddlewares.push(require('redux-logger')());
}

export default (history) => {
  const middlewares = [
    thunk,
    routerMiddleware(history),
    clientMiddleware({ api, checkStatus }),
    ...devMiddlewares,
  ];
  return applyMiddleware(...middlewares);
};
