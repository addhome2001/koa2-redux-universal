import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import AuthFields from 'common/components/Blocks/AuthFields';
import Btn from 'common/components/Elements/Btn';

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

export default Home;
