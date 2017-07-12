import { push, replace } from 'react-router-redux';
import Constants from './constants';

export function loginAsync(userInfo) {
  return dispatch => dispatch({
    types: [Constants.LOADING, Constants.SET_USER_INFO, Constants.FAILURE_MESSAGE],
    client: api => api.auth.login(userInfo),
    callback: () => dispatch(push('/profile')),
  });
}

export function logoutAsync() {
  return dispatch => dispatch({
    types: [Constants.LOADING, Constants.SET_USER_INFO, Constants.FAILURE_MESSAGE],
    client: api => api.auth.logout(),
    callback: () => dispatch(replace('/')),
  });
}

export function setFailureMessage({ message } = { message: '' }) {
  return {
    type: Constants.FAILURE_MESSAGE,
    message,
  };
}
