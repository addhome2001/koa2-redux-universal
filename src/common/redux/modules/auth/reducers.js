import Constants from './constants';

const initialState = {
  user: {},
  failureMessage: '',
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.SET_USER_INFO:
      return Object.assign({}, state, {
        user: action.result,
        loading: false,
      });
    case Constants.FAILURE_MESSAGE:
      return Object.assign({}, state, {
        failureMessage: action.message,
        loading: false,
      });
    case Constants.LOADING:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
}
