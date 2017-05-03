import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

import '../assets/css/app.css';

const Btn = ({ purpose, children, rootLink }) => {
  if (rootLink) {
    return <IndexLink styleName="btn" to="/">{ children }</IndexLink>;
  }
  if (typeof purpose === 'string') {
    return <Link to={ purpose } styleName="btn">{ children }</Link>;
  }
  return <button onClick={ purpose } styleName="btn">{ children }</button>;
};

Btn.defaultProps = {
  rootLink: false,
  purpose: '/',
};

Btn.propTypes = {
  purpose: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  children: PropTypes.string.isRequired,
  rootLink: PropTypes.bool,
};

export default Btn;
