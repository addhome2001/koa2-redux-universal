import { replace } from 'react-router-redux';
import Constants from './constants';

export function redirectAction({ client, redirect }) {
  return dispatch => dispatch({
    types: [
      Constants.LOADING,
      Constants.SET_USER_INFO,
      Constants.FAILURE_MESSAGE,
    ],
    client,
    successful: () =>
      setTimeout(() => dispatch(redirect),
      100,
    ),
  });
}

export function loginAsync(userInfo) {
  return redirectAction({
    client: api => api.auth.login(userInfo),
    redirect: replace('/'),
  });
}

export function logoutAsync() {
  return redirectAction({
    client: api => api.auth.logout(),
    redirect: replace('/'),
  });
}

export function registerAsync(userInfo) {
  return redirectAction({
    client: api => api.auth.register(userInfo),
    redirect: replace('/'),
  });
}

export function setFailureMessage(message) {
  return {
    type: Constants.FAILURE_MESSAGE,
    message: typeof message === 'string' ? message : '',
  };
}
