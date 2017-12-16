// Components
import Register from 'common/components/Pages/Register';

import * as Actions from 'common/redux/modules/auth/actions';

import SubmitController from './SubmitController';

export default SubmitController(
  Actions.registerAsync,
  Actions.setFailureMessage,
  Register,
);
