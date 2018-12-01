import { replace } from 'react-router-redux';
import Constants from './constants';

export function loginAsync(userInfo) {
  return (dispatch) => {
    dispatch({
      types: [
        Constants.LOADING,
        Constants.SET_USER_INFO,
        Constants.FAILURE_MESSAGE,
      ],
      client: (api) =>
        api.auth.login(userInfo).then((me) => {
          setTimeout(() => dispatch(replace('/')), 100);

          return me;
        }),
    });
  };
}

export function logoutAsync() {
  return (dispatch) => {
    dispatch({
      types: [
        Constants.LOADING,
        Constants.CLEAR_USER_INFO,
        Constants.FAILURE_MESSAGE,
      ],
      client: (api) =>
        api.auth.logout().then((message) => {
          setTimeout(() => dispatch(replace('/')), 100);

          return message;
        }),
    });
  };
}

export function registerAsync(userInfo) {
  return (dispatch) => {
    dispatch({
      types: [
        Constants.LOADING,
        Constants.SET_USER_INFO,
        Constants.FAILURE_MESSAGE,
      ],
      client: (api) =>
        api.auth.register(userInfo).then((me) => {
          setTimeout(() => dispatch(replace('/')), 100);

          return me;
        }),
    });
  };
}

export function forgotPasswordAsync(info) {
  return (dispatch) => {
    dispatch({
      types: [Constants.LOADING, Constants.LOADED, Constants.FAILURE_MESSAGE],
      client: (api) =>
        api.auth.forgotPassword(info).then((message) => {
          setTimeout(() => dispatch(replace('/forgot/mailed')), 100);

          return message;
        }),
    });
  };
}

export function resetPasswordAsync(info) {
  return (dispatch, getState) => {
    const {
      routing: {
        location: { pathname },
      },
    } = getState();
    const [token] = pathname.split('/').reverse();

    dispatch({
      types: [Constants.LOADING, Constants.LOADED, Constants.FAILURE_MESSAGE],
      client: (api) =>
        api.auth
          .resetPassword({
            token,
            ...info,
          })
          .then((message) => {
            setTimeout(() => dispatch(replace('/')), 100);

            return message;
          }),
    });
  };
}

export function setFailureMessage(message) {
  return {
    type: Constants.FAILURE_MESSAGE,
    message: typeof message === 'string' ? message : '',
  };
}
