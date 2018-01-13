import * as Actions from 'common/redux/modules/auth/actions';

import FormController from './FormController';

export default LoginForm => FormController(
  Actions.loginAsync,
  Actions.setFailureMessage,
  LoginForm,
);
