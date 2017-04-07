import { push, replace } from 'react-router-redux';
import { login, logout } from 'client/utils/api/auth';
import Constants from './constants';

export function setUserInfo(user = {}) {
  return {
    type: Constants.SET_USER_INFO,
    user,
  };
}

export function setFailureMessage({ message } = { message: '' }) {
  return {
    type: Constants.FAILURE_MESSAGE,
    message,
  };
}

export function resolveSucessful(user) {
  return dispatch =>
    Promise.resolve(dispatch(setUserInfo(user)));
}

export function logoutAsync() {
  return dispatch =>
    logout().then(([ok, response]) => {
      if (ok) {
        return dispatch(resolveSucessful())
          .then(() => dispatch(replace('/')));
      }
      return dispatch(setFailureMessage(response));
    });
}

export function loginAsync(userInfo) {
  return (dispatch, getState) => {
    const { csrf } = getState();
    if (!csrf) {
      return dispatch(setFailureMessage('csrf token is not found.'));
    }
    return login(userInfo, csrf)
      .then(([ok, response]) => {
        if (ok) {
          return dispatch(resolveSucessful(response))
            .then(() => dispatch(push('/profile')));
        }
        return dispatch(setFailureMessage(response));
      })
      .catch(() => dispatch(setFailureMessage('Connection Failure.')));
  };
}
