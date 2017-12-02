import { push, replace } from 'react-router-redux';
import Constants from './constants';

export function redirectAction({ client, location }) {
  return dispatch => dispatch({
    types: [
      Constants.LOADING,
      Constants.SET_USER_INFO,
      Constants.FAILURE_MESSAGE,
    ],
    client: api => client(api).then((response) => {
      setTimeout(() => dispatch(location), 100);
      return response;
    }),
  });
}

export function loginAsync(userInfo) {
  return redirectAction({
    client: api => api.auth.login(userInfo),
    location: push('/profile'),
  });
}

export function logoutAsync() {
  return redirectAction({
    client: api => api.auth.logout(),
    location: replace('/'),
  });
}

export function setFailureMessage({ message = '' } = {}) {
  return {
    type: Constants.FAILURE_MESSAGE,
    message,
  };
}
