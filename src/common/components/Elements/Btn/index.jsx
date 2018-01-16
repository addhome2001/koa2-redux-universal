import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Btn.css';

const Btn = ({ purpose, children, rootLink, external, disabled }) => {
  const btnStatus = `btn ${disabled ? 'disabled' : ''}`;

  if (rootLink) {
    return (
      <Link exact="true" styleName={btnStatus} to="/">
        {children}
      </Link>
    );
  }
  if (typeof purpose === 'string') {
    if (external) {
      return (
        <a href={purpose} styleName={btnStatus}>
          {children}
        </a>
      );
    }
    return (
      <Link to={purpose} styleName={btnStatus}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={(e) => !disabled && purpose(e)} styleName={btnStatus}>
      {children}
    </button>
  );
};

Btn.defaultProps = {
  rootLink: false,
  purpose: '/',
  external: false,
  disabled: false,
};

Btn.propTypes = {
  purpose: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.string.isRequired,
  rootLink: PropTypes.bool,
  external: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Btn;
