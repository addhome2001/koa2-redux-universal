import { replace } from 'react-router-redux';
import Constants from './constants';

export function redirectAction({ client, successfulConstant, redirect }) {
  return (dispatch) =>
    dispatch({
      types: [Constants.LOADING, successfulConstant, Constants.FAILURE_MESSAGE],
      client: (api) => setTimeout(() => dispatch(redirect), 100) && client(api),
    });
}

export function loginAsync(userInfo) {
  return redirectAction({
    client: (api) => api.auth.login(userInfo),
    successfulConstant: Constants.SET_USER_INFO,
    redirect: replace('/'),
  });
}

export function logoutAsync() {
  return redirectAction({
    client: (api) => api.auth.logout(),
    successfulConstant: Constants.CLEAR_USER_INFO,
    redirect: replace('/'),
  });
}

export function registerAsync(userInfo) {
  return redirectAction({
    client: (api) => api.auth.register(userInfo),
    successfulConstant: Constants.SET_USER_INFO,
    redirect: replace('/'),
  });
}

export function forgotPasswordAsync(info) {
  return redirectAction({
    client: (api) => api.auth.forgotPassword(info),
    successfulConstant: Constants.LOADED,
    redirect: replace('/forgot/mailed'),
  });
}

export function resetPasswordAsync(info) {
  return (dispatch, getState) => {
    const { routing: { location: { pathname } } } = getState();
    const [token] = pathname.split('/').reverse();

    dispatch(
      redirectAction({
        client: (api) =>
          api.auth.resetPassword({
            token,
            ...info,
          }),
        successfulConstant: Constants.LOADED,
        redirect: replace('/'),
      }),
    );
  };
}

export function setFailureMessage(message) {
  return {
    type: Constants.FAILURE_MESSAGE,
    message: typeof message === 'string' ? message : '',
  };
}
