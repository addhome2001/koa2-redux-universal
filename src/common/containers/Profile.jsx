import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Btn from 'common/components/Btn';

import '../assets/css/app.css';

export class Profile extends PureComponent {

  static propTypes = {
    user: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <p styleName="mainText">Profile Page</p>
        <p styleName="normalText">Username： { user.username }</p>
        <Btn rootLink>Home</Btn>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.auth.user }),
)(Profile);
