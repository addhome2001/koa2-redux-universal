import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

import './Btn.css';

const Btn = ({ purpose, children, rootLink, external }) => {
  if (rootLink) {
    return <IndexLink styleName="btn" to="/">{ children }</IndexLink>;
  }
  if (typeof purpose === 'string') {
    if (external) {
      return <a href={ purpose } styleName="btn">{ children }</a>;
    }
    return <Link to={ purpose } styleName="btn">{ children }</Link>;
  }
  return <button onClick={ purpose } styleName="btn">{ children }</button>;
};

Btn.defaultProps = {
  rootLink: false,
  purpose: '/',
  external: false,
};

Btn.propTypes = {
  purpose: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  children: PropTypes.string.isRequired,
  rootLink: PropTypes.bool,
  external: PropTypes.bool,
};

export default Btn;
