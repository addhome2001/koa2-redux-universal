import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ error, timedOut, pastDelay, retry }) => {
  if (error) {
    return (
      <div>
        Error! <button onClick={retry}>Retry</button>
      </div>
    );
  } else if (timedOut) {
    return <div>Taking a long time...</div>;
  } else if (pastDelay) {
    return <div>Loading...</div>;
  }

  return null;
};

Loading.defaultProps = {
  error: false,
};

Loading.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  timedOut: PropTypes.bool.isRequired,
  pastDelay: PropTypes.bool.isRequired,
};

export default Loading;
