import { createStore } from 'redux';

import reducer from '~/common/redux/modules/reducer';
import middlewares from '~/common/redux/middlewares';

export default function (history, initialState = {}) {
  return createStore(reducer, initialState, middlewares(history));
}
