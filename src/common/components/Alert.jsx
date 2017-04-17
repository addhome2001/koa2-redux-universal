import React from 'react';
import PropTypes from 'prop-types';
import styles from 'common/assets/css/app.css';

const Alert = ({ message, closeHandler }) =>
  <p className={ `${styles.alert} ${styles.alert_danger}` }>
    { message }
    <button
      type="button"
      onClick={ closeHandler }
      className={ styles.close }
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </p>;

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default Alert;
