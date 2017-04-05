import Constants from './constants';

const initialState = {
  user: {},
  failureMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.SET_USER_INFO:
      return Object.assign({}, state, { user: action.user });
    case Constants.FAILURE_MESSAGE:
      return Object.assign({}, state, { failureMessage: action.message });
    default:
      return state;
  }
}
