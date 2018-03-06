import React from 'react';
import PropTypes from 'prop-types';
import Btn from 'common/components/Elements/Btn';
import Text from 'common/components/Elements/Text';

const NotFound = ({ staticContext }) => {
  if (staticContext) {
    staticContext.status = 404;
  }

  return (
    <React.Fragment>
      <Text>Page Not Found</Text>
      <Btn rootLink>Home</Btn>
    </React.Fragment>
  );
};

NotFound.defaultProps = {
  staticContext: {},
};

NotFound.propTypes = {
  staticContext: PropTypes.shape({}),
};

export default NotFound;
