import * as Actions from 'common/redux/modules/auth/actions';

import FormController from './FormController';

export default (ResetForm) =>
  FormController(
    Actions.resetPasswordAsync,
    Actions.setFailureMessage,
    ResetForm,
  );
