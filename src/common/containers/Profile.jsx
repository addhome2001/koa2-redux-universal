import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import styles from '~/common/assets/css/app.css';
import Btn from '~/common/components/Btn.jsx';

export class Profile extends PureComponent {

  static propTypes = {
    user: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <p className={ styles.mainText } >Profile Page</p>
        <p className={ styles.normalText }>Username： { user.username }</p>
        <Btn rootLink>Home</Btn>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.auth.user }),
)(Profile);
