import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';

import * as Actions from 'common/redux/modules/auth/actions';

// Components
import Login from 'common/components/Pages/Login';

function selectorFactory(dispatch) {
  const submitFormAction = bindActionCreators(Actions.loginAsync, dispatch);
  let csrfCache;
  let result = {
    submitForm: csrf => (account) => {
      if (!csrf) throw new Error('csrf token was not found.');
      submitFormAction({ csrf, account });
    },
    setFailureMessage: bindActionCreators(Actions.setFailureMessage, dispatch),
  };

  return (nextState) => {
    const { auth: { loading, failureMessage }, csrf } = nextState;
    const nextResult = { loading, failureMessage };
    if (!csrfCache) {
      csrfCache = csrf;
      result.submitForm = result.submitForm(csrf);
    }
    if (JSON.stringify(nextResult) !== result) {
      result = Object.assign({}, result, nextResult);
    }
    return result;
  };
}

export default connectAdvanced(selectorFactory)(Login);
