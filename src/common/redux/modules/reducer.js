import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth/reducer';

export default (history) =>
  combineReducers({
    auth,
    csrf: (state = '') => state,
    data: (state = []) => state,
    router: connectRouter(history),
  });
