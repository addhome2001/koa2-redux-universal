/* eslint-disable no-underscore-dangle, no-undef */
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';

const devMiddleware = [];

if (process.env.__DEV__) {
  devMiddleware.push(
    require('redux-logger').createLogger({
      duration: true,
    }),
  );
}

export default (history) => {
  const middleware = [thunk, routerMiddleware(history), ...devMiddleware];
  return applyMiddleware(...middleware);
};
