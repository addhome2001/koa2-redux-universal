import { createStore } from 'redux';

import reducer from 'common/redux/modules/reducer';
import middlewares from 'common/redux/middlewares';

export default function(history, initialState = {}) {
  const store = createStore(reducer, initialState, middlewares(history));

  if (module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer').default);
    });
  }

  return store;
}
