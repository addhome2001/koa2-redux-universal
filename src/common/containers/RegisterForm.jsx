// Components
import RegisterForm from 'common/components/Blocks/RegisterForm';

import * as Actions from 'common/redux/modules/auth/actions';

import FormController from './FormController';

export default FormController(
  Actions.registerAsync,
  Actions.setFailureMessage,
  RegisterForm,
);
