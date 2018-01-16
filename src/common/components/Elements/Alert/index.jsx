import React from 'react';
import PropTypes from 'prop-types';

import './Alert.css';

const Alert = ({ message, closeHandler }) => (
  <p styleName="alert alert_danger">
    {message}
    <button
      type="button"
      onClick={closeHandler}
      styleName="close"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </p>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default Alert;
