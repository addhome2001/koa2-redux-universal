import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from 'common/redux/modules/auth/actions';

// Components
import AuthFields from 'common/components/AuthFields';
import Btn from 'common/components/Btn';

export class Home extends Component {

  static propTypes = {
    userId: PropTypes.string,
    logout: PropTypes.func.isRequired,
  }

  static defaultProps = {
    userId: '',
  }

  constructor(props) {
    super(props);
    this.logout = ::this.logout;
  }

  logout() {
    this.props.logout();
  }

  render() {
    const { userId } = this.props;

    return (
      <div>
        { userId ?
          <div>
            <Btn purpose="/profile">Profile</Btn>
            <Btn purpose={ this.logout }>Logout</Btn>
          </div> :
          <AuthFields />
        }
        <Btn purpose="/about">About</Btn>
      </div>
    );
  }
}

export default connect(
  state => ({
    userId: state.auth.user.id,
  }),
  dispatch => ({
    logout: bindActionCreators(Actions.logoutAsync, dispatch),
  }),
)(Home);
