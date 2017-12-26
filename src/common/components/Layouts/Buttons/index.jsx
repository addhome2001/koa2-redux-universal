import React from 'react';
import PropTypes from 'prop-types';

// CSS
import './Buttons.css';

const Buttons = ({ direction, children }) => (
  <div styleName={ `btns ${direction}` }>
    { children }
  </div>
);

Buttons.propTypes = {
  direction: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.element,
  ).isRequired,
};

Buttons.defaultProps = {
  direction: 'row',
};

export default Buttons;
