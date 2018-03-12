import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  foo: (state = 'bar') => state,
  data: (state = []) => state,
  routing: routerReducer,
});
