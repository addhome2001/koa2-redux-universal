import * as Actions from 'common/redux/modules/auth/actions';

import FormController from './FormController';

export default ForgotForm => FormController(
  Actions.forgotPasswordAsync,
  Actions.setFailureMessage,
  ForgotForm,
);
