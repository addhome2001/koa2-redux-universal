import React from 'react';
import PropTypes from 'prop-types';
import Text from 'common/components/Elements/Text';

const ProfileField = ({ user }) => (
  <div>
    <Text>Profile Page</Text>
    <Text level="normal">{`Username： ${user.username}`}</Text>
  </div>
);

ProfileField.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default ProfileField;
