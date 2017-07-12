import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

import './Btn.css';

const Btn = ({ purpose, children, rootLink, external, disabled }) => {
  const btnStatus = `btn ${disabled ? 'disabled' : ''}`;

  if (rootLink) {
    return <IndexLink styleName={ btnStatus } to="/">{ children }</IndexLink>;
  }
  if (typeof purpose === 'string') {
    if (external) {
      return <a href={ purpose } styleName={ btnStatus }>{ children }</a>;
    }
    return <Link to={ purpose } styleName={ btnStatus }>{ children }</Link>;
  }
  return <button onClick={ purpose } styleName={ btnStatus }>{ children }</button>;
};

Btn.defaultProps = {
  rootLink: false,
  purpose: '/',
  external: false,
  disabled: false,
};

Btn.propTypes = {
  purpose: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  children: PropTypes.string.isRequired,
  rootLink: PropTypes.bool,
  external: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Btn;
