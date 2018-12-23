/* eslint-disable no-underscore-dangle, no-undef */
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import clientMiddleware from 'common/redux/middleware/clientMiddleware';
import api from 'common/utils/api';

const devMiddleware = [];

if (process.env.__DEV__) {
  devMiddleware.push(
    require('redux-logger').createLogger({
      duration: true,
    }),
  );
}

export default (history) => {
  const middleware = [
    thunk,
    routerMiddleware(history),
    clientMiddleware(api),
    ...devMiddleware,
  ];
  return applyMiddleware(...middleware);
};
