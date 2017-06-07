import React from 'react';
import PropTypes from 'prop-types';

import './Text.css';

const Text = ({ children, level }) =>
  <p styleName={ level }>{ children }</p>;

Text.defaultProps = {
  level: 'main',
};

Text.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.string,
};

export default Text;
