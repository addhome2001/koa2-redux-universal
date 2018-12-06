import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export default (history) =>
  combineReducers({
    foo: (state = 'bar') => state,
    data: (state = []) => state,
    router: connectRouter(history),
  });
