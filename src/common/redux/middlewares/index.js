import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

const devMiddlewares = [];

if (process.env.DEV) {
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
