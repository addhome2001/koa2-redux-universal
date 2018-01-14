import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'common/components/Elements/Alert';

// Container
import HomeContainer from 'common/containers/Home';

// Components
import AuthFields from 'common/components/Blocks/AuthFields';
import Btn from 'common/components/Elements/Btn';

class Home extends Component {

  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    failureMessage: PropTypes.string,
    resetFailureMessage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    loading: false,
    failureMessage: '',
  }

  componentWillUnmount() {
    const { failureMessage, resetFailureMessage } = this.props;
    return failureMessage && resetFailureMessage();
  }

  render() {
    const {
      isAuth,
      loading,
      logout,
      failureMessage,
      resetFailureMessage,
    } = this.props;

    return (
      <div>
        {
          failureMessage &&
          <Alert
            message={ failureMessage }
            closeHandler={ resetFailureMessage }
          />
        }
        { isAuth ?
          <div>
            <Btn purpose="/profile">Profile</Btn>
            <Btn purpose="/about">About</Btn>
            <Btn purpose={ logout } disabled={ loading }>Logout</Btn>
          </div> :
          <AuthFields />
        }
      </div>
    );
  }
}

export default HomeContainer(Home);
