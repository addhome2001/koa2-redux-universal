// Components
import LoginForm from 'common/components/Blocks/LoginForm';

import * as Actions from 'common/redux/modules/auth/actions';

import FormController from './FormController';

export default FormController(
  Actions.loginAsync,
  Actions.setFailureMessage,
  LoginForm,
);
