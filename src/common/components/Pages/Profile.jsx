import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Btn from 'common/components/Elements/Btn';
import Text from 'common/components/Elements/Text';

export class Profile extends PureComponent {

  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }).isRequired,
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Text>Profile Page</Text>
        <Text level="normal">{ `Username： ${user.username}` }</Text>
        <Btn rootLink>Home</Btn>
      </div>
    );
  }
}

export default Profile;
