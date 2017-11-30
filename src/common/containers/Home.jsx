import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';

import * as Actions from 'common/redux/modules/auth/actions';

// Components
import Home from 'common/components/Pages/Home';

function selectorFactory(dispatch) {
  let result = {
    logout: bindActionCreators(Actions.logoutAsync, dispatch),
    resetFailureMessage: bindActionCreators(Actions.setFailureMessage, dispatch),
  };

  return (nextState) => {
    const { user: { id }, loading, failureMessage } = nextState.auth;
    const nextResult = {
      isAuth: !!id,
      loading,
      failureMessage,
    };

    if (JSON.stringify(nextResult) !== result) {
      result = Object.assign({}, result, nextResult);
    }

    return result;
  };
}

export default connectAdvanced(selectorFactory)(Home);
