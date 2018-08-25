import * as Actions from 'common/redux/modules/auth/actions';

import FormController from './FormController';

export default (RegisterForm) =>
  FormController(
    Actions.registerAsync,
    Actions.setFailureMessage,
    RegisterForm,
  );