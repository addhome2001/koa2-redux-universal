import { connect } from 'react-redux';

// Components
import ProfileField from 'common/components/Blocks/ProfileField';

export default connect(
  state => ({ user: state.auth.user }),
)(ProfileField);
