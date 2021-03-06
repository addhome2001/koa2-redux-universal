import { createStore } from 'redux';

import createRootReducer from 'common/redux/modules/reducer';
import applyMiddleware from 'common/redux/middleware/applyMiddleware';

export default function(history, initialState = {}) {
  const reducer = createRootReducer(history);
  const store = createStore(reducer, initialState, applyMiddleware(history));

  if (module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer').default);
    });
  }

  return store;
}
