import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';

import * as Actions from 'common/redux/modules/auth/actions';

function selectorFactory(dispatch) {
  const logoutAction = bindActionCreators(Actions.logoutAsync, dispatch);
  const resetFailureMessageAction = bindActionCreators(
    Actions.setFailureMessage,
    dispatch,
  );
  const actions = {
    logout: logoutAction,
    resetFailureMessage: resetFailureMessageAction,
  };
  let result = {};

  return (nextState) => {
    const { user: { id }, loading, failureMessage } = nextState.auth;
    const nextResult = {
      isAuth: !!id,
      loading,
      failureMessage,
      ...actions,
    };

    if (JSON.stringify(result) !== JSON.stringify(nextResult)) {
      result = Object.assign({}, result, nextResult);
    }

    return result;
  };
}

export default connectAdvanced(selectorFactory);
