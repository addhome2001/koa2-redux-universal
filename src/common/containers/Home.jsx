import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from 'common/redux/modules/auth/actions';

// Components
import Home from 'common/components/Pages/Home';

export default connect(
  state => ({
    userId: state.auth.user.id,
  }),
  dispatch => ({
    logout: bindActionCreators(Actions.logoutAsync, dispatch),
  }),
)(Home);
