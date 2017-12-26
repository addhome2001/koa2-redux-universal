import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';

export default function (submitAction, failureAction, component) {
  function selectorFactory(dispatch) {
    const submitFormAction = bindActionCreators(submitAction, dispatch);
    const setFailureMessageAction = bindActionCreators(failureAction, dispatch);
    const actions = {
      submitForm: csrf => (account) => {
        if (!csrf) throw new Error('csrf token was not found.');
        submitFormAction({ csrf, account });
      },
      setFailureMessage: setFailureMessageAction,
    };
    let csrfCache;
    let result = {};

    return (nextState, nextOwnProps) => {
      const { auth, csrf } = nextState;
      const { loading = false, failureMessage = '' } = auth;

      if (!csrfCache) {
        csrfCache = csrf;
        actions.submitForm = actions.submitForm(csrf);
      }

      const nextResult = {
        loading,
        failureMessage,
        ...actions,
        ...nextOwnProps,
      };

      if (JSON.stringify(result) !== JSON.stringify(nextResult)) {
        result = Object.assign({}, result, nextResult);
      }

      return result;
    };
  }

  return connectAdvanced(selectorFactory)(component);
}
