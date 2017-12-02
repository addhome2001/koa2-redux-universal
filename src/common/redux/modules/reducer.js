import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth/reducers';

export default combineReducers({
  auth,
  csrf: (state = '') => state,
  data: (state = []) => state,
  routing: routerReducer,
});
