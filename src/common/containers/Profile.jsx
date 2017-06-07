import { connect } from 'react-redux';

// Components
import Profile from 'common/components/Pages/Profile';

export default connect(
  state => ({ user: state.auth.user }),
)(Profile);
