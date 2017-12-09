import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';

import * as Actions from 'common/redux/modules/auth/actions';

// Components
import Login from 'common/components/Pages/Login';

function selectorFactory(dispatch) {
  const submitFormAction = bindActionCreators(Actions.loginAsync, dispatch);
  let csrfCache;
  let result = {};
  const actions = {
    submitForm: csrf => (account) => {
      if (!csrf) throw new Error('csrf token was not found.');
      submitFormAction({ csrf, account });
    },
    setFailureMessage: bindActionCreators(Actions.setFailureMessage, dispatch),
  };

  return (nextState) => {
    const { auth, csrf } = nextState;
    const { user: { id }, loading, failureMessage } = auth;
    const isAuth = !!id;

    if (!csrfCache) {
      csrfCache = csrf;
      actions.submitForm = actions.submitForm(csrf);
    }

    const nextResult = {
      loading,
      failureMessage,
      isAuth,
      ...actions,
    };

    if (JSON.stringify(result) !== JSON.stringify(nextResult)) {
      result = Object.assign({}, result, nextResult);
    }

    return result;
  };
}

export default connectAdvanced(selectorFactory)(Login);
