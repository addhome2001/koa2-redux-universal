// Components
import Login from 'common/components/Pages/Login';

import * as Actions from 'common/redux/modules/auth/actions';

import SubmitController from './SubmitController';

export default SubmitController(
  Actions.loginAsync,
  Actions.setFailureMessage,
  Login,
);
