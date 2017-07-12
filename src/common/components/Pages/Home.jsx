import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'common/components/Elements/Alert';

// Components
import AuthFields from 'common/components/Blocks/AuthFields';
import Btn from 'common/components/Elements/Btn';

export class Home extends Component {

  static propTypes = {
    userId: PropTypes.string,
    logout: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    failureMessage: PropTypes.string,
    setFailureMessage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    userId: '',
    loading: false,
    failureMessage: '',
  }

  constructor(props) {
    super(props);
    this.logout = ::this.logout;
    this.resetFailureMessage = ::this.resetFailureMessage;
  }

  componentWillUnmount() {
    this.resetFailureMessage();
  }

  resetFailureMessage() {
    this.props.setFailureMessage();
  }

  logout() {
    this.props.logout();
  }

  render() {
    const { userId, loading, failureMessage } = this.props;

    return (
      <div>
        {
          failureMessage &&
          <Alert
            message={ failureMessage }
            closeHandler={ this.resetFailureMessage }
          />
        }
        { userId ?
          <div>
            <Btn purpose="/profile">Profile</Btn>
            <Btn purpose={ this.logout } disabled={ loading }>Logout</Btn>
          </div> :
          <AuthFields />
        }
        <Btn purpose="/about">About</Btn>
      </div>
    );
  }
}

export default Home;
