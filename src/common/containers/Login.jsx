import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Login from 'common/components/Pages/Login';

import * as Actions from 'common/redux/modules/auth/actions';

export default connect(
  state => ({
    failureMessage: state.auth.failureMessage,
  }),
  dispatch => ({
    submitForm: bindActionCreators(Actions.loginAsync, dispatch),
    setFailureMessage: bindActionCreators(Actions.setFailureMessage, dispatch),
  }),
)(Login);
